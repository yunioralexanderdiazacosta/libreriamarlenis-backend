import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-ingresos-mes-ventas',
  templateUrl: './ingresos-mes.component.html',
  styleUrls: ['./ingresos-mes.component.css']
})
export class IngresosMesVentasComponent implements OnInit {  
    /**
  	* Almacena el array con las propiedades requeridas para inicializar el gráfico
  	*
  	*@property {Array} 
  	*/
    ingresosMes= [];

	constructor() { }

  	ngOnInit() {
  		this.grafico();
  	}

  	/**
  	* Grafico que muestra el total de ventas y compras por mes de acuerdo al año en curso  
  	*
  	*@return {void} 
 	  */
  	grafico()
  	{
         
  		this.ingresosMes = new Chart('ingresosMes', 
  		{
  			type: "bar",
  			data: 
  			{
  				labels: ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio"],
  				datasets: [
  					{ 
  						label: "Total de Ingresos",
  						data:[235000,437910,510233,718000,810112,1500155,2891000],
  						backgroundColor: "rgba(130,224,170, 0.5)",
  						fill:false,
  						borderColor: "#20c998",
  						borderWidth: 1
  					},

            {
              label: "Total de Compras",
              data: [110000,235000,315000,357000,461300,599671, 1030711],
              backgrounColor: "rgba(255, 99, 132, 0.2)",
              fill: false,
              borderColor: "rgb(255, 99, 132)",
              borderWidth: 1
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
