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

	private url : string = environment.url+"/restaurants"; 

    constructor(private httpClient: HttpClient, private router: Router) {
		this.url = environment.url+"/restaurants" ;
		
    }
    
    saveRestaurant(restaurant:Restaurant): Observable<Restaurant>{
		return this.httpClient.post<Restaurant>(
			`${environment.url}/restaurants`, restaurant,httpOptions
		);
	}

	uploadPicture(image: File, resId:string) {
		const formData = new FormData();
    formData.append("image", image);
    return this.httpClient.post(`${environment.url}/restaurants/uploadPic/${resId}`,formData);
	}
	
	getRestaurant():Observable<Restaurant>{
		return this.httpClient.get<Restaurant>(`${environment.url}/restaurants`);
	}
	
	updateRestaurant(restaurant:Restaurant, id:string):Observable<Restaurant>{
		return this.httpClient.put<Restaurant>(`${environment.url}/restaurants/${id}`,restaurant, httpOptions);

	}

	deleteRestaurant(id:string){
		return this.httpClient.delete(`${environment.url}/restaurants/${id}`,httpOptions);
	}

}