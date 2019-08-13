import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URI } from '../API_URI';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

	constructor(public http: HttpClient) { }

	listarCompras(desde, hasta)
	{
		return this.http.get(`${API_URI}/compras/${desde}/${hasta}`)
	}

	listarVentas(desde, hasta)
	{
		return this.http.get(`${API_URI}/ventas/${desde}/${hasta}`)
	}

	listarCopias(desde, hasta)
	{
		return this.http.get(`${API_URI}/pedidocopias/${desde}/${hasta}`)
	}

	obtenerCopiasDanadas(desde, hasta)
	{
		return this.http.get(`${API_URI}/copiasdanadas/${desde}/${hasta}`)
	}
}
