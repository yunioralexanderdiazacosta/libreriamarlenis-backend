import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { TranscripcionesService } from '../../../../servicios/transcripciones/transcripciones.service';

@Component({
  selector: 'app-transcripciones-venta',
  templateUrl: './transcripciones.component.html',
  styleUrls: ['./transcripciones.component.css']
})
export class VentasTranscripcionesComponent implements OnInit {
	/**
	* Evento que actualiza los montos de la venta
	* 
	* @property {EventEmitter<boolean>}
	*/
	@Output() actualizarMontos = new EventEmitter<boolean>()
	cont = 0
	transcripciones
	constructor(public transcripcionesService: TranscripcionesService) { }

	ngOnInit() {
		this.listarTranscripciones()
  	}

  	listarTranscripciones()
  	{
  		this.transcripciones = this.transcripcionesService.obtenerTranscripcionesArreglo()
  	}

  	eliminarTranscripcion(indice)
  	{
  		if(confirm('¿Esta seguro de que desea eliminar la transcripción?'))
  		{
  			this.transcripcionesService.eliminarTranscripcionArreglo(indice)
  			this.actualizarMontos.emit(true)
  		}
  	}

}
