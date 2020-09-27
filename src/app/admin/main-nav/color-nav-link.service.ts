import { Injectable,EventEmitter } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ColorNavLinkService {
   
    private _rutaCambioEmisor = new EventEmitter<any>();

    private $cambiadorSujeto = new Subject<Boolean>();


    constructor() {}

    get rutaCambioEmisor():EventEmitter<any>{
        return this._rutaCambioEmisor;
    }

    setSujeto(a: Boolean): void {
        this.$cambiadorSujeto.next(a);
    }

    getSujeto(): Observable<Boolean>{
        return this.$cambiadorSujeto.asObservable();
    }

    


}