import PgRx from 'pg-reactive';

import {first, forkJoin, last, map, Observable, switchMap, tap} from 'rxjs';
import {HTMLElement, parse} from 'node-html-parser';
import { getHtmlPage } from "./utils/utils";
import {extractCarShorts, getIndexPage, getRunInfo, getUrlPage} from "./autoesa/esa-extractor";
import {constructInsertCar, constructInsertJob} from "./autoesa/esa-pg-client";
import {AutoEsaCarShort, RunInfo} from "./autoesa/esa-model";

const log = console.log;


log("Connecting to the database");

const db = new PgRx('pg://madamec:madamec@localhost/test');

log("Executing AutoIntelligence scrapper");

getHtmlPage(getIndexPage()).pipe(
    map((htmlPage: string) => parse(htmlPage)),
    map((page: HTMLElement) => getRunInfo(page)),
    switchMap((job: RunInfo) => {
        const insertQuery = constructInsertJob(job);
        return db.query(insertQuery).pipe(
            first(),
            map((row) => row.job_id ),
            tap((id: number) => log(`Job inserted with id: ${id}`)),
            map( (id: number) => {
                const resultJob = structuredClone(job);
                resultJob.job_id = id;
                return resultJob;
            })
        );
    }),
    tap((job: RunInfo)=> log(job)),
    map((job: RunInfo) => {
        for(let i = 1; i <= job.numOfPages; i++) {
            extractShortCars(i+1).subscribe({complete: () => log(`AutoEsa page ${i} crawled`) })
        }
    })
).subscribe({
        complete: () => log('Short cars inserted into DB')
})


const extractShortCars = (pageNumber: number): Observable<object[]> => {
    return getHtmlPage(getUrlPage(pageNumber))
    .pipe(
        map((htmlPage: string) => parse(htmlPage)),
        map( root => extractCarShorts(root)),
        tap(shortCars => log(`Extracted ${shortCars.length} short cars from page with number: ${pageNumber}`)),
        switchMap( shortCars =>
            forkJoin(shortCars.map( shortCar => db.query(constructInsertCar(shortCar))))
        ),
    )
}
//
//
// getHtmlPage('https://www.autoesa.cz/vsechna-auta?stranka=2')
//     .pipe(
//         map((htmlPage: string) => parse(htmlPage)),
//         map( root => extractCarShorts(root)),
//         tap(shortCars => log(`Extracted ${shortCars.length} short cars`)),
//         switchMap( shortCars =>
//             forkJoin(shortCars.map( shortCar => db.query(constructInsertCar(shortCar))))
//         ),
//     )
//     .subscribe({
//         next: result => log(result),
//         complete: () => log('Short cars inserted into DB')
//     });
