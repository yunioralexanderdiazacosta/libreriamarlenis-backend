import { Component, OnInit } from '@angular/core';
import { TipoTranscripcionesService } from '../../../servicios/tipo-transcripciones/tipo-transcripciones.service';
import { TranscripcionesService } from '../../../servicios/transcripciones/transcripciones.service';
import { UsuariosService } from '../../../servicios/usuarios/usuarios.service';
import { ArchivosService } from '../../../servicios/archivos/archivos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { horas } from '../../../_datos/horas';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

@Component({
  selector: 'app-editar-transcripcion',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarTrancripcionComponent implements OnInit {
	/**
	*Almacena los datos del formulario
	*
	*@property {FormGroup}
	**/
	formTranscripcion: FormGroup

	/**
	*Almacena los datos de la transcripcion
	*
	*@property {any}
	**/
	transcripcion

	/**
	* Verifica si el formulario ha sido enviado o no
	*
	* @property {boolean}
	*/
	submitted: boolean = false

	/**
	* Campo para adjuntar los datos del formulario
	*
	* @property {boolean}
	*/
	adjuntar: boolean


	/**
	* Obtiene cada uno de los tipos de transcripciones de la API
	*
	* @property {any}
	*/
	tipoTranscripciones


	/**
	* Almacena la horas obtenidas del arreglo
	*
	* @property {any}
	*/
	horas

	/**
	* Almacena los usuarios encontrados en la API
	*
	* @property {any}
	*/
	usuarios

	/**
	* Almacena el archivo de la Investigación
	*
	* @property {any}
	*/
	archivo_inv

	/**
	* Almacena los datos del archivo de la investigación
	*
	* @property {any}
	*/
	archivo

	/**
	* Identitificador de la transcripcion
	*
	* @property {any}
	*/
	id

	constructor(
		public transcripcionesService: TranscripcionesService,
		public usuariosService: UsuariosService,
		public fb: FormBuilder,
		public tipoTranscripcionesService: TipoTranscripcionesService,
		public archivosService: ArchivosService,
		public activatedRoute: ActivatedRoute,
		public toastr: ToastrService,
		public router: Router) 
	{ 

		this.listarUsuarios()
		this.listarTipoTranscripciones()
		const params = this.activatedRoute.snapshot.params
		this.id = params.id
		this.horas = horas
		this.transcripcionesService.obtenerTranscripcion(params.id).subscribe(
  		res => {
  			this.transcripcion = res
  			var fechaEntrega = moment(this.transcripcion.fecha_entrega).format("YYYY-MM-DD")
  			var hora = moment(this.transcripcion.fecha_entrega).format("HH:mm:ss")
  			var horaEntrega = hora.toString()
  			
  			this.formTranscripcion = this.fb.group({
				fechaEntrega: [fechaEntrega, Validators.required],
				horaEntrega: [horaEntrega, Validators.required],
				subtotal: [this.transcripcion.monto, Validators.required],
				encargado_id: [this.transcripcion.usuarioId, Validators.required],
				categoria: [this.transcripcion.tiposTranscripcioneId, Validators.required],
				titulo: [this.transcripcion.titulo, Validators.required],
				archivo_inv: [this.transcripcion.archivo_inv],
				fecha_entrega: [null],
				adjunto: [''],
				contenido: [this.transcripcion.contenido]
  			})

  			if(this.transcripcion.contenido != '')
  			{
  				const contenido = this.formTranscripcion.get('contenido')
       	 		contenido.setValidators(Validators.required)
       	 		contenido.updateValueAndValidity()
  			}
  			else
  			{
  				const contenido = this.formTranscripcion.get('contenido')
       	 		contenido.setValidators(null)
       	 		contenido.updateValueAndValidity()
       	 		this.archivosService.obtenerArchivoInvestigacion(this.transcripcion.archivo_inv).subscribe(
	  			res => {
	  				this.archivo = res
	  			}, 
	  			err => {
	  				console.log(err)
	  			})
  			}
  		},
  		err =>{
  			console.log(err)
  		})
	}
	
  	ngOnInit() {}

  	/**
  	*Obtener cada uno de los usuarios
  	*
  	*@return {void}
  	**/
  	listarUsuarios()
	{
		this.usuariosService.obtenerUsuarios().subscribe(
		res => {
			this.usuarios = res
		},
		err => {
			console.log(err)
		})
	}


	/**
  	*Obtener cada uno de los tipos de transcripciones
  	*
  	*@return {void}
  	**/
	listarTipoTranscripciones()
	{
		this.tipoTranscripcionesService.obtenerTipoTranscripciones().subscribe(
		res => {
			this.tipoTranscripciones = res
		},
		err => {
			console.log(err)
		})
	}

	/**
  	*Accede a los elementos del formulario
  	*
  	*@return {Object}
  	**/
  	get f(){ return this.formTranscripcion.controls }

  	/**
  	*Guarda los datos del archivo adjuntado (opcional)
  	*
  	*@return {void}
  	**/
    guardarArchivo(evento)
    {
    	this.archivo_inv = <File>evento.target.files[0]
    	this.formTranscripcion.patchValue({ adjunto: 'Si' })
    }

  	/**
  	* Guarda los cambios realizados en la transcripcion
  	*
  	*@return {void}
  	**/
  	actualizarTranscripcion()
  	{
  		this.submitted = true
  		if(this.formTranscripcion.invalid){ return }

  		var fecha = this.f.fechaEntrega.value +" "+ this.f.horaEntrega.value
		var nuevaFecha = moment(fecha, "YYYY-MM-DD HH:mm:ss").format()
		this.formTranscripcion.patchValue({
			fecha_entrega: nuevaFecha
		})

		if(this.formTranscripcion.value.adjunto == 'Si')
		{
  			let archivo  = new FormData()
			archivo.append('archivo', this.archivo_inv, this.archivo_inv.name)
			this.archivosService.obtenerArchivosInv(archivo).subscribe(
			res => {
				this.formTranscripcion.patchValue({ archivo_inv: res })
				let datosEnviar = {
					titulo: this.formTranscripcion.value.titulo,
					contenido: this.formTranscripcion.value.contenido,
					fecha_entrega: this.formTranscripcion.value.fecha_entrega,
					monto: this.formTranscripcion.value.subtotal,
					archivo_inv: this.formTranscripcion.value.archivo_inv,
					tiposTranscripcioneId: this.formTranscripcion.value.categoria,
					usuarioId: this.formTranscripcion.value.encargado_id
				}
				this.enviarTranscripcion(this.id, datosEnviar)
			},
			err => {
				console.log(err)
			})
		}
		else
		{
			let datosEnviar = {
				titulo: this.formTranscripcion.value.titulo,
				contenido: this.formTranscripcion.value.contenido,
				fecha_entrega: this.formTranscripcion.value.fecha_entrega,
				monto: this.formTranscripcion.value.subtotal,
				archivo_inv: this.formTranscripcion.value.archivo_inv,
				tiposTranscripcioneId: this.formTranscripcion.value.categoria,
				usuarioId: this.formTranscripcion.value.encargado_id
			}
			this.enviarTranscripcion(this.id, datosEnviar)
		}		
  	}

  	enviarTranscripcion(id, transcripcion)
  	{
  		this.transcripcionesService.actualizarTranscripcion(this.id, transcripcion).subscribe(
		res => {
			this.toastr.success('Datos actualizados correctamente.', 'Exito')
			this.router.navigate(['/transcripciones'])
			event.preventDefault()
  			event.stopPropagation()
		},
		err => {
			console.log(err)
		})	
  	}
}