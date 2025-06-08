import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParentProductsComponent } from './parent-products.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { BakeryDeliComponent } from './delivery/bakery-deli/bakery-deli.component';
import { CreateProductComponent } from './delivery/create-product/create-product.component';
import { ModifierGroupsComponent } from './modifier-groups/modifier-groups.component';
import { NewModifierComponent } from './new-modifier/new-modifier.component';

const routes: Routes = [
  {
    path: '',
    component: ParentProductsComponent,
    children: [
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      { path: 'products', component: ProductsComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'categories/:open', component: CategoriesComponent },
      { path: 'create', component: CreateProductComponent },
      {
        path: 'delivery',
        component: DeliveryComponent,
        children: [
          { path: 'bakery', component: BakeryDeliComponent },
          { path: 'create-product', component: CreateProductComponent },
        ],
      },
      { path: 'delivery/:abraModal', component: DeliveryComponent },
      {
        path: 'modifierGroups',
        component: ModifierGroupsComponent
      },
      {
        path: 'newModifier',
        component: NewModifierComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParentProductsRoutingModule {}