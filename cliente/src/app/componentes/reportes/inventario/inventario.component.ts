import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../../servicios/productos/productos.service';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class ReporteInventarioComponent implements OnInit {
	productos: any = [];
  	
  	constructor(public productosService: ProductosService) { 
  		this.listarProductos()
  	}

  	ngOnInit() {
  	}

  	listarProductos()
  	{
  		this.productosService.obtenerProductos().subscribe(
  		(res:any) => {
        const datos = res
  			this.productos = datos.filter(dato => dato.estado == 1)
        console.log(datos)
  		},
  		err => {
  			console.log(err)
  		})
  	}

}
