import { Component, OnInit } from '@angular/core';
import { Subscription, Observable, interval } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CajerosService } from 'src/app/servicios/cajeros.service';
import { Utilities } from '../parent-products/Utilties';
import { MatDialog } from '@angular/material/dialog';
import { NewOrderComponent } from '../new-order/new-order.component';
import { OrderSocketService } from 'src/app/servicios/orderSocket.service';
import { delay } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { State } from "src/app/store";
import { loadOrderEffect } from 'src/app/store/actions/orderActions';

export interface CartItem{
  id:string;
  title:string;

}
export interface OrderData {
  id:string;
  amount:number;
  products:Array<any>,
  dateTime:string;

}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private subscription: Subscription;
  sourceABC: Observable<number> = interval(7200);
  private _orderSubscriptor: Subscription;
  constructor(
    private router:Router,
     private cajeroService:CajerosService, 
     private utilities: Utilities,
     public dialog:MatDialog,
     private orderSocketService: OrderSocketService,
     private store:Store<State>
     
     ) { }

  ngOnInit() {
       //ocultar icono y estado de reciviendo pedidos
		this.utilities.setCambioRuta(true);
    this.subscription = this.sourceABC.subscribe()
    this._orderSubscriptor = this.orderSocketService.getOrder.pipe(
     
    ).subscribe((data)=>{

      this.store.dispatch(
        loadOrderEffect({
          order:JSON.parse(data)
        })
      );
      const dialogRef = this.dialog.open(NewOrderComponent, {
        width: `${screen.width}px`,
        height:`${screen.height}px`,
        minWidth:`${screen.width}px`,
      });
    })
  
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewOrderComponent, {
      width: `${screen.width}px`,
      height:`${screen.height}px`,
      minWidth:`${screen.width}px`,
      
      data: {name: "cristian"}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }

  validateToken(){
    const token = localStorage.getItem('token');
    const helper = new JwtHelperService();
    const isExpired = helper.isTokenExpired(token);
    if (isExpired){
      Swal.fire('estimado usuario el token ha expirado por seguridad');
      this.cajeroService.logout();
      this.router.navigate(["/login"]);
    }
  }

}
