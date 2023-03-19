import {extractCarShorts, extractInfoFromUrl, extractMaxPage} from "./esa-extractor";
import {parse} from "node-html-parser";
import * as fs from 'fs';
import { AutoEsaUrlInfo } from "./esa-model";
import { Brand, Fuel } from "../commons/model";

it("extracting AutoEsaCarShorts from page", () => {
    const pageHtml = parse(fs.readFileSync('./test-files/autoesa/landing-page.html', 'utf8'))
    const cars = extractCarShorts(pageHtml)
    expect(cars.length).toEqual(20)
    const firstCar = cars.at(0)
    expect(firstCar?.imageUrl).toEqual("/files/cars/775265172/950_713_e/775265172-1.jpg")
    expect(firstCar?.brand).toEqual(Brand.Skoda)
    expect(firstCar?.equipmentClass).toEqual("citigo")
    expect(firstCar?.bodyType).toEqual("hatchback")
    expect(firstCar?.fuel).toEqual(Fuel.Electric)
    expect(firstCar?.esaId).toEqual("775265172")
    expect(firstCar?.fullName).toEqual("Škoda Citigo elektro Style Plus IV")
    expect(firstCar?.year).toEqual(2020)
    expect(firstCar?.power).toEqual(61)
    expect(firstCar?.mileage).toEqual(8)
    expect(firstCar?.year).toEqual(2020)
    expect(firstCar?.monthlyPrice).toEqual(1995)
    expect(firstCar?.specialPrice).toEqual(520000)

    expect(cars.at(1)?.sale).toEqual(5000)
});

it("extracting AutoEsaUrlInfo from url", () => {
    const url1 = "/ford/s-max/mpv/nafta/630262960"
    expect(extractInfoFromUrl(url1)).toEqual(
        new AutoEsaUrlInfo(Brand.Ford, "s-max", "mpv", Fuel.Diesel, "630262960"))


    const url2 = "/volkswagen/golf/kombi/nafta/785261407"
    expect(extractInfoFromUrl(url2)).toEqual(
        new AutoEsaUrlInfo(Brand.Volkswagen, "golf", "kombi", Fuel.Diesel, "785261407"))


    const url3 = "/mitsubishi/asx/suv/benzin/761261082"
    expect(extractInfoFromUrl(url3)).toEqual(
        new AutoEsaUrlInfo(Brand.Mitsubishi, "asx", "suv", Fuel.Natural, "761261082"))
});

it("extracting number of last page from page", () => {
    const pageHtml = parse(fs.readFileSync('./test-files/autoesa/landing-page.html', 'utf8'))
    const numOfLastPage = extractMaxPage(pageHtml)
    expect(numOfLastPage).toEqual(255)
});
