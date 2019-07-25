import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URI } from '../API_URI';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

	constructor(public http: HttpClient) { }

	obtenerVentas()
	{
		return this.http.get(`${API_URI}/ventas`)
	}

	guardarVenta(venta)
	{
		return this.http.post(`${API_URI}/ventas`, venta)
	}
}
