import { Component, OnInit } from '@angular/core';
import { ComprasService } from '../../../../servicios/compras/compras.service';
import { ProductosService } from '../../../../servicios/productos/productos.service';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment'; 

@Component({
  selector: 'app-lista-entradas',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaEntradasComponent implements OnInit {
	/**
	*Almacena los ingresos al inventario del producto seleccionado
	*
	*@property {any}
	**/
	ingresos


	/**
	*Almacena los datos del producto
	*
	*@property {any}
	**/
	producto

	/**
    *Pagina inicial de la paginacion
    *
    *@property {number}
    **/
    p: number = 1


	constructor(
		public comprasService: ComprasService,
		public productosService: ProductosService,
		public activatedRoute: ActivatedRoute) { 
		
		const params = this.activatedRoute.snapshot.params
		this.obtenerProducto(params.id)
		this.obtenerIngresosProducto(params.id)
	}

  	ngOnInit() {
  	}

  	obtenerProducto(id)
  	{
  		this.productosService.obtenerProducto(id).subscribe(
  		res => {
  			this.producto = res
  		},
  		err => {
  			console.log(err)
  		})
  	}

  	obtenerIngresosProducto(id)
  	{
  		this.comprasService.obtenerIngresosProducto(id).subscribe(
		res => {
			this.ingresos = res
			this.ingresos.filter(dato => {
				dato.created_at = moment(dato.created_at).format("DD-MM-YYYY hh:mm a")
			})
		},
		err => {
			console.log(err)
		})
  	}

}
