export interface Payment{
    id?:number;
    customerId:number;
    cartNumber:string;
    cartCvv:number;
    price:number;
}