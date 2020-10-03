import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/modules/material.module';
import { PrimengModule } from 'src/app/modules/primeng.module';

import { BakeryDeliComponent } from './delivery/bakery-deli/bakery-deli.component';
import { CreateProductComponent } from './delivery/create-product/create-product.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { parentProductsRoutingModule } from './parent-products-routing.module';
import { ParentProductsComponent } from './parent-products.component';
import { ProductsComponent } from './products/products.component';
import { ModifierGroupsComponent } from './modifier-groups/modifier-groups.component';
import { NewModifierComponent } from './new-modifier/new-modifier.component';

@NgModule({
  declarations: [
    ParentProductsComponent,
    ProductsComponent,
    DeliveryComponent,
    BakeryDeliComponent,
    CreateProductComponent,
    ModifierGroupsComponent,
    NewModifierComponent,

  ],
  imports: [
    CommonModule,
    parentProductsRoutingModule,
    MaterialModule,
    PrimengModule,
    FormsModule,
  ],
  exports: [parentProductsRoutingModule],
})
export class ParentProductsModule {}
