import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { TipoCopiasService } from '../../../servicios/tipo-copias/tipo-copias.service';
import { CopiasService } from '../../../servicios/copias/copias.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-nueva-fotocopia',
  templateUrl: './nueva.component.html',
  styleUrls: ['./nueva.component.css']
})
export class NuevaFotocopiaComponent implements OnInit {
  	/**
	* Evento que actualiza los montos de la venta
	* 
	* @property {EventEmitter<boolean>}
	*/
	@Output() actualizarMontoCopias = new EventEmitter<boolean>();

	/**
	* Accede al elemento modal
	*
	* @property {ViewChild}
	*/
	@ViewChild('cerrarModal') cerrarModal

    /**
    * Formulario que almacena el pedido de copias
    *
    * @property {FormGroup}
    */
  	formCopia: FormGroup

    /**
    * Almacena los tipos de copias del arreglo
    *
    * @property {any}
    */
  	tipoCopias

    /**
    * Almacena el tipo de copia seleccionado
    *
    * @property {any}
    */
  	tipoCopia

    /**
    * Verifica si el formulario ha sido enviado  o no
    *
    * @property {any}
    */
  	submitted: boolean = false

	constructor(
		public fb: FormBuilder,
        public copiasService: CopiasService,
		public tipoCopiasService: TipoCopiasService) { }

  	ngOnInit() {
  		this.listarTipoCopias();
  		this.formCopia = this.fb.group({
  			tipo_id: ['', Validators.required],
  			tipo_descripcion: [''],
  			cantidad: [1, Validators.required],
  			precio: [0],
  			subtotal: [0]
  		})
  	}

  	get f(){ return this.formCopia.controls }

  	listarTipoCopias()
  	{
  		this.tipoCopias = this.tipoCopiasService.obtenerTipoCopiasArreglo()
  	}

  	obtenerDatos(id)
  	{
  		this.tipoCopias.find(dato => {
  			if(dato.id == id)
  			{
  				this.formCopia.patchValue({
  					tipo_descripcion: dato.descripcion,
  					precio:  dato.precio
  				})
  			}
  		})
  	}

  	almacenarCopiaVenta()
  	{
  		this.submitted = true
  		this.formCopia.patchValue({ subtotal: this.f.cantidad.value * this.f.precio.value })
  		if(this.formCopia.invalid){
  			return
  		}
  		this.copiasService.guardarCopiaArreglo(this.formCopia.value)
        this.tipoCopias.find(dato => { 
            if(dato.id == this.formCopia.value.tipo_id){
                return dato.estado= 1
            }  
        })
  		this.actualizarMontoCopias.emit(true);
      this.resetearCampos();
      this.cerrarModal.nativeElement.click();
  	}

  	resetearCampos()
  	{
  		this.submitted = false
  		this.formCopia.setValue({
  			tipo_id: '',
  			tipo_descripcion: '',
  			cantidad: 1,
  			precio: 0,
  			subtotal: 0
  		})	
  	}

}
