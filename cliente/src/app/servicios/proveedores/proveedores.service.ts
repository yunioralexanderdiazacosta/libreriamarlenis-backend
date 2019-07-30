import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URI } from '../API_URI'

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

	constructor(public http: HttpClient) { }

	obtenerProveedores()
	{
		return this.http.get(`${API_URI}/proveedores`)
	}

	obtenerProveedor(id)
	{
		return this.http.get(`${API_URI}/proveedores/${id}`)
	}

	guardarProveedor(proveedor)
	{
		return this.http.post(`${API_URI}/proveedores`, proveedor)
	}

	actualizarProveedor(id, proveedor)
	{
		return this.http.put(`${API_URI}/proveedores/${id}`, proveedor)
	}

	desactivarProveedor(id, dato)
	{
		return this.http.put(`${API_URI}/proveedores/desactivar/${id}`, dato)
	}

	activarProveedor(id, dato)
	{
		return this.http.put(`${API_URI}/proveedores/activar/${id}`, dato)
	}
}

