import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '../../../servicios/usuarios/usuarios.service';
import { TranscripcionesService } from '../../../servicios/transcripciones/transcripciones.service';
import { TipoTranscripcionesService } from '../../../servicios/tipo-transcripciones/tipo-transcripciones.service';
import { ArchivosService } from '../../../servicios/archivos/archivos.service';
import { horas } from '../../../_datos/horas';
import * as moment from 'moment';

@Component({
  selector: 'app-nueva-transcripcion',
  templateUrl: './nueva.component.html',
  styleUrls: ['./nueva.component.css']
})
export class NuevaTranscripcionComponent implements OnInit {
	/**
	* Evento que actualiza los montos de la venta
	* 
	* @property {EventEmitter<boolean>}
	*/
	@Output() actualizarMontos = new EventEmitter<boolean>();

	/**
	* Accede al elemento modal
	*
	* @property {ViewChild}
	*/
	@ViewChild('cerrarModal') cerrarModal;

	/**
	* Formulario para almacenar la transcripcion
	*
	* @property {FormGroup}
	*/
	formTranscripcion: FormGroup;

	/**
	* Obtiene cada uno de los usuarios registrados de la API
	*
	* @property {any}
	*/
	usuarios

	/**
	* Obtiene cada uno de los tipos de transcripciones de la API
	*
	* @property {any}
	*/
	tipoTranscripciones

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
	* Almacena el archivo con la investigacion
	*
	* @property {File}
	*/
	archivo_inv

	/**
	* Almacena los datos del usuario conectado
	*
	* @property {any}
	*/
	usuario

	/**
	* Almacena la fecha actual
	*
	* @property {any}
	*/
	hoy: any

	/**
	* Almacena la horas obtenidas del arreglo
	*
	* @property {any}
	*/
	horas

  	constructor(
  		public fb: FormBuilder,
  		public usuariosService: UsuariosService,
  		public transcripcionesService: TranscripcionesService,
  		public tipoTranscripcionesService: TipoTranscripcionesService,
  		public archivosService: ArchivosService) 
  	{ 
  		this.listarUsuarios()
		this.listarTipoTranscripciones()

		var fecha = new Date()
        this.hoy = moment(fecha).format("YYYY-MM-DD")
        this.horas = horas

		this.formTranscripcion = this.fb.group({
			fechaEntrega: ['', Validators.required],
			horaEntrega: ['', Validators.required],
			subtotal: [null, Validators.required],
			encargado_id: ['', Validators.required],
			encargado_usuario: ['', Validators.required],
			categoria: ['', Validators.required],
			titulo: ['', Validators.required],
			activar: ['', Validators.required],
			archivo_inv: [''],
			archivo_id: [''],
			contenido: ['']
		})

		this.usuariosService.obtenerUsuario().subscribe(
		res => {
			this.usuario = res
			if(this.usuario.rol_id != 1)
			{
				this.formTranscripcion.patchValue({
					encargado_id: this.usuario.id,
					encargado_usuario: this.usuario.usuario
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

	obtenerEncargado(id)
    {
    	this.usuarios.find(dato => {
    		if(dato.id == id){
    			this.formTranscripcion.patchValue({
    				encargado_usuario: dato.usuario
    			})
    		}
    	})
    }

	activarArchivo()
    {
        this.adjuntar = true
        const archivo = this.formTranscripcion.get('archivo_inv')
        archivo.setValidators(Validators.required)
        const contenido = this.formTranscripcion.get('contenido')
        contenido.setValidators(null)
        const activar = this.formTranscripcion.get('activar')
        activar.setValidators(null)

        archivo.updateValueAndValidity()
        contenido.updateValueAndValidity()
        activar.updateValueAndValidity()
    }

    activarContenido()
    {

        this.adjuntar = false
        this.formTranscripcion.patchValue({ archivo_inv: '' })
        const archivo = this.formTranscripcion.get('archivo_inv')
        archivo.setValidators(null)
        const contenido = this.formTranscripcion.get('contenido')
        contenido.setValidators(Validators.required)
        const activar = this.formTranscripcion.get('activar')
        activar.setValidators(null)

        archivo.updateValueAndValidity()
        contenido.updateValueAndValidity()
        activar.updateValueAndValidity()
    }

    guardarArchivo(evento)
    {
    	this.archivo_inv = <File>evento.target.files[0];
    	this.formTranscripcion.patchValue({ archivo_inv: 'Si' })
    }

    almacenarTranscripcion()
	{
		this.submitted = true
		if(this.formTranscripcion.invalid){
			return
		}

		var fecha = this.f.fechaEntrega.value +" "+ this.f.horaEntrega.value
		var nuevaFecha = moment(fecha, "YYYY-MM-DD HH:mm:ss").format()
		this.formTranscripcion.patchValue({
			fechaEntrega: nuevaFecha
		})

		if(this.adjuntar == false){
			this.transcripcionesService.guardarTranscripcionArreglo(this.formTranscripcion.value)
			this.cerrarModal.nativeElement.click()
			this.actualizarMontos.emit(true)
			this.resetearCampos()
		}
		else
		{
			let archivo  = new FormData()
			archivo.append('archivo', this.archivo_inv, this.archivo_inv.name)

			this.archivosService.obtenerArchivosInv(archivo).subscribe(
				res => {
					this.formTranscripcion.patchValue({ archivo_id: res })
					this.transcripcionesService.guardarTranscripcionArreglo(this.formTranscripcion.value)
					this.cerrarModal.nativeElement.click()
					this.actualizarMontos.emit(true)
					this.resetearCampos()
				},
			err => {
				console.log(err)
			})
		}
	}

	resetearCampos()
	{
		this.submitted = false
		this.formTranscripcion.patchValue({
			fechaEntrega: '',
			subtotal: null,
			encargado_id: '',
			encargado_usuario: '',
			categoria: '',
			titulo: '',
			activar: '',
			archivo_inv: '',
			archivo_id: '',
			contenido: ''
		})
	}

}
