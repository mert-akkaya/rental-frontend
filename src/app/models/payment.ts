export interface Payment{
    id?:number;
    customerId:number;
    cartName:string;
    cartNumber:string;
    cartCvv:number;
    cartDate:string;
    price:number;
}