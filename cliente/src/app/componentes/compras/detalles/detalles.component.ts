import { Component, OnInit } from '@angular/core';
import { ComprasService } from '../../../servicios/compras/compras.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesCompraComponent implements OnInit {
	/**
	*Almacena los datos de la compra
	*
	*@property {any}
	**/
	compra

	constructor(
		public comprasService: ComprasService,
		public activatedRoute: ActivatedRoute) {

		const params = this.activatedRoute.snapshot.params 
		this.obtenerDetallesCompra(params.id)
	}

  	ngOnInit() {
  	}

  	obtenerDetallesCompra(id)
  	{
  		this.comprasService.obtenerCompra(id).subscribe(
  		res => {
  			this.compra = res
  		},
  		err => {
  			console.log(err)
  		})
  	}

}
