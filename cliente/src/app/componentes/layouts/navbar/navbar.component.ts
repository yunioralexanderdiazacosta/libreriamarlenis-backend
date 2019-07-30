import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from '../../../servicios/autenticacion/autenticacion.service';
import { UsuariosService } from '../../../servicios/usuarios/usuarios.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
	/**
	*Obtiene los datos del usuario conectado
	*
	*@property {any}
	**/
	usuario

	constructor(
  		public auth: AutenticacionService,
  		public usuariosService: UsuariosService) { 
		this.obtenerUsuario()
	}

  	ngOnInit() {
  	}

  	obtenerUsuario()
  	{
  		this.usuariosService.obtenerUsuario().subscribe(
  		res => {
  			this.usuario = res
  		},
  		err => {
  			console.log(err)
  		})
  	}

}
