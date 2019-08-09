import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { transcripciones } from '../../_datos/transcripciones';
import { API_URI } from '../API_URI';

@Injectable({
  providedIn: 'root'
})
export class TranscripcionesService {

	constructor(private http: HttpClient) { }

	obtenerTranscripcionesArreglo()
	{
		return transcripciones
	}

	guardarTranscripcionArreglo(transcripcion)
	{
		return transcripciones.push(transcripcion)
	}

	eliminarTranscripcionArreglo(indice)
	{
		return transcripciones.splice(indice, 1)
	}

	actualizarTranscripcionPendiente(id, transcripcion)
	{
		return this.http.put(`${API_URI}/pedidotranscripciones/actualizar/${id}`, transcripcion)
	}

	guardarTranscripcion(transcripcion)
	{
		return this.http.post(`${API_URI}/pedidotranscripciones`, transcripcion)
	}

	obtenerTranscripcionesAsignadasEmpleado(id, mes)
	{
		return this.http.get(`${API_URI}/pedidotranscripciones/usuario/${id}/mes/${mes}`)
	}

	obtenerTotalTranscripcionesAsignadas(mes)
	{
		return this.http.get(`${API_URI}/pedidotranscripciones/general/mes/${mes}`)
	}

	obtenerTranscripcionesAsignadas(id, mes)
	{
		return this.http.get(`${API_URI}/pedidotranscripciones/user/${id}/month/${mes}`)
	}

	obtenerTranscripcionesPendientes(id)
	{
		return this.http.get(`${API_URI}/pedidotranscripciones/pendientes/${id}`)
	}

	obtenerTranscripcionPendiente(id)
	{
		return this.http.get(`${API_URI}/pedidotranscripciones/pedido/${id}`)
	}

	obtenerTranscripciones()
	{
		return this.http.get(`${API_URI}/pedidotranscripciones`)
	}

	buscarTranscripcionItems(id, palabra)
	{
		if(id)
		{
			return this.http.get(`${API_URI}/pedidotranscripciones/buscar/${id}/${palabra}`)
		}
		else
		{
			return this.http.get(`${API_URI}/pedidotranscripciones/buscar/${palabra}`)	
		}
	}
}
