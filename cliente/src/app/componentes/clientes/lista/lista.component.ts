import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../servicios/usuarios/usuarios.service';
import { ClientesService } from '../../../servicios/clientes/clientes.service';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaClientesComponent implements OnInit {
	/**
    *Almacena los clientes obtenidos de la API
    *
    *@property {any}
    **/
    clientes

    /**
    *Almacena los datos del usuario conectado
    *
    *@property {any}
    **/
    usuario

    /**
    *Activa la busqueda
    *
    *@property {any}
    **/
    busqueda: string = ''

    /**
    *Pagina inicial de la paginacion
    *
    *@property {number}
    **/
    p: number = 1

	constructor(
        public clientesService: ClientesService,
        public usuariosService: UsuariosService) { 
        
        this.obtenerClientes()
        this.obtenerUsuario()
  }

  	ngOnInit() {}

    /**
    *Obtiene los datos del usuario conectado
    *
    *@return {void}
    **/
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

    /**
    *Obtiene los clientes encontrados en la API y los almacena
    *
    *@return {void}
    **/
  	obtenerClientes()
  	{
  		this.clientesService.obtenerClientes().subscribe(
  			res => {
  				this.clientes = res
  			},
  			err => {
  				console.log(err)
  			}
  		)
  	}
}
