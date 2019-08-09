import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductosService } from '../../../servicios/productos/productos.service';
import { CatProductosService } from '../../../servicios/cat-productos/cat-productos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edicion-producto',
  templateUrl: './edicion.component.html',
  styleUrls: ['./edicion.component.css']
})
export class ProductosEdicionComponent implements OnInit {
	/**
	* Almacena el identificador del producto
	*
	*@property {number}
	**/
	id: number 

	/**
	* Almacena los datos del producto
	*
	*@property {any}
	**/
	producto

	/**
	* Almacena las categorias de cada uno de los productos
	*
	*@property {any}
	**/
	categorias

	/**
	* Formulario para almacenar los datos del producto
	*
	*@property {FormGroup}
	**/
	formProducto: FormGroup

	/**
	* Mensaje de error
	*
	*@property {string}
	**/
	input_required: string = 'Este campo es requerido'

	constructor(
		public router: Router,
		public fb: FormBuilder,
		public toastr: ToastrService,
		public activatedRoute: ActivatedRoute,
		public productosService: ProductosService,
		public catProductosService: CatProductosService) { 
		this.id = this.activatedRoute.snapshot.params.id
		if(this.id)
		{
			this.obtenerCategorias()
			this.productosService.obtenerProducto(this.id).subscribe(
			res => {
				this.producto = res
				this.formProducto = this.fb.group({
					nombre: [this.producto.nombre, Validators.required],
					categoriasProductoId: [this.producto.categoriasProductoId, Validators.required],
					precio_venta: [this.producto.precio_venta, Validators.required],
					estado: [this.producto.estado, Validators.required]
				})
			}, 
			err => {
				console.log(err)
			})
		}
		else
		{
			this.router.navigateByUrl('inventario')
		}
	}

	ngOnInit() {

  	}

  	obtenerCategorias()
  	{
  		this.catProductosService.obtenerCategoriasProductos().subscribe(
  		res => {
  			this.categorias = res
  		},
  		err => {
  			console.log(err)
  		})
  	}

  	get f(){ return this.formProducto.controls }

  	actualizarProducto()
  	{
  		if(this.formProducto.invalid){ return }
  		this.productosService.actualizarProducto(this.id, this.formProducto.value).subscribe(
  		res => {
  			this.toastr.success('Datos actualizados correctamente.', 'Exito')
  			this.router.navigate(['/inventario'])
  		},
  		err => {
  			console.log(err)
  		}
  		)
  	}
}
