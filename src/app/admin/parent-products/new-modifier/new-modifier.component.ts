
import { Product } from 'src/app/models/Producto';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild,OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable, of, Subject} from 'rxjs';
import {map, startWith, takeUntil} from 'rxjs/operators';
import { ProductosService } from 'src/app/servicios/productos.service';
import { Item } from 'src/app/models/item';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSidenav } from '@angular/material/sidenav';


@Component({
  selector: 'app-new-modifier',
  templateUrl: './new-modifier.component.html',
  styleUrls: ['./new-modifier.component.scss']
})
export class NewModifierComponent implements OnInit {

  topProducts:Product[];
  visible = true;
  selectable = true;
  removable = true;
  onDestroySubscriber$:Subject<void> = new Subject<void>();
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredItems: Observable<Item[]>;
  itemSelected:any;
  addOnsProducts:Item[]= [];
  addOnsNames:string[];
  onSelectedItem:boolean;
  groupItems:Item[]=[];
  allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];
  showSideBar = false;
  
  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
 
  constructor(
    private productsService:ProductosService,
    private _snackBar: MatSnackBar
  ) { 
    
    this.filteredItems = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((inputTyping: string | null) => inputTyping ? this._filter(inputTyping) : this.addOnsProducts.slice()));
  }

  ngOnInit(): void {
    this.productsService.getAddonsProducts().pipe(
      takeUntil(this.onDestroySubscriber$),
      ).subscribe((data:Item[])=>{
        this.addOnsProducts = data
        this.addOnsNames = this.addOnsProducts.map((item:Item)=> item.name);
      });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.onDestroySubscriber$.next();
  }

  


  private _filter(value: string): Item[] {
    const filterValue = value.toLowerCase();

    return this.addOnsProducts.filter((item:Item) => item.name.toLowerCase().indexOf(filterValue) === 0);
  }

  autoLoadOnClick(){

    // list to observable
    
  this.filteredItems = of(this.addOnsProducts);
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      // this.fruits.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.fruitCtrl.setValue(null);
  }

  remove(): void {
    this.itemSelected = null;
   
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    // this.fruits.push(event.option.viewValue);
    if (event.option.value['openPopup']){
      this.showSideBar = true;
      return;
    }
    this.itemSelected = event.option.value;
    
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
    this.onSelectedItem = true; 
  }

  addItemGroup(){
    const repeated = this.groupItems.find((item)=> item._id == this.itemSelected._id);
    if (repeated){
      this._snackBar.open("Item Duplicated","Ok",{
        duration: 1000
      })
      return;
    }
    this.groupItems.push(this.itemSelected);
    this.itemSelected = null;
  }

 

  closeSideBar(){
    this.showSideBar = false;
   
  }

  deleteModifier(item:Item){
    const elmentFound = this.groupItems.find((el)=>el._id == item._id);
    const index =this.groupItems.indexOf(elmentFound);
    this.groupItems.splice(index,1);

  }

}
