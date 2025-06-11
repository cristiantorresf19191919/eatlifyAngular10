import { Component, OnInit, OnDestroy } from '@angular/core';
import { VentasSocketService } from './ventas-socket.service';
import { Item } from 'src/app/models/item';
import { Subscription } from 'rxjs';
import { bounceInUpOnEnterAnimation, bounceInDownOnEnterAnimation, fadeInDownOnEnterAnimation, bounceOutUpOnLeaveAnimation } from 'angular-animations';

@Component({
  selector: 'app-ventas-socket',
  templateUrl: './ventas-socket.component.html',
  styleUrls: ['./ventas-socket.component.scss'],
  animations:[bounceInUpOnEnterAnimation(), bounceInDownOnEnterAnimation(), fadeInDownOnEnterAnimation(),bounceOutUpOnLeaveAnimation()]
})
export class VentasSocketComponent implements OnInit, OnDestroy {

	arregloVentas:Item[] = [];
	total:number = 0;
	totalSummaryPrice:number = 0;
	private _ventaSubscriptor:Subscription;
	private _ventaDeletedSubscriptor:Subscription;
	private _clearTheScreenSubscriptio:Subscription;

	constructor(private ventasSocketService:VentasSocketService) { }

	ngOnInit() {
	
		this.ventasSocketService.joinRoom();
		let audio = new Audio();
		audio.src = "../../../assets/sound/bell.mp3";
		audio.load();

		this._ventaDeletedSubscriptor = this.ventasSocketService.deletedVenta.subscribe((itemDeleted: any)=>{
			const index = this.arregloVentas.findIndex(item => item._id === itemDeleted._id);
			if (index > -1) {
				const deletedItem = this.arregloVentas.splice(index, 1)[0];
				this.totalSummaryPrice -= deletedItem.price;
			}
		});

		this._clearTheScreenSubscriptio = this.ventasSocketService.clearTheScreenProp.subscribe((data: any)=>{
			if(data){
				this.total = 0;
				this.arregloVentas = [];
				this.totalSummaryPrice = 0;
			}
		});

		this._ventaSubscriptor = this.ventasSocketService.venta
		.subscribe((venta: any)=>{			
			this.arregloVentas.push(venta);
			this.totalSummaryPrice += venta.price;
			audio.play();
		});
	}

	ngOnDestroy(): void {
		if (this._ventaSubscriptor) this._ventaSubscriptor.unsubscribe();
		if (this._ventaDeletedSubscriptor) this._ventaDeletedSubscriptor.unsubscribe();
		if (this._clearTheScreenSubscriptio) this._clearTheScreenSubscriptio.unsubscribe();
	}
}
