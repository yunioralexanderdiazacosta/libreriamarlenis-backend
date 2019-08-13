import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '../../../../servicios/usuarios/usuarios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarEmpleadoComponent implements OnInit {
	/**
	* Almacena los datos del usuario
	*
	*@property {any}
	**/
	usuario
	/**
	* Almacena los datos del formulario
	*
	*@property {FormGroup}
	**/
	formUsuario: FormGroup

	/**
	* Mensaje de error
	*
	*@property {string}
	**/
	input_required: string = "Este campo es obligatorio"

	/**
	* Verifica si el formulario ha sido enviado
	*
	*@property {boolean}
	**/
	submitted: boolean = false

	/**
	* Almacena el identificador del usuario
	*
	*@property {any}
	**/
	id

	constructor(
		public activatedRoute: ActivatedRoute,
		public usuariosService: UsuariosService,
		public toastr: ToastrService,
		public fb: FormBuilder,
		public router: Router) { 

		const params = this.activatedRoute.snapshot.params
		this.id = params.id
		this.usuariosService.obtenerUsuarioEstadistica(params.id).subscribe(
  		res => {
  			this.usuario = res

  			var nacionalidad = this.usuario.cedula.charAt(0)
		    var nCedula = this.usuario.cedula.substr(2)

  			this.formUsuario = this.fb.group({
				nacionalidad: [nacionalidad, Validators.required],
				nCedula: [nCedula, [ Validators.required, Validators.pattern('[0-9]+')]],
				nombres: [this.usuario.nombres, Validators.required],
				apellidos: [this.usuario.apellidos, Validators.required],
				correo: [this.usuario.correo, [Validators.required, Validators.email]],
				direccion: [this.usuario.direccion, Validators.required],
				telefono: [this.usuario.telefono, Validators.required],
				usuario: [this.usuario.usuario, [ Validators.required, Validators.minLength(8) ]],
				pregunta_secreta: [this.usuario.pregunta_secreta, [Validators.required, Validators.maxLength(100)]],
				respuesta_secreta: [this.usuario.respuesta_secreta, [Validators.required, Validators.maxLength(50)]]
			})
  		},
  		err => {
  			console.log(err)
  		})

	}

  	ngOnInit() {
  	}

  	/**
	* Accede a los campos de la vista
	*
	*@return {Object}
	**/
	get f() { return  this.formUsuario.controls }

	/**
	* Actualiza los datos del usuario
	*
	*@return {void}
	**/
  	actualizarUsuario()
  	{
  		this.submitted = true
  		if(this.formUsuario.invalid){ return  }	

  		let datosEnviar = {
			cedula: this.formUsuario.value.nacionalidad+'-'+this.formUsuario.value.nCedula,
			nombres: this.formUsuario.value.nombres,
			apellidos: this.formUsuario.value.apellidos,
			correo: this.formUsuario.value.correo,
			direccion: this.formUsuario.value.direccion,
			telefono: this.formUsuario.value.telefono,
			usuario: this.formUsuario.value.usuario,
			pregunta_secreta: this.formUsuario.value.pregunta_secreta,
			respuesta_secreta: this.formUsuario.value.respuesta_secreta
		}

		this.usuariosService.actualizarUsuario(this.id, datosEnviar).subscribe(
		res => {
			this.toastr.success('Datos actualizados correctamente.', 'Exito')
  			this.router.navigate(['/empleados'])
		},
		err => {
			console.log(err)
		})
  	}
}
