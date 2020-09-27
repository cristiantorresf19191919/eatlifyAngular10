import { Component, OnInit, Input, OnChanges, Output,EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Item } from 'src/app/models/item';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-show-products',
  templateUrl: './show-products.component.html',
  styleUrls: ['./show-products.component.scss']
})
export class ShowProductsComponent implements OnInit, OnChanges {


  @Input('productos') productosInput:[Item];
  @Input('terminoBuscar') terminoBuscar:string;
  @Output() ProductoSelecccionado = new EventEmitter();
  productos:Item[];
  loading:boolean = false;
  cambieGridBoolean:boolean = false;
  bakeryCatBoolean:boolean = false;
  _searchTerm:string;
  booleanItemAnimationOnClick: boolean = false;
  productsFiltered:Item[];
  $subject = new Subject();
  constructor() {
   }

  ngOnInit() {
    //distinctUntilChanged si el valor es igual que el anterior detiene 
    this.$subject.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe((valueToSearch:string)=>{
      if (valueToSearch)this.productos = this.productos.filter(producto => producto.name.toLowerCase().indexOf(valueToSearch.toLowerCase()) !== -1 );
      if (valueToSearch.length>3){
        this.cambieGridBoolean = true;
      } else {
        this.cambieGridBoolean = false;
      }
    });
    this._searchTerm = this.terminoBuscar;
    this.productos = this.productosInput;
    this.loading=true;
    setTimeout(() => {
      this.loading = false;
    }, 1000); 



  }

  ngOnChanges(){
    this._searchTerm = this.terminoBuscar;
    if (this._searchTerm){
      this.$subject.next(this._searchTerm);
    }
    this.productos = this.productosInput;
    if (this.productos[0].category === 'bakery'){
      this.bakeryCatBoolean = true;
    } else {
      this.bakeryCatBoolean = false;
    }
    if (this.productos[0].category === 'bowls'){
      this.cambieGridBoolean = true;
    } else {
      this.cambieGridBoolean = false;
    }
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
  
  }
  productoSeleccionado(item){
    //envia producto a otro componente con subject rxjs
    this.ProductoSelecccionado.emit(item);
    //codigo loco para copiar y mostrar una animacion pendeja
    /* const itemNative = document.querySelector(".item");    
    const clone: any = itemNative.cloneNode(true);
    clone.classList.add('item-animated');
    const imagen = clone.children[0].children[0];
    imagen.setAttribute('src',item.image.url); */
    // imagen.currentSrc = item.image.url;
   /*  const parent = itemNative.parentNode;
    parent.appendChild(clone);
    clone.classList.add("item-animated"); */
    /* setTimeout(() => {
      parent.removeChild(clone);
    }, 1500); */
  }

}
