import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientesService } from '../../../servicios/clientes/clientes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edicion',
  templateUrl: './edicion.component.html',
  styleUrls: ['./edicion.component.css']
})
export class ClientesEdicionComponent implements OnInit {
	/**
  	* Almacena los datos del formulario
  	* 
  	* @property {FormGroup}
  	*/
	formCliente: FormGroup

    /**
    * Verifica si el formulario ha sido enviado
    * 
    * @property {boolean}
    */
    submitted: boolean = false

    /**
	*Mensaje de error
	*
	*@property {string}
	**/
  	input_required: string = "Este campo es requerido"

  	/**
	*Almacena los datos del cliente
	*
	*@property {any}
	**/
  	cliente

    /**
    *Almacena el identificador del cliente
    *
    *@property {any}
    **/
  	id_cliente

	constructor(
		public fb: FormBuilder,
  		public clientesService: ClientesService,
  		public activatedRoute: ActivatedRoute,
  		public toastr: ToastrService,
  		public router: Router) { 

		const params = this.activatedRoute.snapshot.params
		this.id_cliente = params.id
		this.clientesService.obtenerCliente(params.id).subscribe(
			res => {
				this.cliente = res

				var nacionalidad = this.cliente.cedula.charAt(0)
				var nCedula = this.cliente.cedula.substr(2)
	
				this.formCliente = this.fb.group({
					nacionalidad: [nacionalidad, Validators.required],
		  			nCedula: [nCedula, [ Validators.required, Validators.pattern('[0-9]+')]],
		  			nombres: [this.cliente.nombres, Validators.required],
		  			apellidos: [this.cliente.apellidos, Validators.required],
		  			direccion: [this.cliente.direccion, Validators.required],
		  			telefono: [this.cliente.telefono, Validators.required]
				})
			},
			err => {
				console.log(err)
			})
	}

  	ngOnInit() {}

  	/**
	* Accede a los campos de la vista
	*
	*@return {Object}
	**/
  	get f() { return this.formCliente.controls }

  	/**
	* Actualiza los datos
	*
	*@return {void}
	**/
  	actualizarCliente()
  	{
        this.submitted = true
        if(this.formCliente.invalid){ return }
  		
  		let datosCliente = {
  			cedula: this.formCliente.value.nacionalidad+'-'+this.formCliente.value.nCedula, 
  			nombres: this.formCliente.value.nombres,
  			apellidos: this.formCliente.value.apellidos, 
  			direccion: this.formCliente.value.direccion,
  			telefono: this.formCliente.value.telefono
  		}	

  		this.clientesService.actualizarCliente(this.id_cliente, datosCliente).subscribe(
  		res => {
  			this.toastr.success('Datos actualizados correctamente.', 'Exito')
  			this.router.navigate(['/clientes'])
  		},
  		err => {
  			console.log(err)
  		})
  	}
}
