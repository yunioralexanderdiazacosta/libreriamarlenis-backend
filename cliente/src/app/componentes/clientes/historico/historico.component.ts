import { Component, OnInit } from '@angular/core';
import { VentasService } from '../../../servicios/ventas/ventas.service';
import { ClientesService } from '../../../servicios/clientes/clientes.service';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment'; 

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css']
})
export class HistoricoClienteComponent implements OnInit {
	/**
	* Almacena los datos del cliente seleccionado obtenido de la API
	*
	*@property {any}
	**/
	cliente

	/**
	* Almacena los datos de las ventas asociadas al cliente seleccionado obtenido de la API
	*
	*@property {any}
	**/	
	ventas

	/**
    *Pagina inicial de la paginacion
    *
    *@property {number}
    **/
    p: number = 1

	constructor(
		public ventasService: VentasService,
		public clientesService: ClientesService,
		public activatedRoute: ActivatedRoute) { 

		const params = this.activatedRoute.snapshot.params
		this.obtenerDatosCliente(params.id)
		this.obtenerVentasCliente(params.id)
	}

	ngOnInit() {}

	/**
	* obtiene los datos del cliente de la API y los almacena
	*
	*@return {void}
	**/	
  	obtenerDatosCliente(id)
  	{
  		this.clientesService.obtenerCliente(id).subscribe(
  		res => {
  			this.cliente = res
  		},
  		err => {
  			console.log(err)
  		})
  	}

  	/**
	* obtiene los datos de las ventas asociadas al cliente a traves de la API y los almacena
	*
	*@return {void}
	**/	
  	obtenerVentasCliente(id)
  	{
  		this.ventasService.obtenerAtencionesCliente(id).subscribe(
  		res => {
  			this.ventas = res
  			this.ventas.filter(dato => {
  				dato.created_at = moment(dato.created_at).format("DD-MM-YYYY hh:mm a")
  			})
  		}, 
  		err => {
  			console.log(err)
  		})
  	}

}
