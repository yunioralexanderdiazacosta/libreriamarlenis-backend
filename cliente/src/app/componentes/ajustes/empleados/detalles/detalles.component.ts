import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../../servicios/usuarios/usuarios.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesEmpleadoComponent implements OnInit {
	/**
	*Almacena los datos del usuario
	*
	*@property {any}
	**/
	usuario

	constructor(
		public usuariosService: UsuariosService,
		public activatedRoute: ActivatedRoute) { 

		const params = this.activatedRoute.snapshot.params
		this.obtenerUsuario(params.id)
	}

  	ngOnInit() {
  	}

  	obtenerUsuario(id)
  	{
  		this.usuariosService.obtenerUsuarioEstadistica(id).subscribe(
  		res => {
  			this.usuario = res
  		},
  		err => {
  			console.log(err)
  		})
  	}

}
