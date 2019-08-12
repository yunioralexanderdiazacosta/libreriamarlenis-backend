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

	obtenerCategoriaProducto(id)
	{
		return this.http.get(`${API_URI}/categoriasproductos/${id}`)
	}

	guardarCartegoriaProducto(producto)
	{
		return this.http.post(`${API_URI}/categoriasproductos`, producto)
	}

	actualizarCategoriaProducto(id, producto)
	{
		return this.http.put(`${API_URI}/categoriasproductos/${id}`, producto)
	}

	desactivarCategoria(id, estatus)
	{
		return this.http.put(`${API_URI}/categoriasproductos/desactivar/${id}`, estatus)
	}

	reactivarCategoria(id, estatus)
	{
		return this.http.put(`${API_URI}/categoriasproductos/reactivar/${id}`, estatus)
	}
}
