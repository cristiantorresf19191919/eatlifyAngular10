export class Product{
    user?:string;
    name:string;
    restaurant?: string;
    topProduct:boolean;
    description:string;
    category:string;
    price:string;
    image:{
        id:string,
        url:string
    };
}