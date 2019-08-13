import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IvaService } from '../../servicios/iva/iva.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-iva',
  templateUrl: './iva.component.html',
  styleUrls: ['./iva.component.css']
})
export class IvaComponent implements OnInit {
	/**
	*Alamacena el iva
	*
	*@property {FormGroup}
	**/
	formulario: FormGroup

	/**
	*Alamacena el iva obtenido de la API
	*
	*@property {any}
	**/
	impuesto

	/**
	*Verifica si el formulario ha sido enviado o no
	*
	*@property {boolean}
	**/
	submitted: boolean = false

 	constructor(
 		public ivaService: IvaService,
 		public toastr: ToastrService,
 		public fb: FormBuilder,
 		public router: Router) 
 	{ 
 		this.ivaService.obtenerImpuesto().subscribe(
  		res => {
  			this.impuesto = res
  			this.formulario = this.fb.group({
  				valor: [this.impuesto.valor, Validators.required]
  			})
  		},
  		err => {
  			console.log(err)
  		})
 	}

  	ngOnInit() {

  	}

  	/**
	* Accede al campo de la vista
	*
	*@return {Object}
	**/
	get f() { return this.formulario.controls }

	/**
	* Actualiza el impuesto
	*
	*@return {void}
	**/
  	actualizarDato()
  	{
  		this.submitted = true
  		console.log(this.formulario.value)
  		this.ivaService.actualizarImpuesto(this.formulario.value).subscribe(
  		res => {
  			this.toastr.success('Datos actualizados correctamente.', 'Exito')
  			this.router.navigate(['/inicio'])
  			event.preventDefault()
  			event.stopPropagation()
  		}, 
  		err => {
  			console.log(err)
  		})
  	}
}
