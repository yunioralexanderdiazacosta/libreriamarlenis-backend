import { Component, OnInit } from '@angular/core';
import { CatProductosService } from '../../../servicios/cat-productos/cat-productos.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categorias-productos',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasProductosComponent implements OnInit {
    /**
    *Almacena las categorias de productos obtenidas de la API
    *
    *@property {any}
    **/
    categorias: any = []

	constructor(
        public catProductosService: CatProductosService,
        public toastr: ToastrService) { 
        
        this.listarCategoriasProductos()
    }

  	ngOnInit() {}

    /**
    *Obtiene cada una de las categorias de productos de la API
    *
    *@return {void}
    **/
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

    /**
    *Activa el dialogo para cancelar o desactivar el tipo
    *
    *@return {void}
    **/
    anularCategoria(id)
    {
        if(confirm('¿Esta seguro de que desea desactivar la categoria?'))
        {
            const dato =  { estatus: 0 }
            this.catProductosService.desactivarCategoria(id, dato).subscribe(
            res => {
                 this.toastr.success('Categoria desactivada satisfactoriamente.', 'Exito')
                 this.listarCategoriasProductos()
            },
            err => {
                console.log(err)
            })
        }
    }

    /**
    *Reactivar un tipo previamente seleccionada
    *
    *@return {void}
    **/
    reactivarCategoria(id)
    {
        const dato = { estatus: 1 }
        this.catProductosService.reactivarCategoria(id, dato).subscribe(
        res => {
            this.toastr.success('Categoria reactivada correctamente.', 'Exito')
            this.listarCategoriasProductos()
        },
        err => {
            console.log(err)
        })
    }
}
