import { Injectable } from '@angular/core';
import { API_URI } from '../API_URI';
import { HttpClient }from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

constructor(private http: HttpClient) { }

	obtenerUsuarios()
  	{
  		return this.http.get(`${API_URI}/usuarios`)
  	}

  	obtenerUsuario()
  	{
  		return this.http.get(`${API_URI}/usuarios/profile`)
  	}

  	guardarUsuario(usuario)
  	{
  		return this.http.post(`${API_URI}/usuarios/register`, usuario);
  	}
}
