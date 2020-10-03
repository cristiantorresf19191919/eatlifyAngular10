import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { CategoriesComponent } from './categories/categories.component';
import { CreateProductComponent } from './delivery/create-product/create-product.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { ModifierGroupsComponent } from './modifier-groups/modifier-groups.component';
import { NewModifierComponent } from './new-modifier/new-modifier.component';
import { ParentProductsComponent } from './parent-products.component';
import { ProductsComponent } from './products/products.component';

const routes:Routes = [
    {
        path:'',
        component:ParentProductsComponent,       
        children:[
            {
                path:"products",
                component: ProductsComponent,
               
            },
            {
                path:'delivery',
                component: DeliveryComponent
            },
            {
                path:'create',
                component:CreateProductComponent
            },
            {
                path:'categories',
                component:CategoriesComponent
            },{
                path:'modifierGroups',
                component:ModifierGroupsComponent
            },
            {
                path:'newModifier',
                component:NewModifierComponent
            }
        

        ]
    }
   
  
   
]


@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class parentProductsRoutingModule{}