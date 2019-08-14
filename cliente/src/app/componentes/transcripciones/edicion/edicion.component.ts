import { Component, OnInit } from '@angular/core';
import { TranscripcionesService } from '../../../servicios/transcripciones/transcripciones.service';
import { ArchivosService } from '../../../servicios/archivos/archivos.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edicion-transcripcion',
  templateUrl: './edicion.component.html',
  styleUrls: ['./edicion.component.css']
})
export class EdicionTranscripcionComponent implements OnInit {
	/**
	*Formulario que almacena los cambios realizados
	*
	*@property {FormGroup}
	**/
	formTranscripcion: FormGroup

	/**
	*Almacena los datos de la transcripcion obtenido de la API
	*
	*@property {any}
	**/
	transcripcion: any

	/**
	*Activa o desactiva el formulario para adjuntar el archivo
	*
	*@property {boolean}
	**/
	est_tarea: boolean

	/**
	* Almacena el archivo de la tarea
	*
	*@property {boolean}
	**/
	archivo_tarea

	/**
	* Activa o desactiva el envio del formulario
	*
	*@property {boolean}
	**/
	submitted: boolean = false

	/**
	* Almacena los datos a ser enviados a la API
	*
	*@property {any}
	**/
	datosEnviar

	/**
	* Almacena el identificador de la transcripcion
	*
	*@property {number}
	**/
	id: number

	/**
	* Obtiene los datos del archivo de la investigación (solo si no hay contenido)
	*
	*@property {any}
	**/
	datosArchivo

	constructor(
		public fb: FormBuilder,
		public transcripcionesService: TranscripcionesService,
		public archivosService: ArchivosService,
		public activatedRoute: ActivatedRoute,
		public toastr: ToastrService,
        public router: Router) { 
		
  		this.formTranscripcion = this.fb.group({
			estatus_tarea: [''],
			archivo_tarea: [''],
			estatus_entrega: ['']
		})		

		const params = this.activatedRoute.snapshot.params
		this.id = params.id
  		this.transcripcionesService.obtenerTranscripcionPendiente(params.id).subscribe(
  		(res:any) => {
  			this.transcripcion = res
  			if(this.transcripcion)
  			{
	  			(this.transcripcion.estatus_tarea == 0)
	  			?	this.est_tarea = false
	  			: 	this.est_tarea = true
	  			this.formTranscripcion.patchValue({
						estatus_tarea: this.transcripcion.estatus_tarea,
						estatus_entrega: this.transcripcion.estatus_entrega
					})
  			}

  			if(this.transcripcion.contenido == '')
  			{
  				const id_archivo = parseInt(this.transcripcion.archivo_inv)
  				this.archivosService.obtenerArchivoInvestigacion(id_archivo).subscribe(
  				res => {
  					this.datosArchivo = res
  				},
  				err => {
  					console.log(err)
  				})
  			}
  		},
  		err => {
  			console.log(err)
  		})	
		
	}

  	ngOnInit() {
  	}

  	get f(){ return this.formTranscripcion.controls }

  	actualizarEstatusTrue()
  	{
  		this.est_tarea = true
  		const archivo_tarea = this.formTranscripcion.get('archivo_tarea')
        archivo_tarea.setValidators(Validators.required)
        archivo_tarea.updateValueAndValidity()
  	}

  	actualizarEstatusFalse()
  	{
  		this.est_tarea = false
  		const archivo_tarea = this.formTranscripcion.get('archivo_tarea')
        archivo_tarea.setValidators(null)
        archivo_tarea.updateValueAndValidity()
  	}

  	guardarArchivo(evento)
  	{
    	this.archivo_tarea = <File>evento.target.files[0];
    	this.formTranscripcion.patchValue({ archivo_tarea: 'Si' })
  	}

  	guardarCambiosTranscripcion(evento)
  	{
  		if(this.formTranscripcion.invalid){ return }

  		this.datosEnviar = new FormData()
  		if(this.est_tarea == false)
  		{
  			this.datosEnviar.append('estatus_tarea', this.formTranscripcion.value.estatus_tarea)
  			this.datosEnviar.append('archivo_tarea', '')	
  			this.datosEnviar.append('estatus_entrega', this.formTranscripcion.value.estatus_entrega)
  		}
  		else
	  	{
	  		this.datosEnviar.append('estatus_tarea', this.formTranscripcion.value.estatus_tarea)
	  		if(this.transcripcion.archivo_tarea == '')
	  		{ 
	  		 	this.datosEnviar.append('archivo_tarea', this.archivo_tarea, this.archivo_tarea.name) 
	  		}
	  		else 
	  		{ 
	  			this.datosEnviar.append('archivo_tarea', '') 
	  		}
	  		this.datosEnviar.append('estatus_entrega', this.formTranscripcion.value.estatus_entrega) 
  		}

  		this.transcripcionesService.actualizarTranscripcionPendiente(this.id, this.datosEnviar).subscribe(
  		res => {
  			this.toastr.success('Datos actualizados correctamente.', 'Exito')
            this.router.navigate(['/transcripciones'])
            evento.preventDefault()
  			evento.stopPropagation()
  		},
  		err => {
  			console.log(err)
  		})
  	}
}
