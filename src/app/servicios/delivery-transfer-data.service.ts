import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Category } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class DeliveryTransferDataService {

  private category$ = new Subject<Category>();

  public getCategoriesData = this.category$.asObservable();

  constructor() { }

  setCategoryData(cat:any){
    this.category$.next(cat);
  }

  getCategoryData(){
    return this.category$.asObservable();
  }

}
