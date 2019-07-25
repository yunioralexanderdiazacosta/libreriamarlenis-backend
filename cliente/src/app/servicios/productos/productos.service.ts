import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { productosVenta } from '../../_datos/productosVenta';
import { productos } from '../../_datos/productos';
import { API_URI } from '../API_URI';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

	constructor(public http: HttpClient) { }

	obtenerProductosVenta()
	{
		return productosVenta;
	}

	guardarProductoVenta(venta)
	{
		return productosVenta.push(venta);
	}

	eliminarProductoVenta(indice)
	{
		return productosVenta.splice(indice, 1);
	}

	obtenerProductosArreglo()
	{
		return productos;
	}

	guardarProductoArreglo(producto)
	{
		return productos.push(producto)
	}

	obtenerProductos()
	{
		return this.http.get(`${API_URI}/productos`);
	}

	obtenerProducto(id)
	{
		return this.http.get(`${API_URI}/productos/${id}`);
	}

	guardarProducto(producto)
	{
		return this.http.post(`${API_URI}/pedidoproductos`, producto)
	}

	actualizarInventarioProducto(producto)
	{
		return this.http.put(`${API_URI}/productos/inventario`, producto)
	}

	aumentarInventarioProducto(producto)
	{
		return this.http.put(`${API_URI}/productos/aumentar-inventario`, producto)
	}
}
