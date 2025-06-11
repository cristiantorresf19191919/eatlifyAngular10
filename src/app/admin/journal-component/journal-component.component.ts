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
import { Product } from 'src/app/models/Producto';
import { Store } from '@ngrx/store';
// import { AddVenta } from 'src/app/store/actions/ventas.actions';

interface preventaCollectionModel {
	_id: string;
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

	producto:Product;

	allItems: Item[] = [];
	totalPrice: number = 0;
	moneyRecieved: number = 0;
	change: number = 0;
	valorRecivido: number;
	deleteItemAnimation: boolean = false;
	constructor(
    private ventasJournalService: VentasJorunalService,
    private ventasSocketService: VentasSocketService,
    private preventasService : PreventasService,
    private store: Store) {}
	ngOnInit() {
		this.ventasJournalService.getItem().subscribe((itemToAdd: Item) => {
      if (!itemToAdd) { return; }

      const existingItem = this.allItems.find((el) => el.name === itemToAdd.name);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.allItems.push({ ...itemToAdd, quantity: 1 });
      }
      this.calculateTotal();
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


	botaunstring(numero:number):string{
		return String(numero);
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
		this.totalPrice = this.allItems.reduce((acc, item) => {
			return acc + (item.price * item.quantity);
		}, 0);
		this.updateChange();
	}

	updateChange() {
		const total = this.totalPrice || 0;
		const received = this.moneyRecieved || 0;
		this.change = received > 0 ? received - total : 0;
	}

	incrementQuantity(item: Item) {
		item.quantity++;
		this.calculateTotal();
	}

	decrementQuantity(item: Item) {
		item.quantity--;
		if (item.quantity <= 0) {
			this.removeElement(item);
		} else {
			this.calculateTotal();
		}
	}

	removeElement(element: Item) {
		const index = this.allItems.findIndex(item => item._id === element._id);
		if (index > -1) {
			this.allItems.splice(index, 1);
		}
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
		if (this.allItems.length === 0) { return; }

		const obj = {
			arreglo_ventas: this.allItems
		};
    this.preventasService.agregarVenta(obj).subscribe((preventaCollection:preventaCollectionModel)=>{
      this.newSoldDATA.emit(preventaCollection.ops)
    } );
		this.allItems = [];
		this.totalPrice = 0;
		this.change = 0;
		this.moneyRecieved = 0;
	}

	onItemClickEvent(item) {
		this.productSelectedPopUp.emit(item);
	}

	borrarPantalla() {
		this.allItems = [];
		this.totalPrice = 0;
		// this.ventasSocketService.clearTheScreen(true);
	}

	deleteItem(item: Item, i: number) {
		// ... existing code ...
	}
}
