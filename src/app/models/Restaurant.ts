import { Product } from './Producto';
export class Restaurant{
    _id?:string | null;
    name:string;
    address:string;
    description: string; 
    phone: string;
    image?:{
        id:string,
        url:string
    };
    productos?: Product[];
    ventas?:[]  
}