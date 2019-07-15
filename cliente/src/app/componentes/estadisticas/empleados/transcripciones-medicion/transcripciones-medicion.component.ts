import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-transcripciones-medicion',
  templateUrl: './transcripciones-medicion.component.html',
  styleUrls: ['./transcripciones-medicion.component.css']
})
export class TranscripcionesMedicionComponent implements OnInit {
	/**
  	* Almacena el array con las propiedades requeridas para inicializar el gráfico
  	*
  	*@property {Array} 
  	*/
    transcripcionesMedicion = [];
	constructor() { }

  	ngOnInit() {
  		this.grafico();
  	}

    /**
  	* Grafico comparativo entre la cantidad de transcripciones asignados al empleados vs las cumplidas  
  	*
  	*@return {void} 
 	*/
  	grafico()
  	{
  		this.transcripcionesMedicion = new Chart('transcripcionesMedicion', {
            type: 'pie',
            data: 
            {
                labels: ["Realizadas", "No Realizadas"],
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
