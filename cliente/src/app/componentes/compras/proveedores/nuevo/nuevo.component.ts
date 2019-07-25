import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProveedoresService } from '../../../../servicios/proveedores/proveedores.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-proveedor',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css']
})
export class NuevoProveedorComponent implements OnInit {
	/**
	* Evento que actualiza los montos de la venta
	* 
	* @property {EventEmitter<boolean>}
	*/
	@Output() actualizarProveedores = new EventEmitter<boolean>();

	/**
	* Accede al elemento modal
	*
	* @property {ViewChild}
	*/
	@ViewChild('cerrarModal') cerrarModal

	formProveedor: FormGroup
	submitted: boolean = false
	input_required: string = 'Este campo no puede quedar vacío'

	constructor(
		public fb: FormBuilder,
		public router: Router,
		public proveedoresService: ProveedoresService) { }

	ngOnInit() {
		this.formProveedor = this.fb.group({
			razon_social: ['', Validators.required],
			contacto: ['', Validators.required],
			correo: ['', [Validators.required, Validators.email]],
			telefono: ['', Validators.required],
			direccion: ['', Validators.required]
		})
  	}

  	get f(){ return this.formProveedor.controls }

  	almacenarProveedor()
  	{
  		this.submitted = true
  		if(this.formProveedor.invalid){
  			return;
  		}

  		this.proveedoresService.guardarProveedor(this.formProveedor.value).subscribe(
  		res => {
  			this.actualizarProveedores.emit(true);
  			this.cerrarModal.nativeElement.click()
  			this.resetearCampos();
  		},
  		err => {
  			console.log(err)
  		})
  	}

  	resetearCampos()
  	{
  		this.submitted = false
  		this.formProveedor.setValue({
  			razon_social: '',
			contacto: '',
			correo: '', 
			telefono: '', 
			direccion: ''
  		})
  	}
}
