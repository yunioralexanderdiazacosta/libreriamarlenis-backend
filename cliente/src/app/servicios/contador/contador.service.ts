import { Injectable } from '@angular/core';
import { contador } from '../../_datos/contador';

@Injectable({
  providedIn: 'root'
})
export class ContadorService {

	constructor() { }

	obtenerContador()
	{
		return contador
	}
}
