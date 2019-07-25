import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductosService } from '../../../../servicios/productos/productos.service';
import { ComprasService } from '../../../../servicios/compras/compras.service';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent implements OnInit {
	/**
    * Formulario para almacenar los datos especificos de la compra
    * 
    * @property {FormGroup}
    */
    formulariocompra: FormGroup

    /**
    * Almacena los productos obtenidos del arreglo
    * 
    * @property {Array}
    */
	productos

    /**
    * Verifica si el formulario ha sido enviado
    * 
    * @property {boolean}
    */
	submitted: boolean = false

    /**
    * Mensaje de error
    * 
    * @property {string}
    */
	input_number_required: string = 'Este campo es requerido y solo acepta números'
    /**
    * Evento que actualiza los montos de la compra
    * 
    * @property {EventEmitter<boolean>}
    */
	@Output() cerrarVentana = new EventEmitter<boolean>();

    /**
    * Accede al elemento modal
    *
    * @property {ViewChild}
    */
    @ViewChild('cerrarModal') cerrarModal;

	constructor(
		public fb: FormBuilder,
  		public productosService: ProductosService,
  		public comprasService: ComprasService) { }

  	ngOnInit() {
  		this.listarProductos()
  		this.formulariocompra = this.fb.group({
  			producto_id: ['', Validators.required],
  			producto_nombre: ['', Validators.required],
  			cantidad: [1, Validators.required],
  			precio_compra: [null, Validators.required],
  			precio_venta: [null, Validators.required],
  			subtotal: [0]
  		})
  	}

  	get f(){ return this.formulariocompra.controls }

  	listarProductos()
  	{
  		this.productos = this.productosService.obtenerProductosArreglo();
  	}

  	obtenerProducto(id)
  	{
  		this.productos.filter(dato => {
  			if(dato.id == id)
  			{
  				this.formulariocompra.patchValue({
  					producto_nombre: dato.nombre
  				})
  			}
  		})
  	}

  	almacenarCompra()
  	{
  		this.submitted = true
  		if(this.formulariocompra.invalid){
  			return
  		}
  		this.formulariocompra.patchValue({ subtotal: this.f.cantidad.value * this.f.precio_compra.value })
  		this.comprasService.guardarCompraArreglo(this.formulariocompra.value)
        this.productos.find(dato => { 
            if(dato.id == this.formulariocompra.value.producto_id){
                return dato.estado= 1
            }  
        })
  		this.cerrarVentana.emit(true)
        this.cerrarModal.nativeElement.click()
  		this.resetearCampos()
  	}

  	resetearCampos()
  	{
  		this.submitted = false
  		this.formulariocompra.patchValue({
  			producto_id: '',
  			producto_nombre: '',
  			cantidad: 1,
  			precio_compra: null,
  			precio_venta: null,
  			subtotal: 0
  		})
  	}
}
