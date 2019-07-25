import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../../servicios/usuarios/usuarios.service';
import { TokenPayload } from '../../../../modelos/tokenPayload';

@Component({
  selector: 'app-lista-empleados',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaEmpleadosComponent implements OnInit {
	/**
	*
	*
	*@property {Array}
	**/
	usuarios: Array<TokenPayload> = [];

	constructor(private usuariosService: UsuariosService) { }

	ngOnInit() {
		this.obtenerUsuarios();
  	}

  	/**
	* Obtiene y guardar los usuarios obtenidos de la API
	*
	*@return {Array}
	**/
  	obtenerUsuarios()
  	{
  		this.usuariosService.obtenerUsuarios().subscribe(
  		(res: any) =>  {
  			this.usuarios = res;
  		},
  		err => {
  			console.log(err);
  		})
  	}
}
