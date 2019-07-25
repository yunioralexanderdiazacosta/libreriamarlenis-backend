import { Component, OnInit } from '@angular/core';
import { VentasService } from '../../../servicios/ventas/ventas.service';

@Component({
  selector: 'app-lista-ventas',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaVentasComponent implements OnInit {
	ventas: any = []

	constructor(public ventasService: VentasService) { }

  	ngOnInit() {
  		this.listarVentas()
  	}

  	listarVentas()
  	{
  		this.ventasService.obtenerVentas().subscribe(
  			(res: any) => {
  				this.ventas = res
  			},
  			err => {
  				console.log(err)
  			}
  		)
  	}
}
