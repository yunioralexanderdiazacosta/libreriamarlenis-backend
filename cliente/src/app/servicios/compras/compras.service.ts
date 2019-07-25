import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { compras } from '../../_datos/compras';
import { API_URI } from '../API_URI';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {

	constructor(public http: HttpClient) { }

	obtenerCompraArreglo()
	{
		return compras
	}

	guardarCompraArreglo(compra)
	{
		return compras.push(compra)
	}

	eliminarProductoCompra(indice)
	{
		return compras.splice(indice, 1);
	}

	obtenerComprasApi()
	{
		return this.http.get(`${API_URI}/compras`)
	}

	guardarCompraApi(compra){
		return this.http.post(`${API_URI}/compras`, compra)
	}

	guardarPedidoCompraApi(pedido)
	{
		return this.http.post(`${API_URI}/compras/pedidos`, pedido)
	}
}
