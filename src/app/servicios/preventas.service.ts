import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { catchError, map, tap, delay, retry } from "rxjs/operators";
import { Observable, of, throwError } from "rxjs";
import { Router } from "@angular/router";
import { GLOBAL } from './url';


const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"

  })
};

@Injectable({
  providedIn: 'root'
})
export class PreventasService {


  token: string;
  authToken: string;
  user: string;

  private url = GLOBAL.url+"/preventas";
  // dfgdfgfd
  constructor(private httpClient: HttpClient, private router: Router) { }


  verVentas(){
    return this.httpClient.get(this.url,httpOptions);
  }
  agregarVenta(venta){
    return this.httpClient.post(this.url,venta,httpOptions);
  }

  borrarVenta(idventa){
    return this.httpClient.delete(`${this.url}/${idventa}`,httpOptions);
  }
  deleteAllSales(){
    return this.httpClient.get(`${this.url}/borretodo` ,httpOptions);
  }

}
