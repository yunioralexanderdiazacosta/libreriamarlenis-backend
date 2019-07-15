import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-productos-categorias-mes',
  templateUrl: './productos-categorias-mes.component.html',
  styleUrls: ['./productos-categorias-mes.component.css']
})
export class ProductosCategoriasMesComponent implements OnInit {
    /**
	* Almacena el array con las propiedades requeridas para inicializar el gráfico
	*
	*@property {Array} 
	*/
	productosCategoriasMes = []; 
	data: any = [491,119,27];

	constructor() { }

	/**
	* Grafico que muestra las categorias de productos vendidos por mes 
	*
	*@return {void} 
	*/
	ngOnInit() {
		this.grafico();
	}

	grafico()
	{
		var ict_unit = [];
		var efficiency = [];
		var coloR = [];

		var dynamicColors = function() {
			var r = Math.floor(Math.random() * 255);
			var g = Math.floor(Math.random() * 255);
			var b = Math.floor(Math.random() * 255);
			return "rgb(" + r + "," + g + "," + b + ")";
		};

		for (var i in this.data) {
			ict_unit.push("ICT Unit " + this.data[i].ict_unit);
			efficiency.push(this.data[i].efficiency);
			coloR.push(dynamicColors());
		}

		this.productosCategoriasMes = new Chart('productosCategoriasMes', 
		{
			type: "doughnut",
			data: 
			{
				labels: ["Utiles Escolares","Libros","Papeleria"],
				datasets:[{
					label:"Productos más vendidos",
					backgroundColor: coloR,
					data: this.data
				}]
			},
			options: 
			{
				tooltips: 
				{
					intersect: false,
					titleFontSize: 15,
					bodyFontSize: 15
				},
							
				legend: {
					display: true,
					labels: {
						fontSize:15
					}
				},
			}
		})
	}

}
