import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranscripcionesService } from '../../../servicios/transcripciones/transcripciones.service';
import { TipoTranscripcionesService } from '../../../servicios/tipo-transcripciones/tipo-transcripciones.service';
import { filter, switchMap, debounceTime, catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-almacenamiento',
  templateUrl: './almacenamiento.component.html',
  styleUrls: ['./almacenamiento.component.css']
})
export class AlmacenamientoComponent implements OnInit {
    palabra = new FormControl()
    categoriaId = ''
    error: boolean = false;
    transcripciones: any =  []
    categorias: any = []

	constructor(
		public transcripcionesService: TranscripcionesService,
		public tipoTranscripcionesService: TipoTranscripcionesService) { 
		this.listarTipos()
  	}

  	ngOnInit() {
  		this.palabra.valueChanges.pipe(filter(value => value.length > 3),
  			debounceTime(1000),
  			switchMap(value => 
  				this.transcripcionesService.buscarTranscripcionItems(this.categoriaId, value).pipe(
  				catchError(err => {
                      this.transcripciones.length = 0
                      this.error = true
                      return EMPTY
                  }) )
  			)
  		).subscribe(
  		res => {
  			this.transcripciones = res
  		},
  		err => {
  			console.log(err)
  		})
  	}

  	listarTipos()
  	{
  		this.tipoTranscripcionesService.obtenerTipoTranscripciones().subscribe(
  		res=> {
  			this.categorias = res
  		},
  		err => {
  			console.log(err)
  		})
  	}
}
