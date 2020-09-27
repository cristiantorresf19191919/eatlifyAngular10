import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item';
import { Subscription } from 'rxjs';
import { VentasSocketService } from './ventas-socket.service';
import { startWith, subscribeOn } from 'rxjs/operators';
import { bounceInUpOnEnterAnimation, bounceInDownOnEnterAnimation, fadeInDownOnEnterAnimation, bounceOutUpOnLeaveAnimation } from 'angular-animations';

@Component({
  selector: 'app-ventas-socket',
  templateUrl: './ventas-socket.component.html',
  styleUrls: ['./ventas-socket.component.scss'],
  animations:[bounceInDownOnEnterAnimation(),fadeInDownOnEnterAnimation(),bounceOutUpOnLeaveAnimation()]
})
export class VentasSocketComponent implements OnInit {

  public arregloVentas: Item[] = [];
  totalSummaryPrice:number=0;

  private _ventaSubscriptor: Subscription;
  private _ventaDeletedSubscriptor: Subscription;
  private _clearTheScreenSubscriptio:Subscription;

  constructor(private ventasSocketService:VentasSocketService) { }

  ngOnInit() {
  
    /* join a room */
    this.ventasSocketService.joinRoom();
    /* cargando los audios  */
    let audio = new Audio();
    let clearAudio = new Audio();
    clearAudio.src='../../../assets/audio/clear.mp3';
    audio.src="../../../assets/audio/cash.mp3";
    clearAudio.load();
    audio.load();

    this._ventaDeletedSubscriptor = this.ventasSocketService.deletedVenta.subscribe((itemDeleted)=>{
        console.log(itemDeleted);      
      let index = this.arregloVentas.indexOf(itemDeleted);
      this.arregloVentas.splice(index,1);
      this.totalSummaryPrice=0;
      this.arregloVentas.map((items)=>{this.totalSummaryPrice += items.price});
      this._clearTheScreenSubscriptio = this.ventasSocketService.clearTheScreenProp.subscribe((data)=>{
        if (data){
          this.arregloVentas = [];
          this.totalSummaryPrice = 0;
          clearAudio.play();
        }
      })
    })
    /* let audio:any = document.getElementById("cashAudio"); */

    this._ventaSubscriptor = this.ventasSocketService.venta
    .subscribe((venta)=>{      
    
      this.arregloVentas.push(venta);
      console.log(venta);
      this.totalSummaryPrice = 0;
      this.arregloVentas.map(item=>this.totalSummaryPrice += item.price);
      audio.play();
    });
  }

  ngOnDestroy(){
    if (this._ventaDeletedSubscriptor && this._ventaSubscriptor){

    this._ventaSubscriptor.unsubscribe();
    this._ventaDeletedSubscriptor.unsubscribe();
    }

  }

}
