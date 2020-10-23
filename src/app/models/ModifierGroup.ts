import { Product } from './Producto';

interface Rules {
    required:boolean;
    type:number;
}
export class ModifierGroup {
    name: string;
    product: Array<Product>;
    rules: Rules;
    notes: string;
    restaurante ?:string;

}