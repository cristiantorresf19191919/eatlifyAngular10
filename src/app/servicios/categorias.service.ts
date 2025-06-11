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
export class CategoriasService {

    private url = environment.apiUrl+'/categorias';
    constructor(private httpClient : HttpClient, private router: Router) { }
    getCategories(){
      return this.httpClient.get(this.url);
    }
    addCategory(category){
      return this.httpClient.post(this.url,category,httpOptions);
    }
    updateCategory(id, modifiedCat){
      return this.httpClient.put(`${this.url}/${id}`, modifiedCat, httpOptions);
    }

    deleteCategory(id){
      return this.httpClient.delete(`${this.url}/${id}`);
    }



}
