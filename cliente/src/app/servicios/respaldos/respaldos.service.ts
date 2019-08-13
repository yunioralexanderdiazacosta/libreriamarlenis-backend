import { Injectable } from '@angular/core';
import { respaldos } from '../../_datos/respaldos';

@Injectable({
  providedIn: 'root'
})
export class RespaldosService {

	constructor() { 
	}
	
	obtenerRespaldos()
	{
		return respaldos
	}

	nuevoRespaldo(respaldo)
	{
		return respaldos.push(respaldo)
	}

	eliminarRespaldo(indice)
	{
		return respaldos.splice(indice, 1)
	}
}
