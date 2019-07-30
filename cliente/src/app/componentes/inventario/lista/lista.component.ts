import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../../servicios/productos/productos.service';

@Component({
  selector: 'app-lista-inventario',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaInventarioComponent implements OnInit {
	productos: any = []; 

	constructor(public productosService: ProductosService) { 
    this.listarProductos()
  }

  	ngOnInit() {
  	}

  	listarProductos()
  	{
  		this.productosService.obtenerProductos().subscribe(
  		res => {
  			this.productos = res
  		},
  		err => {
  			console.log(err)
  		})
  	}

}
