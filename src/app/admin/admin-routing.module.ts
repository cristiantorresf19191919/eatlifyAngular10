import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AuthGuard } from "../servicios/auth.guard";

import { CajerosComponent } from "./cajeros/cajeros.component";
import { VentasComponent } from "./ventas/ventas.component";

import { LoginComponent } from "../login/login.component";

import { VentasSocketComponent } from "./ventas-socket/ventas-socket.component";
import { CategoriesComponent } from "./parent-products/categories/categories.component";


import { BakeryDeliComponent } from "./parent-products/delivery/bakery-deli/bakery-deli.component";
import { CreateProductComponent } from './parent-products/delivery/create-product/create-product.component';
import { ProductsComponent } from './parent-products/products/products.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { ParentProductsComponent } from './parent-products/parent-products.component';
import { DeliveryComponent } from './parent-products/delivery/delivery.component';
import { ResumenComponent } from './resumen/resumen.component';
import { RealtimeComponent } from './realtime/realtime.component';


const routes: Routes = [
  {
    path: "",
    redirectTo: "/login",
    pathMatch: "full",
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "admin",
    redirectTo: "/dashboard",
    pathMatch: "full",
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "products",
        component: ProductsComponent,
      },
      { path: "restaurant",
       component: RestaurantComponent },
       {
         path:"parentProducts",
         loadChildren: () => import('./parent-products/parent-products.module').then(m => m.ParentProductsModule)
       },
     /*  {
        path: "parentProducts",
        component: ParentProductsComponent,
        children: [
          {path:'', redirectTo:'products',pathMatch:'full'},
          { path: "products", component: ProductsComponent },
          { path: "categories", component: CategoriesComponent },
          
          { path: "categories/:open", component: CategoriesComponent },
          {
            path:"delivery/:abraModal",
            component:DeliveryComponent
        },
          {
            path: "delivery",
            component: DeliveryComponent,
            children: [
              {
                path: "Bakery",
                component: BakeryDeliComponent,
              },
              {
                path:"CreateProduct",
                component: CreateProductComponent
              }
            ],
          },
        ],
      }, */
      {
        path: "cajeros",
        component: CajerosComponent,
      },
      {
        path: "ventas",
        component: VentasComponent,
      },
      {
        path: "resumen",
        component: ResumenComponent,
      },
      {
        path: "realtime",
        component: RealtimeComponent,
      },
      {
        path: "socketventas",
        component: VentasSocketComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
