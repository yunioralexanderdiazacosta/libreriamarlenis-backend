import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ProductosService } from '../../../../servicios/productos/productos.service';

@Component({
	selector: 'app-productos-mes-ventas',
	templateUrl: './productos-mes.component.html',
	styleUrls: ['./productos-mes.component.css']
})
export class ProductosMesVentasComponent implements OnInit {
	/**
	* Almacena el array con las propiedades requeridas para inicializar el gráfico
	*
	*@property {Array} 
	*/
	ingresosProductos = []

	/**
	* Almacena la cantidad de productos vendidos por mes
	*
	*@property {any} 
	*/
	productos

	/**
	* Almacena cada uno de los meses del arreglo
	*
	*@property {any} 
	*/
	mes: any = []

	/**
	* Almacena el total de productos del arreglo
	*
	*@property {any} 
	**/
	totalProductos: any = []

	constructor(public productosService: ProductosService) { 
		this.obtenerProductosMes()
	}

	ngOnInit() {}

	/**
	* Obtiene los productos de la API y los almacena en el arreglo
	*
	*@return {void}
	**/
	obtenerProductosMes()
	{
		this.productosService.obtenerProductosVendidosMes().subscribe(
		res => {
			this.productos = res
			this.productos.filter(dato => {
				this.mes.push(dato.mes)
				this.totalProductos.push(parseInt(dato.totalProductos))
			})
			this.grafico()
		},
		err => {
			console.log(err)
		})
	}

	/**
	* Grafico que muestra el total de productos vendidos por mes de acuerdo al año en curso  
	*
	*@return {void} 
	*/
	grafico()
	{
		this.ingresosProductos = new Chart('ingresosProductos', 
		{
			type: "line",
			data: 
			{
				labels: this.mes,
				datasets: [
					{ 
						label: "Total de Productos",
						data: this.totalProductos,
						fill:false,
						backgroundColor: "rgba(130,224,170, 0.5)",
						borderColor: "#20c998",
						lineTension: 0.1
					}
				]
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
