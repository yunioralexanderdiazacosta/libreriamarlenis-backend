import { Component, OnInit } from '@angular/core';
import { ReportesService } from '../../../servicios/reportes/reportes.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-fotocopias',
  templateUrl: './fotocopias.component.html',
  styleUrls: ['./fotocopias.component.css']
})
export class ReporteFotocopiasComponent implements OnInit {
	/**
	*Almacena la primera fecha seleccionada 
	*
	*@property {any}
	**/
	desde

	/**
	*Almacena la segunda fecha seleccionada 
	*
	*@property {any}
	**/
	hasta

	/**
	*Almacena la copias exitosas obtenidas de la API
	*
	*@property {any}
	**/
	copias: any = []

	/**
	*Almacena la suma total de las copias dañadas
	*
	*@property {any}
	**/
	dato

	/**
	*Almacena el total de copias exitosas
	*
	*@property {any}
	**/
	totalCopiasExitosas: number = 0

	/**
	*Almacena el total de copias dañadas
	*
	*@property {any}
	**/
	totalCopiasDanadas: number = 0

	/**
	*Almacena el total de copias 
	*
	*@property {any}
	**/
	totalCopias: number = 0

	/**
	*Almacena el monto total
	*
	*@property {any}
	**/
	totalMonto: number = 0


	constructor(
	  	public reportesService: ReportesService,
	  	public activatedRoute: ActivatedRoute,
	  	public router: Router) 
	{ 
		this.desde = this.activatedRoute.snapshot.params.desde
		this.hasta = this.activatedRoute.snapshot.params.hasta

		if(this.desde && this.hasta)
		{
			this.reportesService.listarCopias(this.desde, this.hasta).subscribe(
			res => {
				this.copias = res
				this.reportesService.obtenerCopiasDanadas(this.desde, this.hasta).subscribe(
				(res:any) => {
					this.dato = res.cantidadCopias
					if(this.dato != null)
					{
						this.totalCopiasDanadas = parseInt(this.dato)
					}
					this.copias.filter(dato => {
						this.totalCopiasExitosas = this.totalCopiasExitosas + parseInt(dato.cantidadCopias)
						this.totalMonto =  this.totalMonto + parseInt(dato.montoCopias)
					})
					this.totalCopias = this.totalCopiasExitosas + this.totalCopiasDanadas
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

  ngOnInit() {
  }

}
