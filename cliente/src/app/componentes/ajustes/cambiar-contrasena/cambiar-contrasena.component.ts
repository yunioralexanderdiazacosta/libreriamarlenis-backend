import { Component, OnInit } from '@angular/core';
import {  FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Coincidencia } from '../../../_utilidades/coincidencias.validator';
import { UsuariosService } from '../../../servicios/usuarios/usuarios.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.component.html',
  styleUrls: ['./cambiar-contrasena.component.css']
})
export class CambiarContrasenaComponent implements OnInit {
	/**
	*Almacena los datos
	*
	*@property {FormGroup}
	**/
	formUsuario: FormGroup

	/**
	*Activa o desactiva el envio del formulario ha sido enviado o no
	*
	*@property {boolean}
	**/
	submitted: boolean = false

	/**
	*Mensaje de error
	*
	*@property {string}
	**/
	input_required: string = 'Este campo es obligatorio'

	error: string = ''

	constructor(
		public fb: FormBuilder,
		public usuariosService: UsuariosService,
		public toastr: ToastrService) {
		this.formUsuario = this.fb.group({
			contrasena_actual: ['', Validators.required],
			nueva_contrasena: ['', [Validators.required, Validators.minLength(4)]],
			conf_contrasena: ['', Validators.required]
		},
		{
			validator: [Coincidencia('nueva_contrasena', 'conf_contrasena')]
		})
	}

  	ngOnInit() {
  	}

  	get f(){ return this.formUsuario.controls }

  	actualizarContrasena()
  	{
  		this.submitted = true
  		const dato = { 
  			claveActual: this.formUsuario.value.contrasena_actual,
  			clave: this.formUsuario.value.nueva_contrasena 
  		}
  		this.usuariosService.cambiarClaveUsuario(dato).subscribe(
  		res => {
  			this.toastr.success('Contraseña actualizada correctamente.', 'Exito')
  			this.resetearCampos()
  		},	
  		err => {
  			if(err.status == 403)
            {
                this.error = err.error
            }
            else
            {
                console.log(err);
            }
  		})
  	}

  	resetearCampos()
  	{
  		this.submitted = false
  		this.formUsuario.setValue({
  			contrasena_actual: '',
			nueva_contrasena: '',
			conf_contrasena: ''
  		})
  	}

}
