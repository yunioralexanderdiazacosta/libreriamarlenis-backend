import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportesService } from '../../../servicios/reportes/reportes.service';
import * as moment from 'moment';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ReporteComprasComponent implements OnInit {
	/**
	*Almcanena cada una de las compras encontradas en la API
	*
	*@property {any}
	**/
	compras: any = [];

	/**
	*Almacena la fecha de inicio
	*
	*@property {Date}
	**/
	desde: Date

	/**
	*Almacena la fecha de inicio
	*
	*@property {Date}
	**/
	hasta: Date

	/**
	*Almcanena monto total gastado durante el rango seleccionado
	*
	*@property {number}
	**/
	total: number = 0

	/**
	*Almacena el total de productos adquiridos durante el rango seleccionado
	*
	*@property {number}
	**/
	productos: number = 0

	constructor(
		public activatedRoute: ActivatedRoute,
		public reportesService: ReportesService,
		public router: Router) { 
		this.desde = this.activatedRoute.snapshot.params.desde
		this.hasta = this.activatedRoute.snapshot.params.hasta

		if(this.desde && this.hasta)
		{
			this.reportesService.listarCompras(this.desde, this.hasta).subscribe(
			res => {
				this.compras = res
				this.compras.filter(dato => {
					this.total = this.total + dato.total
					this.productos = this.productos + dato.pedidos_compras.length
					return dato.estatus == 1
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

}
