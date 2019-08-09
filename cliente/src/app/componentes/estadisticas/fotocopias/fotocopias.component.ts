import { Component, OnInit } from '@angular/core';
import { CopiasService } from '../../../servicios/copias/copias.service';
import { ActivatedRoute } from '@angular/router';
import { meses } from '../../../_datos/meses';

@Component({
  selector: 'app-fotocopias',
  templateUrl: './fotocopias.component.html',
  styleUrls: ['./fotocopias.component.css']
})
export class EstadisticasFotocopiasComponent implements OnInit {
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
	* Año actual
	*
	*@property {any}
	**/
	ano 

	/**
	* Almacena los pedidos de copias obtenidos de la API
	*
	*@property {any}
	**/
	copias 

	/**
	* Almacena los ingresos obtenidos
	*
	*@property {number}
	**/
	ingresosObtenidos: number = 0

	/**
	* Almacena las fotocopias exitosas
	*
	*@property {number}
	**/
	fotocopiasExitosas: number = 0

	/**
	* Almacena las fotocopias dañadas
	*
	*@property {number}
	**/
	fotocopiasDanadas: number = 0

	/**
	* Almacena el total de fotocopias efectuadas
	*
	*@property {number}
	**/
	fotocopiasEfectuadas: number = 0

	constructor(
		public copiasService: CopiasService,
		public activatedRoute: ActivatedRoute) { 

		const dia = new Date()
		this.ano = dia.getFullYear()

		const params = this.activatedRoute.snapshot.params
		this.obtenerMes(params.mes)
		this.obtenerFotocopiasEfectuadas(params.mes)
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

  	obtenerFotocopiasEfectuadas(mes)
  	{
  		this.copiasService.obtenerFotocopiasEfectuadasMes(mes).subscribe(
  		res => {
  			this.copias = res
  			this.copias.filter(dato => {
  				this.ingresosObtenidos = this.ingresosObtenidos + dato.subtotal
  				this.fotocopiasExitosas = this.fotocopiasExitosas + parseInt(dato.cantidad)
  			})

  			this.copiasService.obtenerCopiasDanadasMes(mes).subscribe(
  			(res:any) => {
  				if(res.cantidadCopias != null)
  				{
  					this.fotocopiasDanadas = parseInt(res.cantidadCopias)
  				}
  				this.fotocopiasEfectuadas = this.fotocopiasExitosas + this.fotocopiasDanadas
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
