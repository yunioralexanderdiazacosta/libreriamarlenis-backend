import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-ventas',
	templateUrl: './ventas.component.html',
  	styleUrls: ['./ventas.component.css']
})
export class EstadisticasVentasComponent implements OnInit {
	/**
	* Año actual
	*
	*@property {any}
	**/
	ano

  	constructor() { 
  		const hoy = new Date()
  		this.ano = hoy.getFullYear()
  	}

  	ngOnInit() {
  	}
}
