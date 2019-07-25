import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URI } from '../API_URI';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

	constructor(private http: HttpClient) { }

	obtenerClientes()
	{
		return this.http.get(`${API_URI}/clientes`);
	}

	obtenerCliente(id)
	{
		return this.http.get(`${API_URI}/clientes/${id}`);
	}

	guardarCliente(cliente)
	{
		return this.http.post(`${API_URI}/clientes`, cliente);
	}
}
