import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../../servicios/productos/productos.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lista-inventario',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaInventarioComponent implements OnInit {
	/**
    * Obtener productos de la API
    *
    *@property {any}
    **/
    productos: any = []

    /**
    * Campo para filtrar datos
    *
    *@property {string}
    **/
    busqueda: string = ''

    /**
    *Pagina inicial de la paginacion
    *
    *@property {number}
    **/
    p: number = 1

	constructor(
        public productosService: ProductosService,
        public toastr: ToastrService) { 
        this.listarProductos()
    }

  	ngOnInit() {
  	}

  	listarProductos()
  	{
  		this.productosService.obtenerProductos().subscribe(
  		res => {
  			this.productos = res
            this.productos.filter(dato => {
                Object.defineProperty(dato, 'categoriaNombre', { value: dato.categorias_producto.nombre })
                if(dato.estado == 1)
                {
                    Object.defineProperty(dato, 'estadoTexto', { value: 'Activo' })
                }
                else
                {
                    Object.defineProperty(dato, 'estadoTexto', { value: 'Inactivo' })
                }
            })
  		},
  		err => {
  			console.log(err)
  		})
  	}

    desactivarProducto(id)
    {
        if(confirm('¿Esta seguro de que desea deshabilitar el producto?'))
        {
            const dato = { estado: 0 }
            this.productosService.actualizarProducto(id, dato).subscribe(
            res => {
                this.toastr.success('Producto deshabilitado satisfactoriamente.', 'Exito')
                this.listarProductos()
            },
            err => {
                console.log(err)
            })
        }
    }

    activarProducto(id)
    {
        const dato =  { estado: 1 }
        this.productosService.actualizarProducto(id, dato).subscribe(
        res => {
            this.toastr.success('Producto reactivado correctamente.', 'Exito')
            this.listarProductos()
        },
        err => {
            console.log(err)
        })
    }

}
