import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DeliveryComponent } from './delivery.component';

const routes: Routes = [
  {
    path:'dashboard/admin/delivery',
    component:DeliveryComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class DeliveryRoutingModule { }
