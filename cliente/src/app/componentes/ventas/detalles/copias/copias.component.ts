import { Component, OnInit } from '@angular/core';
import { CopiasService } from '../../../../servicios/copias/copias.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-copias-detalles',
  templateUrl: './copias.component.html',
  styleUrls: ['./copias.component.css']
})
export class DetallesCopiasVentaComponent implements OnInit {
	/**
	*Almacena las copias encontradas en la venta
	*
	*@property {any}
	**/
	copias

    /**
    *Pagina inicial de la paginacion
    *
    *@property {number}
    **/
    p: number = 1

	constructor(
		public copiasService: CopiasService,
		public activatedRoute: ActivatedRoute) { 

		const params = this.activatedRoute.snapshot.params
		this.obtenerCopiasVenta(params.id)
	}

  	ngOnInit() {
  	}

  	obtenerCopiasVenta(id)
  	{
  		this.copiasService.obtenerCopiasVenta(id).subscribe(
  		res => {
  			this.copias = res
  			this.copias.filter(dato => {
  				Object.defineProperty(dato, 'precioUnitario', { value: dato.subtotal / dato.cantidad })
  			})
  		},
  		err => {
  			console.log(err)
  		})
  	}

}
