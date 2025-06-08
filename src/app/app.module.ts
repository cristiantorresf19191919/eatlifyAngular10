import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingGlobalComponent } from './loading-global/loading-global.component';
import { MaterialModule } from './modules/material.module';
import { PrimengModule } from './modules/primeng.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CloudinaryConfiguration, CloudinaryModule } from '@cloudinary/angular-5.x';
import { Cloudinary } from "cloudinary-core";
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { ROOT_REDUCERS } from './store';
import { environment } from '../environments/environment';
import { AdminModule } from './admin/admin.module';

import { PrimerInterceptor } from './http-interceptors/primer-interceptor';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

const config:SocketIoConfig = {url:'localhost:8000', options:{}};
  // const config:SocketIoConfig = {url:'https://posdeliveryapp.herokuapp.com', options:{}};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent

  ],
  imports: [
    CloudinaryModule.forRoot({Cloudinary}, { cloud_name: 'dzkewxe2v' } as CloudinaryConfiguration),
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PrimengModule,
    StoreModule.forRoot(ROOT_REDUCERS),
    EffectsModule.forRoot([]),
    SocketIoModule.forRoot(config),
    PrimengModule,
    AdminModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: PrimerInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
