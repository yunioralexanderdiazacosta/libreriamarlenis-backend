import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URI } from '../API_URI';
import { tipoCopias } from '../../_datos/tipoCopias';

@Injectable({
  providedIn: 'root'
})
export class TipoCopiasService {

	constructor(public http: HttpClient) { }

	obtenerTipoCopias()
	{
		return this.http.get(`${API_URI}/tipocopias`);
	}

	obtenerTipoCopiasArreglo()
	{
		return tipoCopias
	}

	guardarTipoCopiaArreglo(tipo)
	{
		return tipoCopias.push(tipo)
	}

	obtenerTipoCopia(id)
	{
		return this.http.get(`${API_URI}/tipocopias/${id}`)
	}

	actualizarTipoCopia(id, tipocopia)
	{
		return this.http.put(`${API_URI}/tipocopias/${id}`, tipocopia)
	}

	desactivarTipoCopia(id, estatus)
	{
		return this.http.put(`${API_URI}/tipocopias/desactivar/${id}`, estatus)
	}

	reactivarTipoCopia(id, estatus)
	{
		return this.http.put(`${API_URI}/tipocopias/reactivar/${id}`, estatus)
	}

	guardarTipoCopia(tipocopia)
	{
		return this.http.post(`${API_URI}/tipocopias`, tipocopia)
	}
}
