import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-transcripciones-eficiencia',
  templateUrl: './transcripciones-eficiencia.component.html',
  styleUrls: ['./transcripciones-eficiencia.component.css']
})
export class TranscripcionesEficienciaComponent implements OnInit {
  transcripcionesEficiencia = [];
  constructor() { }

  ngOnInit() {
  	this.grafico();
  }

  grafico()
  {

  	this.transcripcionesEficiencia = new Chart('transcripcionesEficiencia', {
            type: 'pie',
            data: 
            {
                labels: ["Cumplidas", "No Cumplidas"],
                    datasets: [{
                        label: '',
                        data: [56,44],
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
