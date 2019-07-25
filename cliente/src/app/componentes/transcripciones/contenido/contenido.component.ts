import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-contenido',
  templateUrl: './contenido.component.html',
  styleUrls: ['./contenido.component.css']
})
export class ContenidoComponent implements OnInit {
	/*
	* Almacena el contenido a investigar obtenido de  la vista de edicion
	*
	*@property {string}
	*/
	@Input('contenido') contenido: string
	constructor() { }

  	ngOnInit() {
  	}

}
