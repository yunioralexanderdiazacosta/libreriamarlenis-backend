import { Component, OnInit, Output, EventEmitter, ViewChild, ChangeDetectionStrategy  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoTranscripcionesService } from '../../../../servicios/tipo-transcripciones/tipo-transcripciones.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nuevo-tipo-tarea',
  templateUrl: './nueva.component.html',
  styleUrls: ['./nueva.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TipoTareasNuevaComponent implements OnInit {
	/**
  	* Evento que actualiza las categorias de productos
  	* 
  	* @property {EventEmitter<boolean>}
  	*/
  	@Output() actualizarCategorias = new EventEmitter<boolean>()

  	/**
  	* Accede al elemento modal
  	*
  	* @property {ViewChild}
  	*/
  	@ViewChild('cerrarModal') cerrarModal

	/**
	* Formulario con los datos de la categoria
	*
	*@property {FormGroup}
	**/
	formCategoria: FormGroup

	/**
	* Activa o desactiva el envio de formulario
	*
	*@property {boolean}
	**/
	submitted: boolean = false

	constructor(
		public tipoTareasService: TipoTranscripcionesService,
		public activatedRoute: ActivatedRoute,
		public fb: FormBuilder,
		public router: Router) { 

		this.formCategoria = this.fb.group({
  				descripcion: ['', Validators.required],
  				estatus: [1]
  		})
	}

  	ngOnInit() {
  	}

  	get f(){ return this.formCategoria.controls }

  	guardarCategoria()
  	{
  		this.submitted = true
  		if(this.formCategoria.invalid){ return }

  		this.tipoTareasService.guardarTipoTarea(this.formCategoria.value).subscribe(
  		res => {
  			this.cerrarModal.nativeElement.click()
        	this.resetearCampos()
        	this.actualizarCategorias.emit(true)	
  		},
  		err => {
  			console.log(err)
  		})
  	}

  	resetearCampos()
  	{
  		this.submitted = false
  		this.formCategoria.setValue({
  			descripcion: '',
  			estatus: 1
  		})
  	}
}
