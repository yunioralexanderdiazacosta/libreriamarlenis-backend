import { Component, OnInit, ChangeDetectionStrategy  } from '@angular/core';
import { UsuariosService } from '../../../servicios/usuarios/usuarios.service';
import { ClientesService } from '../../../servicios/clientes/clientes.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
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
        public usuariosService: UsuariosService,
        public toastr: ToastrService) { 
        
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
                this.clientes.filter(dato => {
                dato.estatus == 1
                ?  Object.defineProperty(dato, 'estatusTexto', { value: 'Activo' }) 
                :  Object.defineProperty(dato, 'estatusTexto', { value: 'Inactivo' }) 
                })
  			},
  			err => {
  				console.log(err)
  			}
  		)
  	}

    /**
    * Desactiva un cliente previamente seleccionado
    *
    *@return {void}
    **/
    desactivar(id)
    {    
        if(confirm('¿Esta seguro de que desea dar de baja al cliente?'))
        {    
           const dato = { estatus: 0 }
           this.clientesService.desactivarCliente(id, dato).subscribe(
           res => {
                this.toastr.success('Cliente desactivado correctamente.', 'Exito')
                this.obtenerClientes()
                this.obtenerUsuario()
           }, 
           err => {
               console.log(err)
           })
        }
    }

    /**
    * Reactiva un cliente previamente seleccionado
    *
    *@return {void}
    **/
    activar(id)
    {
        const dato = { estatus: 1 }
        this.clientesService.reactivarCliente(id, dato).subscribe(
        res => {
            this.toastr.success('Cliente activado correctamente.', 'Exito')
            this.obtenerClientes()
            this.obtenerUsuario()
        }, 
        err => {
            console.log(err)
        })
    }
}
