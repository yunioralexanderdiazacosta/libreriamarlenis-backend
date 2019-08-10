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
  		return copias
  	}

    resetearCopiasArreglo()
    {
        return copias.length = 0
    }

  	guardarCopiaArreglo(copia)
  	{
  		return copias.push(copia)
  	}

    eliminarCopiaArreglo(indice)
    {
        return copias.splice(indice, 1)
    }

    ultimasCopiasSemana()
    {
        return this.http.get(`${API_URI}/pedidocopias/ultimas`)
    }

    obtenerFotocopiasEfectuadasMes(mes)
    {
        return this.http.get(`${API_URI}/pedidocopias/efectuadas/${mes}`)
    }
    
    obtenerFotocopiasEfectuadasCategoriasMes(mes)
    {
        return this.http.get(`${API_URI}/pedidocopias/categorias/${mes}`)
    }

    ultimasCopiasDanadasSemana(dia)
    {
        return this.http.get(`${API_URI}/copiasdanadas/ultimas/${dia}`)
    }

    obtenerCopiasDanadasMes(mes)
    {
        return this.http.get(`${API_URI}/copiasdanadas/total/${mes}`)
    }

    obtenerCopiasVenta(id)
    {
        return this.http.get(`${API_URI}/pedidocopias/venta/${id}`)
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
