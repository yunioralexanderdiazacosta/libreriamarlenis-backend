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

	obtenerTipoCopia(id)
	{
		return this.http.get(`${API_URI}/tipocopias/${id}`)
	}

	obtenerTipoCopiasArreglo()
	{
		return tipoCopias;
	}

	guardarTipoCopiaArreglo(tipo)
	{
		return tipoCopias.push(tipo)
	}

}
