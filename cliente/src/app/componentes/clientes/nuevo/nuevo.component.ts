import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientesService } from '../../../servicios/clientes/clientes.service';

@Component({
	selector: 'app-nuevo-cliente',
	templateUrl: './nuevo.component.html',
	styleUrls: ['./nuevo.component.css']
})
export class NuevoClienteComponent implements OnInit {
	/**
  	* Evento que actualiza la lista de clientes
  	* 
  	* @property {EventEmitter<boolean>}
  	*/
  	@Output() actualizarClientes = new EventEmitter<boolean>();

  	/**
  	* Accede al elemento modal
  	*
  	* @property {ViewChild}
  	*/
  	@ViewChild('cerrarModal') cerrarModal;
	
  	/**
  	* Almacena los datos del formulario
  	* 
  	* @property {FormGroup}
  	*/
	formCliente: FormGroup;

	/**
	*Mensaje de error
	*
	*@property {string}
	**/
  	input_required: string = "Este campo es requerido";

	constructor(
  		public fb: FormBuilder,
  		public clientesService: ClientesService
  	) { }

	ngOnInit() {
		this.formCliente = this.fb.group({
			nacionalidad: ['', Validators.required],
  			nCedula: ['', [ Validators.required, Validators.pattern('[0-9]+')]],
  			nombres: ['', Validators.required],
  			apellidos: ['', Validators.required],
  			direccion: ['', Validators.required],
  			telefono: ['', Validators.required]
		})
  	}

  	/**
	* Accede a los campos de la vista
	*
	*@return {Object}
	**/
  	get f() { return  this.formCliente.controls }

  	/**
	* Envia los datos almacenados a la API
	*
	*@return {void}
	**/
  	almacenarCliente()
  	{
  		let datosEnviar = {
  			cedula: this.formCliente.value.nacionalidad+'-'+this.formCliente.value.nCedula, 
  			nombres: this.formCliente.value.nombres,
  			apellidos: this.formCliente.value.apellidos, 
  			direccion: this.formCliente.value.direccion,
  			telefono: this.formCliente.value.telefono
  		}
  		this.clientesService.guardarCliente(datosEnviar).subscribe(
  			res => {
  				this.cerrarModal.nativeElement.click();
        		this.resetearCampos();
        		this.actualizarClientes.emit(true);
  			},
  			err => {
  				console.log(err);
  			}
  		)
  	}

  	/** Resetear campos del formulario
  	*
  	* @return {void}
  	*/
  	resetearCampos(){
    	this.formCliente.setValue({
			nacionalidad: '',
  			nCedula: '',
  			nombres: '',
  			apellidos: '',
  			direccion: '',
  			telefono: ''
   	 	})
  	}
}
