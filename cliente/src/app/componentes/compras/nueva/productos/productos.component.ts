import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ComprasService } from '../../../../servicios/compras/compras.service';
import { ProductosService } from '../../../../servicios/productos/productos.service';

@Component({
  selector: 'app-productos-compra',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class CompraProductosComponent implements OnInit {
	/**
    * Evento que actualiza los montos de la compra
    * 
    * @property {EventEmitter<boolean>}
    */
    @Output() actualizarMontos = new EventEmitter<boolean>();

    /**
    *Obtiene cada uno de los datos de la compra
    *
    *@property {Array}
    **/
    compras: any = []

    /**
    *Guarda los productos obtenidos del array
    *
    *@property {Array}
    **/
    productos

    /** Guarda el producto obtenido del array
    *
    *@property {Object}
    **/
    producto

  	constructor(
          public comprasService: ComprasService,
          public productosService: ProductosService) { }

	ngOnInit() {
		this.listarCompra()
  	}

  	listarCompra()
  	{
  		this.compras = this.comprasService.obtenerCompraArreglo()
  	}

    eliminarProducto(indice, id)
    {
        if(confirm('¿Esta seguro de que desea eliminar el registro?')){
            this.productos = this.productosService.obtenerProductosArreglo();
            this.producto = this.productos[indice];
            this.productos.find(dato => {
                if(dato.id == this.producto.id)
                {
                    return dato.estado = 0;
                }
            })
            this.comprasService.eliminarProductoCompra(indice);
            this.actualizarMontos.emit(true);
            this.listarCompra();
        }
    }

}
