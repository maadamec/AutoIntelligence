import {catchError, Observable, switchMap, throwError} from "rxjs";
import {fromFetch} from "rxjs/fetch";

export const getHtmlPage = (link: string): Observable<string> => fromFetch(link).pipe(
    switchMap(response => {
        if (response.ok) {
            // OK return data
            return response.text();
        } else {
            // Server is returning a status requiring the client to try something else.
            return throwError( () =>
                new Error(`Server responded with status ${response.statusText} on request for ${link}`)
            );
        }
    }),
    catchError(err => {
        // Network or other error, handle appropriately
        return throwError( () => new Error(`Network issue: ${err.message}`));
    })
);

export const throwException = (errorMessage: string): never => {
    throw new Error(errorMessage);
}