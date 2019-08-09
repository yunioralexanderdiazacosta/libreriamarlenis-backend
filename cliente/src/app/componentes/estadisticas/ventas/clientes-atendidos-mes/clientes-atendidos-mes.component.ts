import { Component, OnInit } from '@angular/core';
import { VentasService } from '../../../../servicios/ventas/ventas.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-clientes-atendidos-mes',
  templateUrl: './clientes-atendidos-mes.component.html',
  styleUrls: ['./clientes-atendidos-mes.component.css']
})
export class ClientesAtendidosMesComponent implements OnInit {
    /**
    * Contiene cada una de las propiedades para inicializar el grafico
    *
    *@property {any}
    **/
    clientesAtendidosMes = []

    /**
    * Almacena los clientes atendidos de la API
    *
    *@property {any}
    **/
    clientes

    /**
    * Almacena los meses obtenido del arreglo
    *
    *@property {any}
    **/
    mes: any = []

    /**
    * Almacena el total de clientes obtenido del arreglo
    *
    *@property {any}
    **/
    totalClientes: any = []
 
    constructor(public ventasService: VentasService) { 
        this.obtenerClientesAtendidos()
    }

    ngOnInit() {}

    /**
    * Obtiene cada uno de los clientes atendidos de la API y los almacena
    *
    *@return {void}
    **/
    obtenerClientesAtendidos()
    {
        this.ventasService.obtenerClientesAtendidosMes().subscribe(
        res => {
            this.clientes = res
            this.clientes.filter(dato => {
                this.mes.push(dato.mes)
                this.totalClientes.push(dato.totalClientes)
            })
            this.grafico()
        },
        err => {
            console.log(err)
        })
    }

    grafico()
    {
  	    this.clientesAtendidosMes = new Chart('clientesAtendidosMes', 
  		{
  			type: "line",
  			data: 
  			{
  				labels: this.mes,
  				datasets: [
  					{ 
  						label: "Total de Clientes",
  						data: this.totalClientes,
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
