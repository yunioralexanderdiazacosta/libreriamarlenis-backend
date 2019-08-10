import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URI } from '../API_URI';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

	constructor(public http: HttpClient) { }

	obtenerVentas()
	{
		return this.http.get(`${API_URI}/ventas`)
	}

	obtenerVenta(id)
	{
		return this.http.get(`${API_URI}/ventas/${id}`)
	}

	obtenerVentasPorMes()
	{
		return this.http.get(`${API_URI}/ventas/mes`)
	}

	ultimasVentasSemana()
	{
		return this.http.get(`${API_URI}/ventas/ultimas`)
	}

	obtenerAtencionesCliente(id)
	{
		return this.http.get(`${API_URI}/ventas/cliente/${id}`)
	}

	obtenerClientesAtendidosMes()
	{
		return this.http.get(`${API_URI}/ventas/clientes-atendidos`)
	}

	obtenerClientesFrecuentes()
	{
		return this.http.get(`${API_URI}/ventas/clientes-frecuentes`)
	}
	
	obtenerVentasRealizadasPorUsuario(id, mes)
	{
		return this.http.get(`${API_URI}/ventas/usuario/${id}/mes/${mes}`)
	}

	obtenerTotalVentasRealizadas(mes)
	{
		return this.http.get(`${API_URI}/ventas/general/mes/${mes}`)
	}

	guardarVenta(venta)
	{
		return this.http.post(`${API_URI}/ventas`, venta)
	}

	anularVenta(id, dato)
	{
		return this.http.put(`${API_URI}/ventas/anular/${id}`, dato)
	}

	reactivarVenta(id, dato)
	{
		return this.http.put(`${API_URI}/ventas/reactivar/${id}`, dato)
	}
}
