import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '../../../../servicios/usuarios/usuarios.service';
import { Coincidencia } from '../../../../_utilidades/coincidencias.validator';

@Component({
	selector: 'app-nuevo-empleado',
	templateUrl: './nuevo.component.html',
	styleUrls: ['./nuevo.component.css']
})
export class NuevoEmpleadoComponent implements OnInit {
	/**
	* Evento que actualiza la lista de usuarios
	* 
	* @property {EventEmitter<boolean>}
	*/
	@Output() actualizarUsuarios = new EventEmitter<boolean>();

	/**
	* Accede al elemento modal
	*
	* @property {ViewChild}
	*/
	@ViewChild('cerrarModal') cerrarModal

	/**
	*Almacena los datos del formulario
	*
	*@property {FormGroup}
	**/
	formUsuario: FormGroup

	/**
	*Mensaje de error
	*
	*@property {string}
	**/
	input_required: string = "Este campo es obligatorio"

	/**
	* Verifica si el formulario ha sido enviado o no
	*
	*@property {boolean}
	**/
	submitted: boolean = false

	constructor(
		private usuariosService: UsuariosService,
		private fb: FormBuilder) { }

		ngOnInit() {
			this.formUsuario = this.fb.group({
				nacionalidad: ['V', Validators.required],
				nCedula: ['', [ Validators.required, Validators.pattern('[0-9]+')]],
				nombres: ['', Validators.required],
				apellidos: ['', Validators.required],
				correo: ['', [Validators.required, Validators.email]],
				direccion: ['', Validators.required],
				telefono: ['', Validators.required],
				usuario: ['', [ Validators.required, Validators.minLength(8) ]],
				clave: ['', [ Validators.required, Validators.minLength(4) ]],
				conf_clave: ['', Validators.required],
				pregunta_secreta: ['', [Validators.required, Validators.maxLength(100)]],
				respuesta_secreta: ['', [Validators.required, Validators.maxLength(50)]],
				estatus: [1],
				rol_id: [2]
			},
			{
				validator: [Coincidencia('clave', 'conf_clave')]
			})
		}

	/**
	* Accede a los campos de la vista
	*
	*@return {Object}
	**/
		get f() { return  this.formUsuario.controls }

	/**
	* Envia los datos almacenados a la API
	*
	*@return {void}
	**/
	guardarUsuario()
	{
		this.submitted = true
		if(this.formUsuario.invalid){ return }
		let datosEnviar = {
			cedula: this.formUsuario.value.nacionalidad+'-'+this.formUsuario.value.nCedula,
			nombres: this.formUsuario.value.nombres,
			apellidos: this.formUsuario.value.apellidos,
			correo: this.formUsuario.value.correo,
			direccion: this.formUsuario.value.direccion,
			telefono: this.formUsuario.value.telefono,
			usuario: this.formUsuario.value.usuario,
			clave: this.formUsuario.value.clave,
			pregunta_secreta: this.formUsuario.value.pregunta_secreta,
			respuesta_secreta: this.formUsuario.value.respuesta_secreta,
			estatus: this.formUsuario.value.estatus,
			rol_id: this.formUsuario.value.rol_id
		}
		this.usuariosService.guardarUsuario(datosEnviar).subscribe(
			res => {
				this.cerrarModal.nativeElement.click();
					this.resetearCampos();
					this.actualizarUsuarios.emit(true);
			},
			err => {
				console.log(err);
			}
		)
	}

	/** Resetear campos del formulario
	*
	* @return {void}
	*/
	resetearCampos(){
		this.submitted = false
		this.formUsuario.setValue({
			nacionalidad: '',
			nCedula: '',
			nombres: '',
			apellidos: '',
			correo: '',
			direccion: '',
			telefono: '',
			usuario: '',
			clave: '',
			conf_clave: '',
			pregunta_secreta: '',
			respuesta_secreta: '',
			estatus: [1],
			rol_id: [2]
		})
	}
}
