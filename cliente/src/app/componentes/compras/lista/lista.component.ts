import { Component, OnInit } from '@angular/core';
import { ComprasService } from '../../../servicios/compras/compras.service';

@Component({
  selector: 'app-lista-compras',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComprasComponent implements OnInit {
    compras: any = []

	constructor(public comprasService: ComprasService) { }

  	ngOnInit() {
  		this.listarCompras()
  	}

  	listarCompras()
  	{
  		this.comprasService.obtenerComprasApi().subscribe(
  		res => {
  			this.compras = res
  		},
  		err => {
  			console.log(err)
  		})
  	}
}
