import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuariosService } from '../../../servicios/usuarios/usuarios.service';
import * as moment from 'moment'; 

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

    /**
    *Verifica si la contraseña ha sido generada o no
    *
    *@property {boolean}
    **/
    noGenerada: boolean = true

    /**
    *Almacena la nueva clave generada
    *
    *@property {boolean}
    **/
    nuevaClave: any

    /**
    *Almacena el mensaje de error (en caso de presentarse)
    *
    *@property {boolean}
    **/
    errorUsuario = ''

    /**
    *Verifica si la respuesta enviada es correcta o no
    *
    *@property {boolean}
    **/
    errorRespuesta: boolean = false


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
                this.errorUsuario = ''
  			}
  		},
  		err => {
  			if(err.status == 403)
            {
                this.errorUsuario = err.error
            }
            else
            {
                console.log(err)
            }
  		})
  	}

  	get f(){ return this.formulario.controls }

  	procesarPeticion()
  	{
       if(this.usuario.respuesta_secreta == this.f.respuesta_secreta.value)
       {
           
           var fecha = new Date()
           this.nuevaClave = moment(fecha).format("ssmmddHH")

           const dato = { clave: this.nuevaClave }
           this.usuariosService.recuperarClave(this.usuario.id, dato).subscribe(res => {
               this.noGenerada = false
           }, 
           err => {
               console.log(err)
           })
       }
       else
       {
           this.errorRespuesta = true
       }
  	}
}
