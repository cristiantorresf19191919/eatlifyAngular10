import { Router } from '@angular/router';
import { Injectable,EventEmitter } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root',
  })
export class Utilities{
    private _notificarUpload = new EventEmitter<any>();

    private cambioRuta$ = new Subject<Boolean>();

    private _notificarCambioRuta = new EventEmitter<any>();
    constructor(){}

    static CreateCategory(router){
        router.navigate(['/dashboard/restaurant/categories','openPlease'])

    }
    // actualizar la foto automaticamente cuando se cambie
    get notificarUpload():EventEmitter<any>{
        return this._notificarUpload;
    }
    // forzar cambio de ruta quitar el icono animacion
    get notificarCambioRuta():EventEmitter<any>{
        return this._notificarCambioRuta;
    }

    setCambioRuta(param:Boolean){
        this.cambioRuta$.next(param);
    }

    getCambioRuta():Observable<Boolean>{
        return this.cambioRuta$.asObservable();
    }

    static errorDeConexion(){
        Swal.fire('error','error de conexion reviza internet','error');
    }



}