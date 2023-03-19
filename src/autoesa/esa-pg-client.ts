import {AutoEsaCarShort, RunInfo} from "./esa-model";


export const constructInsertCar = (shortCar: AutoEsaCarShort) => {
    return `
        INSERT INTO public.car(image, url, esa_id, brand, full_name, engine, equipment_class, year, gear, power, fuel, body_type, mileage, datetime_captured, datetime_sold, job_id)
        VALUES (${formatString(shortCar.imageUrl)},
                ${formatString(shortCar.carUrl)},
                ${formatString(shortCar.esaId)},
                ${formatString(shortCar.fullName)},
                ${formatString(shortCar.brand.toString())},
                ${formatString(shortCar.engine)},
                ${formatString(shortCar.equipmentClass)},
                ${formatNumber(shortCar.year)},
                '',
                ${formatNumber(shortCar.power)},
                ${formatString(shortCar.fuel.toString())},
                ${formatString(shortCar.bodyType)},
                ${formatNumber(shortCar.mileage)},
                to_timestamp(${Date.now()} / 1000.0),
                null,
                0
                )     
        ON CONFLICT DO NOTHING
        RETURNING car_id;
        `.trim()
}

export const constructInsertJob = (job: RunInfo) => {
    return `
        INSERT INTO public.job(job_name, datetime_start, detail)
        VALUES (${formatString(job.jobName)},
                to_timestamp(${job.datetimeStart} / 1000.0),
                ${formatString(job.detail)}
                )
        RETURNING job_id;
        `.trim()
}

const formatString = (text: string | undefined) : string => {
    if (text){
        return `'${text}'`;
    } else {
        return 'null';
    }
}

const formatNumber = (num: number | undefined) : string => {
    if (num){
        return `'${num}'`;
    } else {
        return 'null';
    }
}