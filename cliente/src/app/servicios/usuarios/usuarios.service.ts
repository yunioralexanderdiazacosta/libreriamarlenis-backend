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

    obtenerUsuarioEstadistica(id)
    {
        return this.http.get(`${API_URI}/usuarios/estadistica/${id}`)
    }

  	guardarUsuario(usuario)
  	{
  		return this.http.post(`${API_URI}/usuarios/register`, usuario)
  	}

    cambiarClaveUsuario(clave)
    {
       return this.http.put(`${API_URI}/usuarios/cambiar-clave`, clave)
    }
}
