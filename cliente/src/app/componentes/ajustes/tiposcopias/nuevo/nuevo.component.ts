import { Component, OnInit, Output, EventEmitter, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoCopiasService } from '../../../../servicios/tipo-copias/tipo-copias.service';

@Component({
  selector: 'app-nuevo-tipo-copia',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NuevoTipoCopiaComponent implements OnInit {
	/**
  	* Evento que actualiza la lista de clientes
  	* 
  	* @property {EventEmitter<boolean>}
  	*/
  	@Output() actualizarTipoDeCopias = new EventEmitter<boolean>();

  	/**
  	* Accede al elemento modal
  	*
  	* @property {ViewChild}
  	*/
  	@ViewChild('cerrarModal') cerrarModal
  	/**
	*Formulario que almacena los datos del tipo de copia
	*
	*@property {FormGroup}
	**/
	formCopia: FormGroup

	/**
	*Almacena los datos del tipo de copia
	*
	*@property {boolean}
	**/
	submitted: boolean = false



	constructor(
		public fb: FormBuilder,
		public tiposCopiasService: TipoCopiasService,) { 
		this.formCopia = this.fb.group({
				descripcion: ['', Validators.required],
				precio: ['', Validators.required],
				estatus: [1]
		})
	}

  	ngOnInit() {
  	}

  	get f(){ return this.formCopia.controls }

  	/** 
  	*Guardar tipo de copia
  	*
  	* @return {void}
  	**/
  	guardarTipo()
  	{
  		this.submitted = true 
  		if(this.formCopia.invalid){ return }

  		this.tiposCopiasService.guardarTipoCopia(this.formCopia.value).subscribe(
  		res => {
  			this.cerrarModal.nativeElement.click()
        	this.resetearCampos()
        	this.actualizarTipoDeCopias.emit(true);	
  		},
  		err => {
  			console.log(err)
  		})
  	}

  	/**
  	* Resetear campos del formulario
  	*
  	* @return {void}
  	**/
  	resetearCampos()
  	{
  		this.submitted = false
  		this.formCopia.setValue({
  			descripcion: '',
  			precio: '',
  			estatus: 1
  		})
  	}

}
