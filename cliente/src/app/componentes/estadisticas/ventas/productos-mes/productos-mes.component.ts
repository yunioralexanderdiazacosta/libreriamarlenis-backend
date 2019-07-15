import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

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
  	ingresosProductos = [];

	constructor() { }

  	ngOnInit() {
  		this.grafico();
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
  				labels: ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio"],
  				datasets: [
  					{ 
  						label: "Total de Productos",
  						data:[56,94,96,56,99,114,121],
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
