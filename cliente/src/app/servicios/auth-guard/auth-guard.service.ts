import { Injectable } from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import { AutenticacionService } from '../autenticacion/autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
  	private auth: AutenticacionService,
  	private router: Router) { }

  	canActivate() {
  		if(!this.auth.isLoggedIn()){
  			this.router.navigate(['/iniciarsesion'])
  			return false
  		}
    	return true
  }
}
