import { CarImage } from "./car-image";

export interface Car extends CarImage{
    carId:number;
    brandName:string;
    colorName:string;
    modelYear:number;
    dailyPrice:number;
    description:string;
}