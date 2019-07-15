import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-estadistica-fotocopias-tipo',
  templateUrl: './tipo.component.html',
  styleUrls: ['./tipo.component.css']
})
export class EstadisticaFotocopiasTipoComponent implements OnInit {
  	/**
  	* Almacena el array con las propiedades requeridas para inicializar el gráfico
  	*
  	*@property {Array} 
  	*/
    totalFotocopiasTipo = [];

    data: any = [491,119,30,11];

	  constructor() { }

  	ngOnInit() {
  		this.grafico();
  	}

    /**
  	* Grafico que muestra el total de copias realizadas por tipo 
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

  		this.totalFotocopiasTipo = new Chart('totalFotocopiasTipo', 
  		{
  			type: "doughnut",
  			data: 
  			{
  				labels: ["Carta","Oficio","Ampliación / Reducción","Reciclaje"],
  				datasets:[{
  					label:"Productos más vendidos",
  					backgroundColor: coloR,
  					data: this.data
  				}]
  			},
  			options: 
            {
  				 tooltips: {
                    intersect: false,
                    titleFontSize: 18,
                    bodyFontSize: 18
                },
                legend: {
                    display: true,
                    labels: {
                      fontSize:18
                    }
                },
            }
  		})
  	}

}
