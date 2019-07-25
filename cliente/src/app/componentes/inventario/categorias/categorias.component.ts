import { Component, OnInit } from '@angular/core';
import { CatProductosService } from '../../../servicios/cat-productos/cat-productos.service';

@Component({
  selector: 'app-categorias-productos',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasProductosComponent implements OnInit {

	constructor(public catProductosService: CatProductosService) { }
	categorias: any = []

  	ngOnInit() {
  		this.listarCategoriasProductos()
  	}

  	listarCategoriasProductos()
  	{
  		this.catProductosService.obtenerCategoriasProductos().subscribe(
  		res => {
  			this.categorias = res
  		},
  		err => {
  			console.log(err)
  		})
  	}
}
