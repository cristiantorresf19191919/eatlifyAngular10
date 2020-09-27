import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Item } from 'src/app/models/item';
import { debounceTime } from 'rxjs/operators';
import { CajerosService } from '../../servicios/cajeros.service';

@Injectable({
  providedIn: 'root'
})
export class VentasSocketService {
  venta = this.socket.fromEvent<Item>('nuevaVenta');
  deletedVenta = this.socket.fromEvent<Item>('deletedSale');
  clearTheScreenProp = this.socket.fromEvent<Boolean>('clearTheScreenNow');
  connectionSuccesfully = this.socket.fromEvent<any>('connectionSuccesfully');

  constructor(private socket:Socket, private cajerosService: CajerosService) { }
  
  sendSale(item){
    let userId = localStorage.getItem("userId");    
    
    this.socket.emit('NewSaleRoom',{item,userId});       
  }


  deleteItem(item){
    this.socket.emit("deleteSaleFromResumen",item);
  }

  clearTheScreen(item){
    this.socket.emit('clearTheScreen',item);
    this.socket.emit('openCASH',true);

  }
  openCASH(item){
    this.socket.emit('openCASH',true);
  }

  joinRoom(){
    let userId = localStorage.getItem("userId");
    this.socket.emit("joinAroom",userId);
  }
}
