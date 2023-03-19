import { HTMLElement } from "node-html-parser";
import { throwException } from "../utils/utils";
import {AutoEsaUrlInfo, AutoEsaCarShort, RunInfo} from "./esa-model";
import { Brand, Fuel } from "../commons/model";


const INDEX_PAGE = 'https://www.autoesa.cz/vsechna-auta?stranka=1'
const TEMPLATE_PAGE = 'https://www.autoesa.cz/vsechna-auta?stranka='

/**
 * Function to extract list of AutoEsaCarShort from listing page on AutoEsa portal
 * @param pageElem - Element containing whole page from https://www.autoesa.cz/vsechna-auta
 */
export const extractCarShorts = (pageElem: HTMLElement) : AutoEsaCarShort[] => {
    return pageElem.querySelectorAll('.car_item').map( carItemElem => extractCarShort(carItemElem))
}

export const extractCarShort = (carItemElem: HTMLElement) : AutoEsaCarShort => {
    const carUrl: string = carItemElem.getAttribute("href") || throwException(`Could not find car url`)
    const urlInfo = extractInfoFromUrl(carUrl)
    const imageUrl = carItemElem.querySelector(".car_item__image")?.querySelector("img")?.getAttribute("src") || throwException(`Could not find image on landing page for car: ${carUrl}`)
    const fullName = carItemElem.querySelector(".car_item__inner__header")?.querySelector("h2")?.text.trim() || throwException(`Could not find full name on landing page for car: ${carUrl}`)
    const year = Number.parseInt(carItemElem.querySelector(".icon_year")?.text.trim() || throwException(`Could not find year on landing page for car: ${carUrl}`))
    const power = Number.parseInt(carItemElem.querySelector(".icon_power")?.text.replace(/\D/g,'') || throwException(`Could not find power on landing page for car: ${carUrl}`))
    const mileage = Number.parseInt(carItemElem.querySelector(".icon_range")?.text.replace(/\D/g,'') || throwException(`Could not find mileage on landing page for car: ${carUrl}`))
    const sale = Number.parseInt(carItemElem.querySelector(".car_item__save_text")?.text.replace(/\D/g,'') || "0")
    const prices = carItemElem.querySelectorAll(".price")
    let monthlyPrice = 0;
    let specialPrice = 0;
    if(prices.length == 2){
        monthlyPrice =  Number.parseInt(prices.at(0)?.text?.replace(/\D/g,'') || "0")
        specialPrice =  Number.parseInt(prices.at(1)?.text?.replace(/\D/g,'') || "0")
    } else if(prices.length == 1) {
        specialPrice =  Number.parseInt(prices.at(0)?.text?.replace(/\D/g,'') || "0")
    } else {
        throwException(`Could not find prices on landing page for car: ${carUrl}`)
    }

    return new AutoEsaCarShort(
        urlInfo.esaId, carUrl, imageUrl, urlInfo.brand, fullName,
        "not implemented", urlInfo.equipmentClass, urlInfo.bodyType, year, power,
        urlInfo.fuel, mileage, monthlyPrice, specialPrice, sale
    )
}

export const extractInfoFromUrl = (carUrl: string) : AutoEsaUrlInfo  => {
    const splitUrl = carUrl.split("/")

    const brand = splitUrl.at(1) || throwException(`Count not find brand in the url: ${carUrl}`);
    const equipmentClass = splitUrl.at(2) || throwException(`Count not find equipment class in the url: ${carUrl}`);
    const bodyType = splitUrl.at(3) || throwException(`Count not find body type in the url: ${carUrl}`);
    const fuel = splitUrl.at(4) || throwException(`Count not find fuel type in the url: ${carUrl}`);
    const esaId = splitUrl.at(5) || throwException(`Count not find esaId in the url: ${carUrl}`);

    return new AutoEsaUrlInfo(
        mapStringToBrand(brand),
        equipmentClass,
        bodyType,
        mapStringToFuel(fuel),
        esaId
    )
}

export const mapStringToBrand = (brandStr: string) : Brand => {
    switch (brandStr) {
        case 'chevrolet': return Brand.Chevrolet;
        case 'mazda': return Brand.Mazda;
        case 'citroen': return Brand.Citroen;
        case 'audi': return Brand.Audi;
        case 'nissan': return Brand.Nissan;
        case 'renault': return Brand.Renault;
        case 'mini': return Brand.Mini;
        case 'mercedes-benz': return Brand.MercedesBenz;
        case 'chrysler': return Brand.Chrysler;
        case 'seat': return Brand.Seat;
        case 'kia': return Brand.Kia;
        case 'bmw': return Brand.Bmw;
        case 'volkswagen': return Brand.Volkswagen;
        case 'dongfeng': return Brand.Dongfeng;
        case 'ford': return Brand.Ford;
        case 'fiat': return Brand.Fiat;
        case 'lada': return Brand.Lada;
        case 'hyundai': return Brand.Hyundai;
        case 'lancia': return Brand.Lancia;
        case 'smart': return Brand.Smart;
        case 'volvo': return Brand.Volvo;
        case 'skoda': return Brand.Skoda;
        case 'suzuki': return Brand.Suzuki;
        case 'rover': return Brand.Rover;
        case 'alfa-romeo': return Brand.AlfaRomeo;
        case 'honda': return Brand.Honda;
        case 'land-rover': return Brand.LandRover;
        case 'lexus': return Brand.Lexus;
        case 'toyota': return Brand.Toyota;
        case 'iveco': return Brand.Iveco;
        case 'dacia': return Brand.Dacia;
        case 'mitsubishi': return Brand.Mitsubishi;
        case 'porsche': return Brand.Porsche;
        case 'subaru': return Brand.Subaru;
        case 'ds-automobiles': return Brand.DsAutomobiles;
        case 'jeep': return Brand.Jeep;
        case 'opel': return Brand.Opel;
        case 'ssangyong': return Brand.Ssangyong;
        case 'peugeot': return Brand.Peugeot;
        case 'daihatsu': return Brand.Daihatsu;
        case 'dodge': return Brand.Dodge;
    }
    return throwException(`Unknown brand: ${brandStr}`)
}

export const mapStringToFuel = (fuelStr: string) : Fuel => {
    switch (fuelStr) {
        case 'benzin': return Fuel.Natural;
        case 'hybridni': return Fuel.Hybrid;
        case 'nafta': return Fuel.Diesel;
        case 'lpg-benzin': return Fuel.LpgAndNatural;
        case 'cng-benzin': return Fuel.CngAndNatural;
        case 'elektro': return Fuel.Electric;
    }
    return throwException(`Unknown fuel type: ${fuelStr}`)
}

export const extractMaxPage = (pageElem: HTMLElement) : number => {
    return Number.parseInt(pageElem.querySelector('.search_footer')
        ?.querySelector('.dots-last')
        ?.text.replace(/\D/g,'')
        || throwException(`Could not find number of last page`)
    )
}

export const getRunInfo = (pageElem: HTMLElement) : RunInfo => {
    return new RunInfo(extractMaxPage(pageElem), "AutoEsa extraction", Date.now(), undefined, "")
}

export const getUrlPage = (pageNumber: number) : string => {
    return`${TEMPLATE_PAGE}${pageNumber}`
}

export const getIndexPage = () : string => {
    return INDEX_PAGE
}



