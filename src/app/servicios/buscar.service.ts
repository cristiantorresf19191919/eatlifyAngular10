import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuscarService {

  $buscarSujeto = new Subject();

  constructor() { }

  setBuscador(texto){
    this.$buscarSujeto.next(texto);
  }

  getBuscador(){
    return this.$buscarSujeto.asObservable();
  }
}
