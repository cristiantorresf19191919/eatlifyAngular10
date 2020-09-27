import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap, delay, retry } from 'rxjs/operators';
import { Observable, of, throwError, Subject } from 'rxjs';
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
export class DeliveryService {
	// pilas no se le olvide cambiar las urls despues

  private url = GLOBAL.url;
	public imageSelected: any;
  private dataObs$ = new Subject();
  private pasefoto$ = new Subject();
	constructor(private httpClient: HttpClient, private router: Router) {}
	getProducts(category) {
		return this.httpClient.get(`${this.url}/deliver/${category}`);
	}
	setItem(item) {
		this.dataObs$.next(item);
	}
	getItem() {
		return this.dataObs$.asObservable();
	}

	updateProduct(item, itemId) {
		return this.httpClient.put(`${this.url}/deliver/${itemId}`,item, httpOptions);
	}

	SubirFoto(image: File, itemId:string) {
		const formData = new FormData();
    formData.append("image", image);
    return this.httpClient.post(`${this.url}/deliver/uploadPic/${itemId}`,formData);
    }



}
