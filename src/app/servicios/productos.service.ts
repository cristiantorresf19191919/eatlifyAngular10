import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap, delay, retry } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json'
	})
};

@Injectable({
	providedIn: 'root'
})
export class ProductosService {
	token: string;
	authToken: string;
	user: string;


	private url : string = environment.apiUrl+"/products"; 
	
	constructor(private httpClient: HttpClient, private router: Router) {
		this.url = environment.apiUrl+"/products" ;
		
	}

	private handleError(error: HttpErrorResponse) {
		if (error.error instanceof ErrorEvent) {
			// A client-side or network error occurred. Handle it accordingly.
			console.error('An error occurred:', error.error.message);
		} else {
			// The backend returned an unsuccessful response code.
			// The response body may contain clues as to what went wrong,
			console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
		}
		// return an observable with a user-facing error message
		return throwError('Something bad happened; please try again later.');
	}

	addProduct(product) {
		return this.httpClient.post(environment.apiUrl+'/products', product, httpOptions);
	}
	getProducts() {
	
		return this.httpClient.get(environment.apiUrl+'/products', httpOptions);
	}

	getAddonsProducts() {
	
		return this.httpClient.get(environment.apiUrl+'/products/addons', httpOptions);
	}

	getProductById(id){
		return this.httpClient.get(environment.apiUrl+"/products/"+id);
	}
	UpdateProduct(product) {
		return this.httpClient.put(`${environment.apiUrl+'/products'}/${product._id}`, product, httpOptions);
	}
	DeleteProduct(product) {
		return this.httpClient.delete(`${environment.apiUrl+'/products'}/${product._id}`, httpOptions);
	}
}
