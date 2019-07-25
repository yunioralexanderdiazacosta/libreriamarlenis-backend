import { Component, OnInit } from '@angular/core';
import { TranscripcionesService } from '../../../servicios/transcripciones/transcripciones.service';
import * as moment from 'moment'; 

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaTranscripcionesComponent implements OnInit {
	transcripciones = []
	constructor(public transcripcionesService: TranscripcionesService) { }

  	ngOnInit() {
  		this.listarTranscripciones()
  	}

  	listarTranscripciones()
  	{
  		this.transcripcionesService.obtenerTranscripciones().subscribe(
  		(res: any) => {
  			this.transcripciones = res
  			this.transcripciones.filter(dato => {
  				return dato.created_at = moment().format(dato.created_at)
  			})
  		},
  		err => {
  			console.log(err)
  		})
  	}
}
