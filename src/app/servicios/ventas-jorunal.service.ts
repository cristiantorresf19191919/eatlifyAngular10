import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentasJorunalService {
  private itemObs$ = new Subject();
  private $itemUpdateObs = new Subject();
  getItemUpdated(){
    return this.$itemUpdateObs.asObservable();
  }

  setItemUpdated(item){
    return this.$itemUpdateObs.next(item);
  }

  getItem(){
    return this.itemObs$.asObservable();
  }

  setItem(item){
    return this.itemObs$.next(item);
  }

  constructor() { }
}
