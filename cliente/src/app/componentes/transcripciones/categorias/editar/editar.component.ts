import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoTranscripcionesService } from '../../../../servicios/tipo-transcripciones/tipo-transcripciones.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class TipoTareasEditarComponent implements OnInit {
	/**
	* Formulario con los datos de la categoria
	*
	*@property {FormGroup}
	**/
	formCategoria: FormGroup

	/**
	* Almacena los datos de la categoria
	*
	*@property {any}
	**/
	categoria

	/**
	* Activa o desactiva el envio de formulario
	*
	*@property {boolean}
	**/
	submitted: boolean = false

	/**
	* Almacena el identificador de la categoria
	*
	*@property {boolean}
	**/
	id

	constructor(
		public tipoTareas: TipoTranscripcionesService,
		public activatedRoute: ActivatedRoute,
		public toastr: ToastrService,
		public fb: FormBuilder,
		public router: Router) { 
		const params = this.activatedRoute.snapshot.params
  		this.id = params.id
  		this.tipoTareas.obtenerTipoTarea(params.id).subscribe(
  		res => {
  			this.categoria = res
  			this.formCategoria = this.fb.group({
  				descripcion: [this.categoria.descripcion, Validators.required]
  			})
  		},
  		err => {
  			console.log(err)
  		})
  	}

  	get f(){ return this.formCategoria.controls }
	
  	ngOnInit() {
  	}

  	actualizarCategoria()
  	{
  		this.submitted = true
  		if(this.formCategoria.invalid){ return }

  		this.tipoTareas.actualizarTipoTarea(this.id, this.formCategoria.value).subscribe(
  		res => {
  			this.toastr.success('Datos actualizados correctamente.', 'Exito')
  			this.router.navigate(['/tipostareas'])
  			event.preventDefault()
  			event.stopPropagation()
  		},
  		err => {
  			console.log(err)
  		})
  	}
}
