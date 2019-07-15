import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
	selector: 'app-productos-mas-vendidos',
	templateUrl: './productos-mas-vendidos.component.html',
	styleUrls: ['./productos-mas-vendidos.component.css']
})
export class ProductosMasVendidosComponent implements OnInit {
	/**
	* Almacena el array con las propiedades requeridas para inicializar el gráfico
	*
	*@property {Array} 
	*/
	productosMasVendidos = []; 
	data: any = [78,56,36,23,18];

	constructor() { }

	ngOnInit() {
		this.grafico();
	}

	/**
	* Grafico que muestra los productos mas vendidos 
	*
	*@return {void} 
	*/
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

		this.productosMasVendidos = new Chart('productosMasVendidos', 
		{
			type: "doughnut",
			data: 
			{
				labels: [
					"Portaminas Paper Mate",
					"Colores De Madera Kores Hexagonal",
					"Cuaderno College Caligrafía Horizontal Artel",
					"Libro de Ciencias Naturales",
					"El coronel no tiene quien le escriba"],
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
