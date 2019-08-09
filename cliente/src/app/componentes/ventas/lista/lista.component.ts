import { Component, OnInit } from '@angular/core';
import * as moment from 'moment'; 
import { VentasService } from '../../../servicios/ventas/ventas.service';
import { UsuariosService } from '../../../servicios/usuarios/usuarios.service';
import { ToastrService } from 'ngx-toastr'; 

@Component({
  selector: 'app-lista-ventas',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaVentasComponent implements OnInit {
	/**
    *Almacena cada una de las ventas obtenidas de la API
    *
    *@property {Array<any>}
    **/
    ventas: any = []

    /**
    *Almacena los datos del usuario conectado
    *
    *@property {any}
    **/
    usuario

    /**
    *Pagina inicial de la paginacion
    *
    *@property {number}
    **/
    p: number = 1

    /**
    *Inicialización del campo de busqueda
    *
    *@property {string}
    **/
    busqueda: string = ''

	constructor(
        public ventasService: VentasService,
        public usuariosService: UsuariosService,
        public toastr: ToastrService) { 
        this.obtenerUsuario()
    }

  	ngOnInit() {
  		this.listarVentas()
  	}

    /**
    *Lista cada una de las ventas obtenidas de la API
    *
    *@return {void}
    **/
  	listarVentas()
  	{
  		this.ventasService.obtenerVentas().subscribe(
  		(res: any) => {
  			this.ventas = res
            this.ventas.filter(dato => {
                dato.created_at = moment(dato.created_at).format("DD-MM-YYYY hh:mm a")
                Object.defineProperty(dato, 'clienteAtendido', { value: dato.cliente.cedula+' - '+dato.cliente.nombres+" "+dato.cliente.apellidos }) 
                dato.estatus == 1
                ?  Object.defineProperty(dato, 'estatusTexto', { value: 'Procesada' }) 
                :  Object.defineProperty(dato, 'estatusTexto', { value: 'Anulada' }) 
            })
  		},
  		err => {
  				console.log(err)
  		})
  	}

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
    *Activa el dialogo para cancelar o anular la venta
    *
    *@return {void}
    **/
    anularVenta(id)
    {
        if(confirm('¿Esta seguro de que desea anular la venta?'))
        {
            const dato =  { estatus: 0 }
            this.ventasService.anularVenta(id, dato).subscribe(
            res => {
                 this.obtenerUsuario()
                 this.listarVentas()
                 this.toastr.success('Venta anulada satisfactoriamente.', 'Exito')
            },
            err => {
                console.log(err)
            })
        }
    }

    /**
    *Reactivar una venta previamente seleccionada
    *
    *@return {void}
    **/
    reactivarVenta(id)
    {
        const dato = { estatus: 1 }
        this.ventasService.reactivarVenta(id, dato).subscribe(
        res => {
            this.obtenerUsuario()
            this.listarVentas()
            this.toastr.success('Venta reactivada correctamente.', 'Exito')
        },
        err => {
            console.log(err)
        })
    }
}
