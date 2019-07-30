import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatProductosService } from '../../../servicios/cat-productos/cat-productos.service';
import { ProductosService } from '../../../servicios/productos/productos.service';

@Component({
  selector: 'app-producto-compra',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoCompraComponent implements OnInit {
	/**
	* Evento que actualiza la lista de productos
	* 
	* @property {EventEmitter<boolean>}
	*/
	@Output() actualizarProductos = new EventEmitter<boolean>()

	/**
	* Accede al elemento modal
	*
	* @property {ViewChild}
	*/
	@ViewChild('cerrarModal') cerrarModal

	/**
	* Formulario para para almacenar los datos del producto
	*
	* @property {FormGroup}
	*/
	producto: FormGroup

	/**
	* Almacena cada una de las categorias obtenidas de la API
	*
	* @property {Array<any>}
	*/
	categorias: any = []

	/**
	* Activa o desactiva el envio del formulario
	*
	* @property {boolean}
	*/	
	submitted: boolean = false

	constructor(
		public catproductosService: CatProductosService,
		public productosService: ProductosService,
		public fb: FormBuilder)
	{
		
	}

  	ngOnInit() {
  		this.producto = this.fb.group({
  			nombre: ['', Validators.required],
  			categoriasProductoId: ['', Validators.required]
  		})
  		this.obtenerCategorias()
  	}

  	get f(){ return this.producto.controls }

  	obtenerCategorias()
  	{
  		this.catproductosService.obtenerCategoriasProductos().subscribe(
  		res => {
  			this.categorias = res
  		},
  		err => {
  			console.log(err)
  		})
  	}

  	guardarProducto()
  	{
  		this.submitted = true
  		if(this.producto.invalid){ return }
  		this.productosService.guardarRegistroProducto(this.producto.value).subscribe(
  		res => {
  			this.cerrarModal.nativeElement.click()
			this.actualizarProductos.emit(true)
			this.resetearCampos()
  		},
  		err => {
  			console.log(err)
  		})
  	}

  	resetearCampos()
	{
		this.submitted = false
		this.producto.patchValue({
			nombre: '',
			categoriasProductoId: ''
		})
	}

}
