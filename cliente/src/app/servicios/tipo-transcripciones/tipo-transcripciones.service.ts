import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URI } from '../API_URI'

@Injectable({
  providedIn: 'root'
})
export class TipoTranscripcionesService {

	constructor(public http: HttpClient) { }

	obtenerTipoTranscripciones()
	{
		return this.http.get(`${API_URI}/tipotranscripciones`)
	}

	obtenerTipoTarea(id)
	{
		return this.http.get(`${API_URI}/tipotranscripciones/${id}`)
	}

	actualizarTipoTarea(id, tipo)
	{
		return this.http.put(`${API_URI}/tipotranscripciones/${id}`, tipo)
	}

	desactivarTipoTarea(id, estatus)
	{
		return this.http.put(`${API_URI}/tipotranscripciones/desactivar/${id}`, estatus)
	}

	reactivarTipoTarea(id, estatus)
	{
		return this.http.put(`${API_URI}/tipotranscripciones/reactivar/${id}`, estatus)
	}

	guardarTipoTarea(tipo)
	{
		return this.http.post(`${API_URI}/tipotranscripciones`, tipo)
	}
}
