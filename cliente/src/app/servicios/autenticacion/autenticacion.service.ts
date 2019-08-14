import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { API_URI } from '../API_URI';

import { usersDetails } from '../../modelos/usersDetails';
import { TokenPayload } from '../../modelos/tokenPayload';
import { contador } from '../../_datos/contador';

interface TokenResponse{
    token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
	private token: string;

	constructor(
		private http: HttpClient,
		private router: Router) { }

	private saveToken(token: string): void{
    	localStorage.setItem('userToken', token)
    	this.token = token
    }

    private getToken(): string{
    	if(!this.token){
    		this.token = localStorage.getItem('userToken')
    	}
    	return this.token
    }

    public getUserDetails(): usersDetails{
    	const token = this.getToken()
    	let payload
    	if(token) {
    		payload = token.split('.')[1];
    		payload = window.atob(payload);
    		return JSON.parse(payload);
    	}
    	else
    	{
    		return null;
    	}
    }

    public isLoggedIn(): boolean {
    	const user: any = this.getUserDetails();
    	if(user)
    	{
    		return user.exp > Date.now() / 1000
    	}
    	else
    	{
    		return false
    	}
    }

    public login(user: TokenPayload): Observable<any> {
    	const base = this.http.post(`${API_URI}/usuarios/login`, user)

    	const request = base.pipe(
    		map((data: TokenResponse) => {
    			if(data.token){
    				this.saveToken(data.token)
    			}
    			return data
    		})
        )
    	return request 
    }


    public logout(): void {
    	this.token = '';
    	window.localStorage.removeItem('userToken')
        contador.length = 0
    	this.router.navigateByUrl('/iniciarsesion')
    }
}
