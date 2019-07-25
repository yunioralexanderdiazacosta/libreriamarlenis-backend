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

	guardarProveedor(proveedor)
	{
		return this.http.post(`${API_URI}/proveedores`, proveedor)
	}
}
