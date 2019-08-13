import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuariosService } from '../../../servicios/usuarios/usuarios.service';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.css']
})
export class RecuperarContrasenaComponent implements OnInit {
	/**
	*Formulario con los datos del usuario
	*
	*@property {any}
	**/
	formulario: FormGroup

    /**
	*Datos del usuario encontrado
	*
	*@property {any}
	**/
	usuario

	/**
	*Verifica si se inserto el usuario o no
	*
	*@property {boolean}
	**/
	continuar: boolean = false

	/**
	*Verifica si el formulario esta enviado o no
	*
	*@property {boolean}
	**/
	submitted: boolean = false

	constructor(
		public fb: FormBuilder,
		public usuariosService: UsuariosService) { }

  	ngOnInit() {
  		this.formulario = this.fb.group({
  			usuario: ['', Validators.required],
  			pregunta_secreta: [''],
  			respuesta_secreta: ['', Validators.required]
  		})
  	}

  	obtenerUsuario(usuario)
  	{
  		this.usuariosService.obtenerUsuarioRecuperacion(usuario).subscribe(
  		res => {
  			this.usuario = res
  			this.formulario.patchValue({ pregunta_secreta: this.usuario.pregunta_secreta })
  			if(this.usuario.id)
  			{
  				this.continuar = true
  			}
  		},
  		err => {
  			console.log(err)
  		})
  	}

  	get f(){ return this.formulario.controls }

  	procesarPeticion()
  	{

  	}
}
