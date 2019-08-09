import { Component, OnInit } from '@angular/core';
import { ComprasService } from '../../../../servicios/compras/compras.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-compras-mes',
  templateUrl: './compras-mes.component.html',
  styleUrls: ['./compras-mes.component.css']
})
export class ComprasMesComponent implements OnInit {
	 /**
  	* Almacena el array con las propiedades requeridas para inicializar el gráfico
  	*
  	*@property {any} 
  	*/
    comprasMes= []

    /**
    * Obtiene cada una de las compras de la API por mes de la API
    *
    *@property {any} 
    */
    compras

    /**
    * Almacena cada uno de los meses del arreglo
    *
    *@property {any}
    **/
    mes: any = []

    /**
    * Almacena los montos total de cada una de las compras del arreglo
    *
    *@property {any}
    **/
    totalCompra: any = []


	constructor(public comprasService: ComprasService) {
		this.obtenerCompras()
	}

  	ngOnInit() {
  	}

  	/**
    * Obtiene las compras por mes de la API y las almacena en un arreglo 
    *
    *@return {void} 
    **/
    obtenerCompras()
    {
        this.comprasService.obtenerComprasPorMes().subscribe(
        res => {
            this.compras = res
            this.compras.filter(dato => {
                this.mes.push(dato.mes),
                this.totalCompra.push(parseInt(dato.totalCompra))
            })
            this.grafico()
        },
        err => {
            console.log(err)
        })
    }

  	grafico()
  	{
  		this.comprasMes = new Chart('comprasMes', 
  		{
  			type: "bar",
  			data: 
  			{
  				labels: this.mes,
  				datasets: [
  					{
					  label: "Total de Compras",
					  data: this.totalCompra,
					  backgroundColor: "rgba(255, 99, 132, 0.2)",
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