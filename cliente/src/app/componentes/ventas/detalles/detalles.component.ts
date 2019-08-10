import { Component, OnInit } from '@angular/core';
import { VentasService } from '../../../servicios/ventas/ventas.service';
import { ProductosService } from '../../../servicios/productos/productos.service';
import { CopiasService } from '../../../servicios/copias/copias.service';
import { TranscripcionesService } from '../../../servicios/transcripciones/transcripciones.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesVentaComponent implements OnInit {
	/**
	*Obtiene los datos de la venta
	*
	*@property {any}
	**/
	venta

    productos

    copias 

    tareas

	constructor(
		public ventasService: VentasService,
    public productosService: ProductosService,
    public copiasService: CopiasService,
    public transcripcionesService: TranscripcionesService,
		public activatedRoute: ActivatedRoute) { 
		
		const params = this.activatedRoute.snapshot.params
		this.obtenerVenta(params.id)
        this.obtenerDatos(params.id)
	}

 	ngOnInit() {
  	}

  	obtenerVenta(id)
  	{
  		this.ventasService.obtenerVenta(id).subscribe(
  		res => {
  			this.venta = res
  		},
  		err => {
  			console.log(err)
  		})
  	}

    obtenerDatos(id)
    {
        this.productosService.obtenerProductosDetallesVenta(id).subscribe(
        res => {
            this.productos = res
        },
        err => {
            console.log(err)
        })

        this.copiasService.obtenerCopiasVenta(id).subscribe(
        res => {
            this.copias = res
        },
        err => {
            console.log(err)
        })

        this.transcripcionesService.obtenerTranscripcionesVenta(id).subscribe(
        res => {
            this.tareas = res
        },
        err => {
            console.log(err)
        })
    }
}
