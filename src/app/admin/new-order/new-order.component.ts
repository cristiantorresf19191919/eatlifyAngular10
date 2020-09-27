import { Component, OnInit, Inject } from '@angular/core';
import { inject } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {  select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { State } from 'src/app/store';
import { getOrderAmount, getOrderProducts } from 'src/app/store/reducers/orderReducer';
import { OrderData } from '../dashboard/dashboard.component';


@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss']
})
export class NewOrderComponent implements OnInit {
  
  amount$:Observable<number>;
  products$:Observable<Array<any>>;

  constructor(
    public dialogRef: MatDialogRef<NewOrderComponent>,
    private store:Store<State>
    
  ) {  }

  ngOnInit() {

    this.amount$ = this.store.pipe(select(getOrderAmount));
    this.products$ = this.store.pipe(select(getOrderProducts));
  
  
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  closePopup():void{
    this.dialogRef.close();
  }

}
