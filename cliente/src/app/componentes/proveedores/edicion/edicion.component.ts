import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProveedoresService } from '../../../servicios/proveedores/proveedores.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edicion',
  templateUrl: './edicion.component.html',
  styleUrls: ['./edicion.component.css']
})
export class ProveedorEdicionComponent implements OnInit {
	/**
	* Formulario para almacenar los datos del proveedor
	*
	* @property {FormGroup}
	*/
	formProveedor: FormGroup

	/**
	* Almacena los datos del proveedor
	*
	* @property {any}
	*/
	proveedor

	/**
	* Identificador del proveedor
	*
	* @property {number}
	*/
	id: number

	/**
	* verifica si el formulario ha sido enviado
	*
	* @property {boolean}
	*/
	submitted: boolean = false
  	
  	constructor(
  		public router: Router,
  		public fb: FormBuilder,
  		public toastr: ToastrService,
		public activatedRoute: ActivatedRoute,
		public proveedoresService: ProveedoresService) 
  	{ 
  	}

  	ngOnInit() {
  		this.id = this.activatedRoute.snapshot.params.id

  		if(this.id)
  		{
  			this.proveedoresService.obtenerProveedor(this.id).subscribe(
  			res => {
  				this.proveedor = res
  				this.formProveedor = this.fb.group({
					razon_social: [this.proveedor.razon_social, Validators.required],
					contacto: [this.proveedor.contacto, Validators.required],
					correo: [this.proveedor.correo, [Validators.required, Validators.email]],
					telefono: [this.proveedor.telefono, Validators.required],
					direccion: [this.proveedor.direccion, Validators.required]
  				})
  			},
  			err => {
  				console.log(err)
  			})
  		}
  		else
  		{
  			this.router.navigateByUrl('proveedores')
  		}
  	}

  	get f(){ 
  		if(this.formProveedor)
  		{
  			return this.formProveedor.controls 
  		}
  	}

  	actualizarProveedor()
  	{
  		this.submitted = true
  		if(this.formProveedor.invalid){ return }

  		this.proveedoresService.actualizarProveedor(this.id, this.formProveedor.value).subscribe(
  			res => {
  				this.toastr.success('Datos actualizados correctamente.', 'Exito')
  				this.router.navigateByUrl('proveedores')
  			},
  			err => {
  				console.log(err)
  			}
  		)
  	}

}
