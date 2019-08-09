import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../../../servicios/productos/productos.service';
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
	productosMasVendidos = []

	productos
	
	nombreProductos: any = []

	data: any = []



	constructor(public productosService: ProductosService) { 
		this.obtenerProductosMasVendidos()
	}

	ngOnInit() {
	}


	obtenerProductosMasVendidos()
	{
		this.productosService.obtenerProductosMasVendidos().subscribe(
		res => {
			this.productos = res
			this.productos.filter(dato => {
				this.nombreProductos.push(dato.producto.nombre)
				this.data.push(parseInt(dato.cantidadProductos))
			})
			this.grafico()
		},
		err => {
			console.log(err)
		}
		)
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
				labels: this.nombreProductos,
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
