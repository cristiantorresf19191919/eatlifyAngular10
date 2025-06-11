import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentasSocketService {
  venta = of();
  deletedVenta = of();
  clearTheScreenProp = of();
  connectionSuccesfully = of();

  constructor() { }
  
  sendSale(item){ }
  deleteItem(item){ }
  clearTheScreen(item){ }
  openCASH(item){ }
  joinRoom(){ }
}
