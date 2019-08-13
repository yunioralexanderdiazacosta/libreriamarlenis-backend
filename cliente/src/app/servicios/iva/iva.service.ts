import { Injectable } from '@angular/core';
import { API_URI } from '../API_URI';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IvaService {

	constructor(public http: HttpClient) { }

	obtenerImpuesto()
	{
		return this.http.get(`${API_URI}/impuesto`)
	}

	actualizarImpuesto(impuesto)
	{
		return this.http.put(`${API_URI}/impuesto`, impuesto)
	}
}
