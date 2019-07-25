import { Component, OnInit } from '@angular/core';
import { ProveedoresService } from '../../../../servicios/proveedores/proveedores.service';

@Component({
  selector: 'app-lista-proveedores',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaProveedoresComponent implements OnInit {
	proveedores: any = [];
  	
  	constructor(
  		public proveedoresService: ProveedoresService
  		) { }

  	ngOnInit() {
  		this.listarproveedores()
  	}

  	listarproveedores()
  	{
  		this.proveedoresService.obtenerProveedores().subscribe(
  		res => {
  			this.proveedores = res
  		},
  		err => {
  			console.log(err)
  		})
  	}
}
