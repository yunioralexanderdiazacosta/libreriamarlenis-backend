import { Component, OnInit } from '@angular/core';
import { VentasService } from '../../../servicios/ventas/ventas.service';
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
	ventasSemana = []

    /**
    * Almacena las ultimas ventas obtenidas de la API
    *
    *@property {any} 
    */    
    ultimasVentas

    /**
    * Almacena cada una de las fechas obtenidas de la API
    *
    *@property {any} 
    */
    fecha: any = []


    /**
    * Almacena el total de cada una de las ventas de la API
    *
    *@property {any} 
    */
    totalVenta: any = []

  	constructor(public ventasService: VentasService) { 
          this.obtenerUltimasVentas()
    }

  	ngOnInit() {
  	}

    /**
    * Obtiene las ultimas ventas de la API y las almacena en los arreglos correspondientes
    *
    *@return {void} 
    */
    obtenerUltimasVentas()
    {
        this.ventasService.ultimasVentasSemana().subscribe(
        res => {
            this.ultimasVentas = res
            this.ultimasVentas.filter(dato => {
                this.fecha.push(dato.fecha)
                this.totalVenta.push(parseInt(dato.totalVenta))
            })
            this.grafico()
        }, 
        err => {
            console.log(err)
        })
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
  				labels: this.fecha,
  				datasets: [
  					{ 
  						label: "Total de Ingresos",
  						data: this.totalVenta,
  						backgroundColor: "rgba(130,224,170, 0.5)",
  						fill:false,
  						borderColor: "#20c998",
  						borderWidth: 1
  					},
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
