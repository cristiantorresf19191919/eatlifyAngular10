import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap, delay, retry } from 'rxjs/operators';
import { Observable, of, throwError, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { GLOBAL } from './url';
import { ModifierGroup } from '../models/ModifierGroup';

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json'
	})
};

@Injectable({
	providedIn: 'root'
})

export class ModifierGroupService{

    constructor(
        private router:Router,
        private httpClient:HttpClient
    ){}

    addModifierGroup(item:ModifierGroup):Observable<ModifierGroup>{
        // return this.httpClient.post(`${this.url}/deliver/${itemId}`,item, httpOptions);

    }
}