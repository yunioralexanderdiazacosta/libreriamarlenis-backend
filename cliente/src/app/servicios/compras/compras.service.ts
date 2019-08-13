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

	resetearCamposArreglo()
	{
		return compras.length = 0
	}

	obtenerComprasApi()
	{
		return this.http.get(`${API_URI}/compras`)
	}

	obtenerCompra(id)
	{
		return this.http.get(`${API_URI}/compras/detalles/${id}`)
	}

	obtenerDetallesCompra(id)
	{
		return this.http.get(`${API_URI}/compras/detalles/compra/${id}`)
	}

	obtenerComprasPorMes()
	{
		return this.http.get(`${API_URI}/compras/mes`)
	}

	obtenerIngresosProducto(id_producto)
	{
		return this.http.get(`${API_URI}/compras/ingresos/producto/${id_producto}`)
	}

	guardarCompraApi(compra){
		return this.http.post(`${API_URI}/compras`, compra)
	}

	guardarPedidoCompraApi(pedido)
	{
		return this.http.post(`${API_URI}/compras/pedidos`, pedido)
	}

	anularCompra(id, dato)
	{
		return this.http.put(`${API_URI}/compras/anular/${id}`, dato)
	}

	reactivarCompra(id, dato)
	{
		return this.http.put(`${API_URI}/compras/reactivar/${id}`, dato)
	}
}
