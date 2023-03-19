import {AutoEsaCarShort} from "./esa-model";
import {Brand, Fuel} from "../commons/model";
import {constructInsertCar} from "./esa-pg-client";

it("constructing insert sql query should return correct value", () => {
    const shortCar = new AutoEsaCarShort(
    '789244795',
    '/renault/clio/hatchback/benzin/789244795',
    '/files/cars/789244795/950_713_e/789244795-1.jpg',
    Brand.Renault,
    'Renault Clio 1.2i',
    'not implemented',
    'clio',
    'hatchback',
    2010,
    55,
    Fuel.Natural,
    52372,
    321,
    64000,
    40000
    )

    expect(constructInsertCar(shortCar)).toEqual(
       `INSERT INTO public.car(image, url, esa_id, brand, full_name, engine, equipment_class, year, gear, power, fuel, body_type, mileage, datetime_captured, datetime_sold, job_id)
        VALUES ('/files/cars/789244795/950_713_e/789244795-1.jpg',
                '/renault/clio/hatchback/benzin/789244795',
                '789244795',
                'Renault Clio 1.2i',
                'Renault',
                'not implemented',
                'clio',
                '2010',
                '',
                '55',
                'Natural',
                'hatchback',
                '52372',
                to_timestamp(${Date.now()} / 1000.0),
                null,
                0
                )
        RETURNING car_id;`)
});