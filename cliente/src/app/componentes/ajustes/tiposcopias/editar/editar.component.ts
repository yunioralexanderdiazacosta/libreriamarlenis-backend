import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoCopiasService } from '../../../../servicios/tipo-copias/tipo-copias.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarTipoCopiaComponent implements OnInit {
	/**
	*Formulario que almacena los datos del tipo de copia
	*
	*@property {FormGroup}
	**/
	formCopia: FormGroup

	/**
	*Almacena los datos del tipo de copia
	*
	*@property {any}
	**/
	tipo

	/**
	*Almacena los datos del tipo de copia
	*
	*@property {boolean}
	**/
	submitted: boolean = false

	/**
	*Identificador del tipo de copia
	*
	*@property {any}
	**/
	id

	constructor(
		public tiposCopiasService: TipoCopiasService,
		public activatedRoute: ActivatedRoute,
		public toastr: ToastrService,
		public router: Router,
		public fb: FormBuilder) { 

		const params = this.activatedRoute.snapshot.params
		this.id = params.id
		this.tiposCopiasService.obtenerTipoCopia(params.id).subscribe(
		res => {
			this.tipo = res
			this.formCopia = this.fb.group({
				descripcion: [this.tipo.descripcion, Validators.required],
				precio: [this.tipo.precio, Validators.required]
			})
		},
		err => {
			console.log(err)
		})
	}

  	ngOnInit() {
  	}

  	get f(){ return this.formCopia.controls }

  	actualizarTipo()
  	{
  		this.submitted = true
  		if(this.formCopia.invalid){ return }

  		this.tiposCopiasService.actualizarTipoCopia(this.id, this.formCopia.value).subscribe(
  		res => {
  			this.toastr.success('Datos actualizados correctamente.', 'Exito')
  			this.router.navigate(['/tiposdecopias'])
  			event.preventDefault()
  			event.stopPropagation()
  		},
  		err => {
  			console.log(err)
  		})
  	}
}
