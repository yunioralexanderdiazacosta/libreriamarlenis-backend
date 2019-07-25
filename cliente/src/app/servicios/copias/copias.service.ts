import { Injectable } from '@angular/core';
import { copias } from '../../_datos/copias';
import { HttpClient } from '@angular/common/http'
import { API_URI } from '../API_URI'

@Injectable({
  providedIn: 'root'
})
export class CopiasService {

  	constructor(public http: HttpClient) { }

	  obtenerCopiasArreglo()
  	{
  		return copias;
  	}

  	guardarCopiaArreglo(copia)
  	{
  		return copias.push(copia);
  	}

    eliminarCopiaArreglo(indice)
    {
        return copias.splice(indice, 1);
    }

    guardarCopias(copia)
    {
        return this.http.post(`${API_URI}/pedidocopias`, copia)
    }

    guardarCopiasDanadas(copia)
    {
        return this.http.post(`${API_URI}/copiasdanadas`, copia)
    }
}
