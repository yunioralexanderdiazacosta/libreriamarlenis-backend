import { Component, OnInit } from '@angular/core';
import {  ClientesService } from '../../../servicios/clientes/clientes.service';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaClientesComponent implements OnInit {
	clientes;

	constructor(public clientesService: ClientesService) { }

  	ngOnInit() {
  		this.obtenerClientes();
  	}

  	obtenerClientes()
  	{
  		this.clientesService.obtenerClientes().subscribe(
  			res => {
  				this.clientes = res;
  			},
  			err => {
  				console.log(err)
  			}
  		)
  	}

}
