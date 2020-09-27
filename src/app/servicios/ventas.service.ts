import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap, delay, retry } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { GLOBAL } from './url';

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json'
	})
};

@Injectable({
	providedIn: 'root'
})
export class VentasService {
	token: string;
	authToken: string;
	user: string;


	 private url = GLOBAL.url+"/ventas";
  constructor(private httpClient: HttpClient, private router: Router) {}


	agregarVentaSummary(salesFinal) {
		return this.httpClient.post(this.url, salesFinal, httpOptions);
	}
	obtenerVentasSummary() {
		return this.httpClient.get(this.url, httpOptions);
	}

	deleteAllSales() {
		return this.httpClient.get(`${this.url}/eliminarInformesVentas`, httpOptions);
	}
}
