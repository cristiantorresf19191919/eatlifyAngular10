import { PipeTransform, Pipe } from '@angular/core';
import { Item } from 'src/app/models/item';
@Pipe({
  name:'productFilter'
})
export class productFilterPipe implements PipeTransform {
	transform(products: Item[], searchTerm: string) {
		if (!products || !searchTerm) {
			return products;
		}
		/*  -1 if nothing is found and mayor a uno si encontro algo*/
		return products.filter((product) => product.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
	}
}
