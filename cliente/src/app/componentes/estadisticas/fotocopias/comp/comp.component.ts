import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-estadistica-comp-fotocopias',
  templateUrl: './comp.component.html',
  styleUrls: ['./comp.component.css']
})
export class EstadisticaCompFotocopiasComponent implements OnInit {
	comparacionFotocopias = [];
	constructor() { }

  	ngOnInit() {
  		this.grafico();
  	}

  	grafico()
  	{
  		this.comparacionFotocopias = new Chart('comparacionFotocopias', {
            type: 'pie',
            data: 
            {
                labels: ["Copias Exitosas", "Copias Dañadas"],
                    datasets: [{
                        label: '',
                        data: [90,10],
                        backgroundColor: [
                            '#20c997',
                            '#fa5858'
                        ],
                        borderColor: [
                            '#20c997',
                            '#fa5858'
                        ],
                        borderWidth: 1
                    }]
            }, 
            options: {
                tooltips: {
                    intersect: false,
                    titleFontSize: 18,
                    bodyFontSize: 18,
                    callbacks: {
                        label: function(tooltipItem, data) {
                        return data['labels'][tooltipItem['index']] + ': ' + data['datasets'][0]['data'][tooltipItem['index']] + '%';
                        }
                    }
                },

                legend: {
                    display: true,
                    labels: {
                      fontSize:18
                    }
                },
            }
        });
  	}
}
