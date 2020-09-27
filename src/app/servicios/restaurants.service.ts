import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap, delay, retry } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { GLOBAL } from './url';
import { Restaurant } from '../models/Restaurant';


const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json'
	})
};

@Injectable({
	providedIn: 'root'
})
export class RestaurantService{

	private url : string = GLOBAL+"/restaurants"; 

    constructor(private httpClient: HttpClient, private router: Router) {
		this.url = GLOBAL+"/restaurants" ;
		
    }
    
    saveRestaurant(restaurant:Restaurant): Observable<Restaurant>{
		return this.httpClient.post<Restaurant>(
			`${GLOBAL.url}/restaurants`, restaurant,httpOptions
		);
	}

	uploadPicture(image: File, resId:string) {
		const formData = new FormData();
    formData.append("image", image);
    return this.httpClient.post(`${GLOBAL.url}/restaurants/uploadPic/${resId}`,formData);
	}
	
	getRestaurant():Observable<Restaurant>{
		return this.httpClient.get<Restaurant>(`${GLOBAL.url}/restaurants`);
	}
	
	updateRestaurant(restaurant:Restaurant, id:string):Observable<Restaurant>{
		return this.httpClient.put<Restaurant>(`${GLOBAL.url}/restaurants/${id}`,restaurant, httpOptions);

	}

	deleteRestaurant(id:string){
		return this.httpClient.delete(`${GLOBAL.url}/restaurants/${id}`,httpOptions);
	}

}