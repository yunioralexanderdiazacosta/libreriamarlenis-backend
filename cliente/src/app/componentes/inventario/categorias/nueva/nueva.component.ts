import { Component, OnInit, Output, EventEmitter, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatProductosService   } from '../../../../servicios/cat-productos/cat-productos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nueva-categoria-producto',
  templateUrl: './nueva.component.html',
  styleUrls: ['./nueva.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriaProductoNuevaComponent implements OnInit {
	/**
  	* Evento que actualiza las categorias de productos
  	* 
  	* @property {EventEmitter<boolean>}
  	*/
  	@Output() actualizarCategorias = new EventEmitter<boolean>()

  	/**
  	* Accede al elemento modal
  	*
  	* @property {ViewChild}
  	*/
  	@ViewChild('cerrarModal') cerrarModal

	/**
	* Formulario con los datos de la categoria
	*
	*@property {FormGroup}
	**/
	formCategoria: FormGroup

	/**
	* Activa o desactiva el envio de formulario
	*
	*@property {boolean}
	**/
	submitted: boolean = false

 	constructor(
  		public catProductosService: CatProductosService,
		public activatedRoute: ActivatedRoute,
		public fb: FormBuilder,
		public router: Router) { 

 		this.formCategoria = this.fb.group({
  				nombre: ['', Validators.required],
  				estatus: [1]
  		})
 	}

  	ngOnInit() {
  	}

  	get f(){ return this.formCategoria.controls }

  	guardarCategoria()
  	{
  		this.submitted = true
  		if(this.formCategoria.invalid){ return }

  		this.catProductosService.guardarCartegoriaProducto(this.formCategoria.value).subscribe(
  		res => {
  			this.cerrarModal.nativeElement.click()
        	this.resetearCampos()
        	this.actualizarCategorias.emit(true)	
  		},
  		err => {
  			console.log(err)
  		})
  	}

  	resetearCampos()
  	{
  		this.submitted = false
  		this.formCategoria.setValue({
  			nombre: '',
  			estatus: 1
  		})
  	}
}
