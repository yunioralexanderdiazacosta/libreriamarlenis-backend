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
}
