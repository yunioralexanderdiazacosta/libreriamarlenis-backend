import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../servicios/usuarios/usuarios.service';
import { TranscripcionesService } from '../../../servicios/transcripciones/transcripciones.service';
import { VentasService }from '../../../servicios/ventas/ventas.service';
import { ActivatedRoute } from '@angular/router';
import { meses } from '../../../_datos/meses';

@Component({
  selector: 'app-estadisticas-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EstadisticasEmpleadosComponent implements OnInit {
	/**
	* Datos del usuario
	*
	*@property {any}
	**/
	empleado

	/**
	* Año actual
	*
	*@property {any}
	**/
	ano 

	/**
	* Almacena los meses obtenidos del arreglo
	*
	*@property {any}
	**/
	meses

	/**
	* Almacena el nombre del mes seleccionado
	*
	*@property {string}
	**/
	mesSeleccionado: string

	/**
	* Cantidad de transcripciones asignadas a empleado
	*
	*@property {number}
	**/
	transcripcionesAsignadas: number

	/**
	* Cantidad de transcripciones asignadas en general
	*
	*@property {number}
	**/
	totalTranscripcionesAsignadas: number

	/**
	* Cantidad de ventas realizadas por empleado
	*
	*@property {number}
	**/
	ventasRealizadas: number

	/**
	* Cantidad de ventas realizadas en general
	*
	*@property {number}
	**/
	totalVentasRealizadas: number

	/**
	* Porcentaje de ventas
	*
	*@property {any}
	**/
	porcentajeVentas: any = 0

	/**
	* Porcentaje de transcripciones
	*
	*@property {any}
	**/
	porcentajeTranscripciones: any = 0

	constructor(
  		public usuariosService: UsuariosService,
  		public transcripcionesService: TranscripcionesService,
  		public ventasService: VentasService,
  		public activatedRoute: ActivatedRoute) { 

		const dia = new Date()
		this.ano = dia.getFullYear()
		const params = this.activatedRoute.snapshot.params
		this.obtenerUsuario(params.id)
		this.obtenerTranscripciones(params.id, params.mes)
		this.obtenerVentasRealizadas(params.id, params.mes)
		this.obtenerMes(params.mes) 
	}

  	ngOnInit() {}

  	obtenerMes(mes)
 	{
 		this.meses = meses
 		this.meses.find(dato => {
 			if(dato.id == mes)
 			{
 				this.mesSeleccionado = dato.nombre
 			}
 		})
 	}

 	obtenerUsuario(id)
 	{
 		this.usuariosService.obtenerUsuarioEstadistica(id).subscribe(
 		res => {
 			this.empleado = res
 		},
 		err => {
 			console.log(err)
 		})
 	}	

 	obtenerTranscripciones(id, mes)
 	{
 		this.transcripcionesService.obtenerTranscripcionesAsignadasEmpleado(id, mes).subscribe(
 	    (res:any) => {	
 	    	this.transcripcionesAsignadas = res.totalTranscripcionesAsignadas

 	    	this.transcripcionesService.obtenerTotalTranscripcionesAsignadas(mes).subscribe(
 	    	(res:any) => {

 	    		this.totalTranscripcionesAsignadas = res.totalTranscripcionesAsignadas
 	    		if(this.totalTranscripcionesAsignadas > 0)
 	    		{
 	    			var calculoPorcentajeTranscripciones = (this.transcripcionesAsignadas / this.totalTranscripcionesAsignadas) * 100
 	    			this.porcentajeTranscripciones = calculoPorcentajeTranscripciones.toFixed(2)
 	    		}
 	    		else
 	    		{
 	    			this.porcentajeTranscripciones = 0
 	    		}

 	    	},
 	    	err => {
 	    		console.log(err)
 	    	})
 	    },
 	    err => {
 	    	console.log(err)
 	    })
 	} 

 	obtenerVentasRealizadas(id, mes)
 	{
 		this.ventasService.obtenerVentasRealizadasPorUsuario(id, mes).subscribe(
 		(res:any) => {
 			this.ventasRealizadas = res.totalVentas

	 		this.ventasService.obtenerTotalVentasRealizadas(mes).subscribe(
	 		(res:any) => {

	 			this.totalVentasRealizadas = res.totalVentas
	 			if(this.totalVentasRealizadas > 0)
	 			{
	 				var calculoPorcentajeVentas = (this.ventasRealizadas / this.totalVentasRealizadas) * 100
	 				this.porcentajeVentas = calculoPorcentajeVentas.toFixed(2)
	 			}
	 			else
	 			{
	 				this.porcentajeVentas = 0
	 			}
	 		},
	 		err => {
	 			console.log(err)
	 		})
 		},
 		err => {
 			console.log(err)
 		})
 	}
}
