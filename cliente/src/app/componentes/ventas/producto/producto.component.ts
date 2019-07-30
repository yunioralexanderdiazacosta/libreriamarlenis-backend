import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductosService } from '../../../servicios/productos/productos.service';
import { NgSelectConfig } from '@ng-select/ng-select';

@Component({
	selector: 'app-producto',
	templateUrl: './producto.component.html',
	styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
	/**
	* Evento que actualiza los montos de la venta
	* 
	* @property {EventEmitter<boolean>}
	*/
	@Output() actualizarMontos = new EventEmitter<boolean>()
	
	/**
	* Formulario que almacena los datos del producto
	* 
	* @property {FormGroup}
	*/
	formProducto: FormGroup

    /**
	* Almacena los productos obtenidos de la API
	* 
	* @property {Array<any>}
	*/
	productos: any = [];

	/**
	* Obtiene los datos de un producto seleccionado
	* 
	* @property {Array<any>}
	*/
	producto

	/**
	* Almacena los productos obtenidos del arreglo
	* 
	* @property {Array<any>}
	*/
	productosArreglo

	/**
	* Verifica si el formulario ha sido enviado
	* 
	* @property {boolean}
	*/
	submitted: boolean = false;

	/**
	* Accede al elemento modal
	*
	* @property {ViewChild}
	*/
	@ViewChild('cerrarModal') cerrarModal;

	constructor(
	public productosService: ProductosService,
	public fb: FormBuilder,
	private config: NgSelectConfig,) { 
		this.config.notFoundText = 'No se encontraron resultados';
	}

	ngOnInit() {
		this.listarProductos();

		this.formProducto = this.fb.group({
			producto_id: ['', Validators.required],
			producto_nombre: [''],
			cantidad: [1, Validators.required],
			stock: [0],
			precio_venta: [0],
			subtotal: [0]
		})
	}

	get f(){ return this.formProducto.controls; }

	listarProductos()
	{
		this.productos = this.productosService.obtenerProductosArreglo()
	}

	obtenerProducto(id)
	{
		if(id)
		{
			this.productosService.obtenerProducto(id).subscribe(
			res => {
				this.producto = res;
				this.formProducto.patchValue({
					producto_nombre: this.producto.nombre,
					stock: this.producto.stock,
					precio_venta: this.producto.precio_venta
				})
				const cantidad = this.formProducto.get('cantidad');
				cantidad.setValidators(Validators.max(this.producto.stock));
				cantidad.updateValueAndValidity();
			},
			err => {
				console.log(err)
			})
		}
	}

	almacenarProducto()
	{
		this.submitted = true;
		this.formProducto.patchValue({
			subtotal: this.f.cantidad.value * this.f.precio_venta.value
		})
		if(this.formProducto.invalid){
			return;
		}
		this.productosService.guardarProductoVenta(this.formProducto.value)
		this.cerrarModal.nativeElement.click()
		this.productos.find(dato => { 
			if(dato.id == this.formProducto.value.producto_id){
				return dato.estado= 1
			}  
		})
		this.resetearCampos();
		this.actualizarMontos.emit(true);
	}

	resetearCampos()
	{
		this.submitted = false;
		this.formProducto.setValue({
			producto_id: '',
			producto_nombre: '',
			cantidad: 1,
			stock: 0,
			precio_venta: 0,
			subtotal: 0 
		})
	}
}
