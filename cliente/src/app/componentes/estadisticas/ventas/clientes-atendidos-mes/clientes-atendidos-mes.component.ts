import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-clientes-atendidos-mes',
  templateUrl: './clientes-atendidos-mes.component.html',
  styleUrls: ['./clientes-atendidos-mes.component.css']
})
export class ClientesAtendidosMesComponent implements OnInit {
  clientesAtendidosMes = [];
 
  constructor() { }

  ngOnInit() {
  	this.grafico();
  }

  grafico()
  {
  	this.clientesAtendidosMes = new Chart('clientesAtendidosMes', 
  		{
  			type: "line",
  			data: 
  			{
  				labels: ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio"],
  				datasets: [
  					{ 
  						label: "Total de Clientes",
  						data:[56,32,27,33,44,32,56],
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
