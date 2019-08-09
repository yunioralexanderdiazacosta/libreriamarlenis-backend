import { Component, OnInit } from '@angular/core';
import { TranscripcionesService } from '../../../../servicios/transcripciones/transcripciones.service';
import { Chart } from 'chart.js';
import { ActivatedRoute } from '@angular/router';

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
    transcripcionesMedicion = []

    transcripciones: any = []

    realizadas: number = 0

    noRealizadas: number = 0

    porcentajeRealizadas: any = 0
    porcentajeNoRealizadas: any = 0

	constructor(
        public transcripcionesService: TranscripcionesService,
        public activatedRoute: ActivatedRoute) { 
        const params = this.activatedRoute.snapshot.params
        this.obtenerTranscripcionesEmpleado(params.id, params.mes)
    }

  	ngOnInit() {}

    obtenerTranscripcionesEmpleado(id, mes){
        this.transcripcionesService.obtenerTranscripcionesAsignadas(id, mes).subscribe(
        res => {
            this.transcripciones = res
            this.transcripciones.filter(dato => {
                dato.estatus_tarea == 1 ? this.realizadas++ : this.noRealizadas++
            })
            
            var calculoRealizadas = (this.realizadas / this.transcripciones.length) * 100
            var calculoNoRealizadas = (this.noRealizadas / this.transcripciones.length) * 100

            this.porcentajeRealizadas = calculoRealizadas.toFixed(2)
            this.porcentajeNoRealizadas = calculoNoRealizadas.toFixed(2)   
            this.grafico()        
        }, 
        err => {
            console.log(err)
        })
    }

    /**
  	* Grafico comparativo entre la cantidad de transcripciones asignadas al empleados vs las cumplidas  
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
                        data: [this.porcentajeRealizadas, this.porcentajeNoRealizadas],
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
