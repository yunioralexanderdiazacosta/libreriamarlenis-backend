import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductosService } from '../../../../servicios/productos/productos.service';

@Component({
  selector: 'app-productos-venta',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class VentasProductosComponent implements OnInit {
    /**
    * Evento que actualiza los montos de la venta
    * 
    * @property {EventEmitter<boolean>}
    */
    @Output() actualizarMontos = new EventEmitter<boolean>();

	  /**
    *Guarda los productos de la venta obtenidos del array
    *
    *@property {Array}
    **/
	  productosVenta;

    /**
    *Guarda los productos obtenidos del array
    *
    *@property {Array}
    **/
    productos;

    /** Guarda el producto obtenido del array
    *
    *@property {Object}
    **/
    producto;

	constructor(public productosService: ProductosService) { }

  	ngOnInit() {
  		this.listaProductosVenta();
  	}

  	/**
    * Obtiene cada uno de los productos introducidos en la venta
    *
    *@return {void}
    **/
  	listaProductosVenta()
  	{
  		this.productosVenta = this.productosService.obtenerProductosVenta();
  	}

    eliminarProducto(indice)
    {
        if(confirm('¿Esta seguro de que desea eliminar el producto?'))
        {
            this.productos = this.productosService.obtenerProductosArreglo();
            this.producto = this.productos[indice];
            this.productos.find(dato => {
                if(dato.id == this.producto.id)
                {
                    return dato.estado = 0;
                }
            })
            this.productosService.eliminarProductoVenta(indice);
            this.actualizarMontos.emit(true);
            this.listaProductosVenta();
        }
    }
}
