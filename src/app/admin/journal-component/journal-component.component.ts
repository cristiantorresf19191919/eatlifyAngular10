import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Item } from 'src/app/models/item';
import { VentasJorunalService } from 'src/app/servicios/ventas-jorunal.service';
import { PreventasService } from 'src/app/servicios/preventas.service';
import {
	bounceOutDownOnLeaveAnimation,
	bounceOutUpOnLeaveAnimation,
	fadeOutUpOnLeaveAnimation,
	fadeOutLeftBigOnLeaveAnimation,
	lightSpeedOutOnLeaveAnimation
} from 'angular-animations';
import { VentasSocketService } from '../ventas-socket/ventas-socket.service';

interface preventaCollectionModel {
  ops:Item[]
}

@Component({
	selector: 'app-journal-component',
	templateUrl: './journal-component.component.html',
	styleUrls: [ './journal-component.component.scss' ],
	animations: [ bounceOutUpOnLeaveAnimation({ duration: 400 }) ]
})
export class JournalComponentComponent implements OnInit {
	@Input() itemObject: Item;
	@Input() elements: any;
	@Output() deleteItemEvent = new EventEmitter();
	@Output() addItemEvent = new EventEmitter();
	@Output() closeComponentEvent = new EventEmitter();
  @Output() productSelectedPopUp = new EventEmitter();
  @Output() newSoldDATA = new EventEmitter();
	allItems: Item[] = [];
	totalPrice: number = 0;
	moneyRecieved: number = 0;
	change: number = 0;
	valorRecivido: number;
	deleteItemAnimation: boolean = false;
	constructor(
    private ventasJournalService: VentasJorunalService,
    private ventasSocketService: VentasSocketService,
    private preventasService : PreventasService) {}
	ngOnInit() {
		this.ventasJournalService.getItemUpdated().subscribe((item: Item) => {
			const currentItem = this.allItems.find((el) => el._id === item._id);
			const currentItemIndex = this.allItems.indexOf(currentItem);
			this.allItems.splice(currentItemIndex, 1);
			this.allItems.unshift(item);
			this.totalPrice = 0;
			this.allItems.forEach((el) => (this.totalPrice += el.price));
		});
		this.ventasJournalService.getItem().subscribe((el: Item) => {
			this.totalPrice += el.price;
			this.ventasSocketService.sendSale(el);
			this.allItems.push(el);
			console.log('que estoy reciviendo');
			console.log(el);
			this.change = this.valorRecivido - this.totalPrice;
		});
	}
	ngOnChange() {
		/*     this.allItems.push(this.itemObject);
    alert(this.itemObject); */
	}
	ngOnChanges(changes: SimpleChanges) {
		/*     console.log("ngOnChanges(changes: SimpleChanges)");
    console.log("ngOnChanges(changes: SimpleChanges)");
    console.log("ngOnChanges(changes: SimpleChanges)");
    console.log(changes.itemObject.currentValue);
    console.log(changes.itemObject.firstChange); */
		// You can also use categoryId.previousValue and
		// categoryId.firstChange for comparing old and new values
		/* this.allItems.push(changes.itemObject.currentValue); */
	}

	onChangeQuantity(event: any) {
		this.change = this.valorRecivido - this.totalPrice;
		if (event.keyCode == 9) {
			//tab pressed

			this.valorRecivido = parseFloat(event.target.value);

			this.change = this.valorRecivido - this.totalPrice;
		}

		if (event.target.value) {
			this.valorRecivido = parseFloat(event.target.value);
			this.change = this.valorRecivido - this.totalPrice;
		}

		if (event.keyCode == '38') {
			// flecha arriba
			this.valorRecivido = parseFloat(event.target.value);
			this.change = this.valorRecivido - this.totalPrice;
		} else if (event.keyCode == '40') {
			// flecha abajo
			this.valorRecivido = parseFloat(event.target.value);
			this.change = this.valorRecivido - this.totalPrice;
		} else {
		}
	}

	calculateTotal() {
		this.totalPrice = 0;
		this.allItems.map((item) => {
			this.totalPrice += item.price;
		});
		this.change = this.valorRecivido - this.totalPrice;
	}

	DeleteElement(element) {
		console.log(this.allItems);
		const index = this.allItems.indexOf(element);
		this.allItems.splice(index, 1);
		this.calculateTotal();
		this.deleteItemEvent.emit(element);
	}

	addElement(element) {
		this.addItemEvent.emit(element);
		this.calculateTotal();
	}

	closeComponentTrigger() {
		this.closeComponentEvent.emit(true);
	}
	/* Limpiar la data */
	cleanData() {
		const obj = {
			arreglo_ventas: this.allItems
		};
    this.preventasService.agregarVenta(obj).subscribe((preventaCollection:preventaCollectionModel)=>{
		
      this.newSoldDATA.emit(preventaCollection)
    } );
		this.allItems = [];
		this.totalPrice = 0;
		this.change = 0;
		this.valorRecivido = 0;
    this.ventasSocketService.clearTheScreen(true);

	}

	onItemClickEvent(item) {
		this.productSelectedPopUp.emit(item);
	}
}
