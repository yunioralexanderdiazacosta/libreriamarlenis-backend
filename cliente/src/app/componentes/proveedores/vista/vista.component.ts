import { Component, OnInit } from '@angular/core';
import { ProveedoresService } from '../../../servicios/proveedores/proveedores.service';
import { ActivatedRoute } from  '@angular/router';

@Component({
  selector: 'app-vista',
  templateUrl: './vista.component.html',
  styleUrls: ['./vista.component.css']
})
export class ProveedorVistaComponent implements OnInit {
	/**
	*Obtener datos del proveedor
	*
	*@property {any}
	**/
	proveedor

	constructor(
		public proveedoresService: ProveedoresService,
		public activatedRoute: ActivatedRoute) { 

		const params = this.activatedRoute.snapshot.params
		this.obteniendoProveedor(params.id)
	}

  	ngOnInit() {
  	}

  	obteniendoProveedor(id)
  	{
  		this.proveedoresService.obtenerProveedor(id).subscribe(
  		res => {
  			this.proveedor = res
  		}, 
  		err => {
  			console.log(err)
  		})
  	}

}
