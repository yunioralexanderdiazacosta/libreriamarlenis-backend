import { Component, OnInit } from '@angular/core';
import {  Chart } from 'chart.js';

@Component({
  selector: 'app-ventas-semana',
  templateUrl: './ventas-semana.component.html',
  styleUrls: ['./ventas-semana.component.css']
})
export class VentasSemanaComponent implements OnInit {
  	/**
  	* Almacena el array con las propiedades requeridas para inicializar el gráfico
  	*
  	*@property {Array} 
  	*/
	  ventasSemana = [];

  	constructor() { }

  	ngOnInit() {
  		this.grafico();
  	}

    /**
    * Grafico que muestra las ventas realizadas en la ultima semana 
    *
    *@return {void} 
    */
  	grafico()
  	{
  		this.ventasSemana = new Chart('ventasSemana', 
	  	{
	  		type: "bar",
  			data: 
  			{
  				labels: ["02-07-2019","03-07-2019","04-07-2019","05-07-2019", "08-07-2019"],
  				datasets: [
  					{ 
  						label: "Total de Ingresos",
  						data:[10000,30000,15000,12000,45000],
  						backgroundColor: "rgba(130,224,170, 0.5)",
  						fill:false,
  						borderColor: "#20c998",
  						borderWidth: 1
  					},

  					{
  						label: 'Total de Productos',
            			data: [20, 10, 20, 40, 20],
            			backgroundColor: "rgba(86, 101, 115, 0.5)",
            			borderColor: "#6c757d",
            			type: 'line'
  					}
  				]
  			},
  			options:{
  				tooltips: 
  				{
                    intersect: false,
                    titleFontSize: 15,
                    bodyFontSize: 15
                },

  				scales:
				{
					yAxes:[{
						ticks:{ beginAtZero: true }
					}]
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
