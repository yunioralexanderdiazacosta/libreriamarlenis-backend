import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../../servicios/usuarios/usuarios.service';
import { TokenPayload } from '../../../../modelos/tokenPayload';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lista-empleados',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaEmpleadosComponent implements OnInit {
	/**
	* Almacena los usuarios encontrados en la API
	*
	*@property {Array}
	**/
	usuarios: Array<TokenPayload> = []

    /**
    * Almacena los datos del usuario conectado
    *
    *@property {Array}
    **/
    usuario

	constructor(
        public usuariosService: UsuariosService,
        public toastr: ToastrService) 
    {
        this.obtenerUsuarios()
    }

	ngOnInit() {}

  	/**
	* Obtiene y guardar los usuarios obtenidos de la API
	*
	*@return {Array}
	**/
  	obtenerUsuarios()
  	{
  		this.usuariosService.obtenerUsuarios().subscribe(
  		(res: any) =>  {
  			this.usuarios = res
  		},
  		err => {
  			console.log(err)
  		})
  	}

    desactivar(id)
    {    
        if(confirm('¿Esta seguro de que desea dar de baja al usuario?'))
        {    
           const dato = { estatus: 0 }
           this.usuariosService.desactivarUsuario(id, dato).subscribe(
           res => {
                this.obtenerUsuarios()
                this.toastr.success('Usuario desactivado correctamente.', 'Exito')
           }, 
           err => {
               console.log(err)
           })
        }
    }

    activar(id)
    {
        const dato = { estatus: 1 }
        this.usuariosService.reactivarUsuario(id, dato).subscribe(
        res => {
            this.toastr.success('Usuario activado correctamente.', 'Exito')
            this.obtenerUsuarios()
        }, 
        err => {
            console.log(err)
        })
    }
}
