import { Component, OnInit } from '@angular/core';
import { ReportesService } from '../../../servicios/reportes/reportes.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-fotocopias',
  templateUrl: './fotocopias.component.html',
  styleUrls: ['./fotocopias.component.css']
})
export class ReporteFotocopiasComponent implements OnInit {
	
	desde
	hasta
	copias: any = []

	totalCopias: number = 0
	totalMonto: number = 0
	constructor(
	  	public reportesService: ReportesService,
	  	public activatedRoute: ActivatedRoute,
	  	public router: Router) 
	{ 
		this.desde = this.activatedRoute.snapshot.params.desde
		this.hasta = this.activatedRoute.snapshot.params.hasta

		if(this.desde && this.hasta)
		{
			this.reportesService.listarCopias(this.desde, this.hasta).subscribe(
			res => {
				this.copias = res
				this.copias.filter(dato => {
					this.totalCopias = this.totalCopias + parseInt(dato.cantidadCopias)
					this.totalMonto =  this.totalMonto + parseInt(dato.montoCopias)
				})
			}, 
			err => {
				console.log(err)
			})
		}
  	}

  ngOnInit() {
  }

}
