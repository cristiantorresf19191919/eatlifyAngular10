export class Item {
  _id?: string;
  category: string;
  description: string;
  image?: Object;
  price: number;
  quantity?:number;
  name:string;
  topProduct?:boolean;
  addonProduct ?: boolean;
  restaurant?: string;
  outOfStock?:boolean;

}

export interface Category {
	_id?: string;
  name?: string;
  taxable?:boolean;
}

export class Category{
  _id?: string;
  name?:string;
  taxable?:boolean;

  constructor(){}
}
