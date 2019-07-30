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

	anularVenta(id, dato)
	{
		return this.http.put(`${API_URI}/ventas/anular/${id}`, dato)
	}

	reactivarVenta(id, dato)
	{
		return this.http.put(`${API_URI}/ventas/reactivar/${id}`, dato)
	}
}
