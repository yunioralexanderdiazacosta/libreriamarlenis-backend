import { Injectable } from '@angular/core';
import { API_URI } from '../API_URI';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CatProductosService {

	constructor(public http: HttpClient) { }
	
	obtenerCategoriasProductos()
	{
		return this.http.get(`${API_URI}/categoriasproductos`)
	}	
}
