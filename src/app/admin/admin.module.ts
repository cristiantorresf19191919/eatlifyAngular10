import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AdminRoutingModule } from "./admin-routing.module";
import { MaterialModule } from "../modules/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MainNavComponent } from "./main-nav/main-nav.component";
import { LayoutModule } from "@angular/cdk/layout";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { ProductsComponent } from "./parent-products/products/products.component";
import { CajerosComponent } from "./cajeros/cajeros.component";
import { VentasComponent } from "./ventas/ventas.component";
import { PrimengModule } from "../modules/primeng.module";
import { ResumenComponent } from "./resumen/resumen.component";
import { MatChipsModule } from "@angular/material/chips";
import { JournalComponentComponent } from "./journal-component/journal-component.component";
import { RealtimeComponent } from "./realtime/realtime.component";
import { RealtimeListComponent } from "./realtime-list/realtime-list.component";
import { VentasSocketComponent } from "./ventas-socket/ventas-socket.component";
import { ShowProductsComponent } from "./show-products/show-products.component";
import { CategoriesComponent } from "./parent-products/categories/categories.component";
import { ParentProductsComponent } from "./parent-products/parent-products.component";
import { DeliveryComponent } from './parent-products/delivery/delivery.component';
import { BakeryDeliComponent } from './parent-products/delivery/bakery-deli/bakery-deli.component';
import { CreateProductComponent } from './parent-products/delivery/create-product/create-product.component';
import { LoadingGlobalComponent } from '../loading-global/loading-global.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { EffectsModule } from '@ngrx/effects';
import { RestaurantEffects } from './restaurant.effects';
import { NewOrderComponent } from './new-order/new-order.component';

@NgModule({
  declarations: [
    DashboardComponent,    
    MainNavComponent,
    NewOrderComponent,    
    CajerosComponent,
    VentasComponent,
    ResumenComponent,
    JournalComponentComponent,
    RealtimeComponent,
    RealtimeListComponent,
    VentasSocketComponent,
    ShowProductsComponent,   
    CategoriesComponent,    
    LoadingGlobalComponent,
    RestaurantComponent,
    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    PrimengModule,
    MatChipsModule,
    EffectsModule.forFeature([RestaurantEffects]),
  ],
  exports: [AdminRoutingModule,LoadingGlobalComponent,NewOrderComponent],
})
export class AdminModule {}
