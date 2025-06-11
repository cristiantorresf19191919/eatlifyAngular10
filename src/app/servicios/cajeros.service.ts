import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { catchError, map, tap, delay, retry } from "rxjs/operators";
import { Observable, of, throwError } from "rxjs";
import { Router } from "@angular/router";
import { environment } from 'src/environments/environment';

interface Usuario{
  id: string,
  name: string,
  admin: boolean,
  superuser: boolean,
}


const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"

  })
};

@Injectable({
  providedIn: 'root'
})
export class CajerosService {


  token: string;
  authToken: string;
  user: string;
  usuario: Usuario;


  // pilas no se le olvide cambiar las urls despues
  // private url = "http://localhost:5000";
  private url = environment.apiUrl;

  constructor(private httpClient: HttpClient, private router: Router) { }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

  Registro(user) {

    return this.httpClient
      .post(`${this.url}/registrounico`, user, httpOptions);

  }

  loginCajero(user) {
    return this.httpClient
      .post(`${this.url}/cajeros/loginCajero`, user, httpOptions);
  }

  AgregarCajero(cajero){
    return this.httpClient
    .post(`${this.url}/cajeros/agregarCajero`,cajero,httpOptions);
  }

  ComparaEmail(correo) {
    return this.httpClient
      .get(`${this.url}/cajeros/compareEmail?email=${correo}`)
      .pipe(delay(400));
  }
  guardeUsuario(usuario) {
    localStorage.setItem("name", usuario.name);
    if (usuario.admin) localStorage.setItem("admin", "admin");
  }

  getCajero(){
    return this.usuario;
  }

  verCajeros(){
    return this.httpClient.get(`${this.url}/cajeros/verCajero`);
  }

  deleteCajero(cajeroId){
    return this.httpClient
    .delete(`${this.url}/cajeros/eliminarCajero/${cajeroId}`, httpOptions);
  }

  updateUser(user) {
    return this.httpClient
      .put(`${this.url}/cajeros/actualizarCajero/${user._id}`, user, httpOptions);
  }

  getRestaurants() {
    return this.httpClient
      .get(`${this.url}/restaurante`, httpOptions);
  }

  postRestaurants(restaurante) {
    return this.httpClient
      .post(`${this.url}/restaurante`, restaurante, httpOptions)
      .pipe(catchError(this.handleError));

  }

  updateRestaurante(restaurante) {
    return this.httpClient
      .put(`${this.url}/restaurante`, restaurante, httpOptions)
      .pipe(catchError(this.handleError));

  }

  storeUserData(token, usuario, usuarioId) {
    localStorage.setItem("token", token);
    localStorage.setItem("user", usuario);
    localStorage.setItem("userId",usuarioId)
    this.authToken = token;
    this.user = usuario;
  }

  getUser() {
    return this.user;
  }

  logout() {
    localStorage.clear();
  }



}
