import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../../../servicios/clientes/clientes.service';
import { ProveedoresService } from '../../../servicios/proveedores/proveedores.service';
import { ProductosService } from '../../../servicios/productos/productos.service';
import { VentasService } from '../../../servicios/ventas/ventas.service';

@Component({
  selector: 'app-indicadores',
  templateUrl: './indicadores.component.html',
  styleUrls: ['./indicadores.component.css']
})
export class IndicadoresComponent implements OnInit {
	/**
	*Almacena el total de clientes obtenidos de la API
	*
	*@property {any}
	**/
	clientes: any = []

	/**
	*Almacena el total de proveedores obtenidos de la API
	*
	*@property {any}
	**/
	proveedores: any = []

	/**
	*Almacena el total de productos obtenidos de la API
	*
	*@property {any}
	**/
	productos: any = []

    dato

    totalVenta = 0

	constructor(
		public clientesService: ClientesService,
		public proveedoresService: ProveedoresService,
		public productosService: ProductosService,
        public ventasService: VentasService) 
	{ 
    const fecha = new Date()
    const dia = fecha.getDate()
    const mes = fecha.getMonth()+1
    const ano = fecha.getFullYear()
    const hoy =  ano+"-"+mes+"-"+dia

		this.listaClientes()
		this.listarProveedores()
		this.listarProductos()
        this.obtenerSumaVentaHoy(hoy)
	}

  	ngOnInit() {
  	}

  	listaClientes()
  	{
  		this.clientesService.obtenerClientes().subscribe(
  		res => {
  			this.clientes = res
  		},
  		err => {
  			console.log(err)
  		})
  	}

  	listarProveedores()
  	{
  		this.proveedoresService.obtenerProveedores().subscribe(
  		res => {
  			this.proveedores = res
  			this.proveedores.filter(dato => {
  				return dato.estatus == 1
  			})
  		},
  		err => {
  			console.log(err)
  		})
  	}

  	listarProductos()
  	{
  		this.productosService.obtenerProductos().subscribe(
  		res => {
  			this.productos = res 
  			this.productos.filter(dato => {
  				return dato.estado == 1
  			})
  		},
  		err => {
  			console.log(err)
  		})
  	}

    obtenerSumaVentaHoy(hoy)
    {
        this.ventasService.obtenerVentaHoy(hoy).subscribe(
        res => {
            this.dato = res
            if(this.dato.totalVenta !== null)
            {
                this.totalVenta = this.dato.totalVenta
            }
        },
        err => {
            console.log(err)
        })    
    }
}
