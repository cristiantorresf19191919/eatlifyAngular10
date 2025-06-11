import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { State } from "src/app/store";
import { getRestaurantId } from 'src/app/store/reducers/restaurantReducer';
/* import { OrderSocketService } from 'src/app/servicios/orderSocket.service';
import { map } from 'rxjs/operators';
import { Order } from 'src/app/models/order';
import { GotNewOrder } from 'src/app/store/actions'; */

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  // private _orderSubscriptor:Subscription;
  constructor(/* private orderSocketService:OrderSocketService, */ private store:Store<State>) {
    /* this._orderSubscriptor = this.orderSocketService.getOrder.pipe(
      map(order => JSON.parse(order))
    ).subscribe((order:Order)=>{
      this.store.dispatch(new GotNewOrder(order))
    }) */
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    // this._orderSubscriptor.unsubscribe();
  }

}
