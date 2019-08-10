import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../../../servicios/productos/productos.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-productos-detalles',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class DetallesProductosVentaComponent implements OnInit {
	/**
    *Almacena los productos asociados a la venta
    *
    *@property {number}
    **/
    productos

    /**
    *Pagina inicial de la paginacion
    *
    *@property {number}
    **/
    p: number = 1


	constructor(
		public productosService: ProductosService,
		public activatedRoute: ActivatedRoute) { 

		const params = this.activatedRoute.snapshot.params
		this.obtenerProductosVenta(params.id)
	}

	ngOnInit() {
  	}

  	obtenerProductosVenta(id)
  	{
  		this.productosService.obtenerProductosDetallesVenta(id).subscribe(
  		res => {
  			this.productos = res
  			if(this.productos.length > 0)
  			{
  				this.productos.filter(dato => {
  					Object.defineProperty(dato, 'precioUnitario', { value: dato.subtotal / dato.cantidad })
  				})
  			}
  		},
  		err => {
  			console.log(err)
  		})
  	}

}
