import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap, delay, retry } from 'rxjs/operators';
import { Observable, of, throwError, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json'
	})
};

@Injectable({
	providedIn: 'root'
})

export class OrderSocketService{
  getOrder = of(); // Return an empty observable

  constructor(/*private socket:Socket*/) { 

  }

}