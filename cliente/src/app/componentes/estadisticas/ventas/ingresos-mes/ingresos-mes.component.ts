import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { VentasService } from '../../../../servicios/ventas/ventas.service';

@Component({
  selector: 'app-ingresos-mes-ventas',
  templateUrl: './ingresos-mes.component.html',
  styleUrls: ['./ingresos-mes.component.css']
})
export class IngresosMesVentasComponent implements OnInit {  
    /**
  	* Almacena el array con las propiedades requeridas para inicializar el gráfico
  	*
  	*@property {any} 
  	*/
    ingresosMes= []

    /**
    * Obtiene cada una de las ventas de la API por mes de la API
    *
    *@property {any} 
    */
    ventas

    /**
    * Almacena cada uno de los meses del arreglo
    *
    *@property {any}
    **/
    mes: any = []

    /**
    * Almacena los montos total de cada una de las ventas del arreglo
    *
    *@property {any}
    **/
    totalVenta: any = []

	constructor(public ventasService: VentasService) { 
        this.obtenerVentas()
    }

  	ngOnInit() {
  	}


    /**
    * Obtiene las ventas por mes de la API y las almacena en un arreglo 
    *
    *@return {void} 
    **/
    obtenerVentas()
    {
        this.ventasService.obtenerVentasPorMes().subscribe(
        res => {
            this.ventas = res
            this.ventas.filter(dato => {
                this.mes.push(dato.mes),
                this.totalVenta.push(parseInt(dato.totalVenta))
            })
            this.grafico()
        },
        err => {
            console.log(err)
        })
    }

  	/**
  	* Grafico que muestra el total de ventas y compras por mes de acuerdo al año en curso  
  	*
  	*@return {void} 
 	**/
  	grafico()
  	{
         
  		this.ingresosMes = new Chart('ingresosMes', 
  		{
  			type: "bar",
  			data: 
  			{
  				labels: this.mes,
  				datasets: [
  					{ 
  						label: "Total de Ingresos",
  						data: this.totalVenta,
  						backgroundColor: "rgba(130,224,170, 0.5)",
  						fill:false,
  						borderColor: "#20c998",
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
