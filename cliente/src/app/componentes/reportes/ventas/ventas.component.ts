import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportesService } from '../../../servicios/reportes/reportes.service';
import * as moment from 'moment';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class ReporteVentasComponent implements OnInit {
	/**
	*Almacena cada una de las ventas encontradas en la API 
	*
	*@property {any}
	**/
	ventas: any = []

	/**
	*Almacena la fecha de inicio
	*
	*@property {Date}
	**/
	desde

	/**
	*Almacena la fecha de inicio
	*
	*@property {Date}
	**/
	hasta

	/**
	*Almcanena el total de ingresos obtenidos durante el rango seleccionado
	*
	*@property {number}
	**/
	total_monto: number = 0

	/**
	*Almacena el total de ventas efectuadas el rango seleccionado
	*
	*@property {number}
	**/
	total_ventas: number = 0

	constructor(
		public reportesService: ReportesService,
		public activatedRoute: ActivatedRoute,
		public router: Router) { 
		this.desde = this.activatedRoute.snapshot.params.desde
		this.hasta = this.activatedRoute.snapshot.params.hasta
		if(this.desde && this.hasta)
		{
			this.reportesService.listarVentas(this.desde, this.hasta).subscribe(
  			res => {
  				this.ventas = res
  				this.ventas.filter(dato => {
  					this.total_monto = this.total_monto + parseInt(dato.montoTotal)
  					this.total_ventas = this.total_ventas + dato.totalVentas
  				})
  			},
  			err => {
  				console.log(err)
  			})
		}
		else
		{
			this.router.navigateByUrl('reportes')
		}
		
	}

  	ngOnInit() {
  	}

  	listarVentas(desde, hasta)
  	{
  		
  	}

}
