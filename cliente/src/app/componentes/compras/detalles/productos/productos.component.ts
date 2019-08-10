import { Component, OnInit } from '@angular/core';
import { ComprasService } from '../../../../servicios/compras/compras.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-productos-compra-detalles',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class DetallesProductosCompraComponent implements OnInit {
	/**
	*Almacena los pedidos efectuados al proveedor
	*
	*@property {any}
	**/
	pedidos

	/**
    *Pagina inicial de la paginacion
    *
    *@property {number}
    **/
    p: number = 1

	constructor(
		public comprasService: ComprasService,
		public activatedRoute: ActivatedRoute) { 

		const params = this.activatedRoute.snapshot.params
		this.obtenerDetalles(params.id)
	}

  	ngOnInit() {
  	}

  	obtenerDetalles(id)
  	{
  		this.comprasService.obtenerDetallesCompra(id).subscribe(
  		res => {
  			this.pedidos = res
  		},
  		err => {
  			console.log(err)
  		})
  	}
}
