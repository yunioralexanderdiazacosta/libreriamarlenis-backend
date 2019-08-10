import { Component, OnInit } from '@angular/core';
import { TranscripcionesService } from '../../../../servicios/transcripciones/transcripciones.service'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tareas-detalles',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class DetallesTareasVentaComponent implements OnInit {
	/**
	*Almacena las tareas asociadas a la venta
	*
	*@property {any}
	**/
	tareas

	/**
    *Pagina inicial de la paginacion
    *
    *@property {number}
    **/
    p: number = 1

	constructor(
		public transcripcionesService: TranscripcionesService,
		public activatedRoute: ActivatedRoute) { 

		const params = this.activatedRoute.snapshot.params
		this.obtenerTranscripciones(params.id)
	}

  	ngOnInit() {
  	}

  	obtenerTranscripciones(id)
  	{
  		this.transcripcionesService.obtenerTranscripcionesVenta(id).subscribe(
  		res => {
  			this.tareas = res
  			console.log(res)
  		},
  		err => {
  			console.log(err)
  		})
  	}
}
