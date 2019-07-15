import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-fotocopias-semana',
  templateUrl: './fotocopias-semana.component.html',
  styleUrls: ['./fotocopias-semana.component.css']
})
export class FotocopiasSemanaComponent implements OnInit {
  	/**
	* Almacena el array con las propiedades requeridas para inicializar el gráfico
	*
	*@property {Array} 
	*/
  	fotocopiasSemana = [];
  	
  	constructor() { }

  	ngOnInit() {
  		this.grafico();
  	}

  	/**
  	* Grafico que muestra el numero de copias efectuados en la ultima semana
  	*
  	*@return {void} 
 	*/
  	grafico()
  	{
  		this.fotocopiasSemana = new Chart('fotocopiasSemana', 
	  	{
	  		type: "bar",
  			data: 
  			{
  				labels: ["02-07-2019","03-07-2019","04-07-2019","05-07-2019", "08-07-2019"],
  				datasets: [
  					{ 
  						label: "Exitosas",
  						data:[45,12,34,34,45],
  						backgroundColor: "rgba(130,224,170, 0.5)",
  						fill:false,
  						borderColor: "#20c998",
  						borderWidth: 1
  					},

  					{
  						label: 'Dañadas',
            			data: [1, 5, 0, 1, 0],
            			backgroundColor: "rgba(255, 99, 132, 0.2)",
            			borderColor: "rgb(255, 99, 132)",
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
