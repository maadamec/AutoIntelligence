import { Brand, Fuel } from "../commons/model";

/**
 * Class to represent car instance on the AutoEsa landing page with all attributes that can be scrapped.
 */
export class AutoEsaCarShort {
    /** Id that is used by the AutoEsa portal */
    esaId: string;
    /** full url to the web page with car details */
    carUrl: string;
    /** full url to the image of the car on the landing page */
    imageUrl: string;
    /** Brand  of the car */
    brand: Brand;
    /** Full name of the car, mostly containing the brand, engine and equipment class*/
    fullName: string;
    /** Engine shortcut describing the motor, for example 2.7 TDi, 1.4VTi, ... */
    engine: string;
    /** Equipment class of the car, for example active, exclusive, ambition */
    equipmentClass: string;

    /** Body type of the car, for example kombi, hatchback */
    bodyType: string;
    /** Year the car has been used from till now */
    year: number;
    /** Power of the motor in kW*/
    power: number;
    /** Fuel type */
    fuel: Fuel;
    /** Mileage of the car on km */
    mileage: number;
    /** Monthly price if bought on loan */
    monthlyPrice: number;
    /** Full price if bought on loan */
    specialPrice: number;
    /** Amount of money that is said to be saved from original price*/
    sale: number;


    constructor(esaId: string, carUrl: string, imageUrl: string, brand: Brand, fullName: string, engine: string, equipmentClass: string, bodyType: string,  year: number, power: number, fuel: Fuel, mileage: number, monthlyPrice: number, specialPrice: number, sale: number) {
        this.esaId = esaId
        this.carUrl = carUrl;
        this.imageUrl = imageUrl;
        this.brand = brand;
        this.fullName = fullName;
        this.engine = engine;
        this.equipmentClass = equipmentClass;
        this.bodyType = bodyType;
        this.year = year;
        this.power = power;
        this.fuel = fuel;
        this.mileage = mileage;
        this.monthlyPrice = monthlyPrice;
        this.specialPrice = specialPrice;
        this.sale = sale;
    }
}

export class AutoEsaUrlInfo {
    brand: Brand;
    equipmentClass: string;
    bodyType: string;
    fuel: Fuel;
    esaId: string;

    constructor(brand: Brand, equipmentClass: string, bodyType: string, fuel: Fuel, esaId: string) {
        this.brand = brand;
        this.equipmentClass = equipmentClass;
        this.bodyType = bodyType;
        this.fuel = fuel;
        this.esaId = esaId;
    }
}

export class RunInfo {
    job_id = 0;
    numOfPages: number;
    jobName: string;
    datetimeStart: number;
    datetimeEnd: number | undefined;
    detail: string;

    constructor(numOfPages: number, jobName: string, datetimeStart: number, datetimeEnd: number | undefined, detail: string) {
        this.numOfPages = numOfPages;
        this.jobName = jobName;
        this.datetimeStart = datetimeStart;
        this.datetimeEnd = datetimeEnd;
        this.detail = detail;
    }
}