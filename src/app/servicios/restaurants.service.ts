import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap, delay, retry } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
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

	private url : string = environment.apiUrl+"/restaurants"; 

    constructor(private httpClient: HttpClient, private router: Router) {
		this.url = environment.apiUrl+"/restaurants" ;
		
    }
    
    saveRestaurant(restaurant:Restaurant): Observable<Restaurant>{
		return this.httpClient.post<Restaurant>(
			`${environment.apiUrl}/restaurants`, restaurant,httpOptions
		);
	}

	uploadPicture(image: File, resId:string) {
		const formData = new FormData();
    formData.append("image", image);
    return this.httpClient.post(`${environment.apiUrl}/restaurants/uploadPic/${resId}`,formData);
	}
	
	getRestaurant():Observable<Restaurant>{
		return this.httpClient.get<Restaurant>(`${environment.apiUrl}/restaurants`);
	}
	
	updateRestaurant(restaurant:Restaurant, id:string):Observable<Restaurant>{
		return this.httpClient.put<Restaurant>(`${environment.apiUrl}/restaurants/${id}`,restaurant, httpOptions);

	}

	deleteRestaurant(id:string){
		return this.httpClient.delete(`${environment.apiUrl}/restaurants/${id}`,httpOptions);
	}

}