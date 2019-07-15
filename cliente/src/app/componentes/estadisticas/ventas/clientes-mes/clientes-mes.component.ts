import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-clientes-mes-ventas',
  templateUrl: './clientes-mes.component.html',
  styleUrls: ['./clientes-mes.component.css']
})
export class ClientesMesVentasComponent implements OnInit {
	clientesMes = [];
	constructor() { }

  	ngOnInit() {
  		this.grafico();
  	}


  	grafico()
  	{
        this.clientesMes = new Chart('clientesMes', 
        {
  		    type: "polarArea",
            data: 
            {
                labels: ["V-23895594 - Juan Rodriguez","V-22720255 Pedro Jimenez","V-21010122 - Luis Sanchez","V-21241001 Pedro Martinez", "V-11011912 Pablo Escobar"],
                datasets: [{
                    label: "My First Dataset",
                    data: [12,16,7,3,14],
                    backgroundColor: ["rgb(255, 99, 132)","rgb(75, 192, 192)","rgb(255, 205, 86)","rgb(201, 203, 207)","rgb(54, 162, 235)"
                    ]
                }]
            },
            options:
            {
                tooltips: 
                {
                    intersect: false,
                    titleFontSize: 16,
                    bodyFontSize: 16
                },

                legend: {
                    display: true,
                    labels: {
                      fontSize:16
                    }
                },
            } 
        })
    }
}
