import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	constructor(private Router: Router) {}
	token: string;

	canActivate(): boolean {
		if (!this.TokenValide()) {
			this.Router.navigate([ 'login' ]);
			return false;
		} else if (this.TokenValide()) {
			return true;
		}
	}

	TokenValide(): Boolean {
    const token = localStorage.getItem('token');
    const helper = new JwtHelperService();
    const isExpired = helper.isTokenExpired(token);
    if (isExpired){
      return false;
    }
    if (token){
      return true;
    }else{
      return false;
    }
  }


}
