import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URI } from '../API_URI';

@Injectable({
  providedIn: 'root'
})
export class ArchivosService {

	constructor(public http: HttpClient) { }

	obtenerArchivosInv(archivo)
	{
		return this.http.post(`${API_URI}/inv_archivo`, archivo)
	}
}
