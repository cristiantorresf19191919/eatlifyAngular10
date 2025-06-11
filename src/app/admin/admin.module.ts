import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';

import { AdminRoutingModule } from './admin-routing.module';

// Material & PrimeNG Modules
import { MaterialModule } from '../modules/material.module';
import { PrimengModule } from '../modules/primeng.module';
import { ChartModule } from 'primeng/chart';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';

// Cloudinary
import { CloudinaryModule, CloudinaryConfiguration } from '@cloudinary/angular-5.x';
import { Cloudinary } from 'cloudinary-core';

// Components
import { DashboardComponent } from './dashboard/dashboard.component';
import { ResumenComponent } from './resumen/resumen.component';
import { VentasSocketComponent } from './ventas-socket/ventas-socket.component';
import { JournalComponentComponent } from './journal-component/journal-component.component';
import { NewOrderComponent } from './new-order/new-order.component';
import { LoadingGlobalComponent } from '../loading-global/loading-global.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { CajerosComponent } from './cajeros/cajeros.component';
import { VentasComponent } from './ventas/ventas.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { RealtimeComponent } from './realtime/realtime.component';
import { RealtimeListComponent } from './realtime-list/realtime-list.component';
import { ShowProductsComponent } from './show-products/show-products.component';

// Pipes
import { productFilterPipe } from './show-products/product-filter.pipe';

@NgModule({
  declarations: [
    DashboardComponent,
    ResumenComponent,
    VentasSocketComponent,
    JournalComponentComponent,
    NewOrderComponent,
    LoadingGlobalComponent,
    MainNavComponent,
    CajerosComponent,
    VentasComponent,
    RestaurantComponent,
    RealtimeComponent,
    RealtimeListComponent,
    ShowProductsComponent,
    productFilterPipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    AdminRoutingModule,
    MaterialModule,
    PrimengModule,
    FormsModule,
    ReactiveFormsModule,
    CloudinaryModule.forRoot({ Cloudinary }, { cloud_name: 'dzkewxe2v' } as CloudinaryConfiguration),
    ChartModule,
    DialogModule,
    ToastModule,
    MatToolbarModule,
    MatListModule
  ],
  exports: [LoadingGlobalComponent],
})
export class AdminModule {}
