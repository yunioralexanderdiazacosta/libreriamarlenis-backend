import { Component, OnInit } from '@angular/core';
import { TranscripcionesService } from '../../../../servicios/transcripciones/transcripciones.service';
import { Chart } from 'chart.js';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-transcripciones-eficiencia',
  templateUrl: './transcripciones-eficiencia.component.html',
  styleUrls: ['./transcripciones-eficiencia.component.css']
})
export class TranscripcionesEficienciaComponent implements OnInit {
    /**
    *Inicializa el grafico con cada una de sus propiedades
    *
    *@property {any}
    **/
    transcripcionesEficiencia = []

    /**
    *Almacena cada una de las transcripciones asignadas al empleado de la API
    *
    *@property {any}
    **/
    transcripciones: any = []

    /**
    * Contador de tareas cumplidas por el empleado
    *
    *@property {number}
    **/
    cumplidas: number = 0 

    /**
    * Contador de tareas no cumplidas por el empleado
    *
    *@property {number}
    **/
    noCumplidas: number = 0

    /**
    * Porcentaje de tareas cumplidas por el empleado
    *
    *@property {any}
    **/
    porcentajeCumplidas: any = 0

    /**
    * Porcentaje de tareas no cumplidas por el empleado
    *
    *@property {any}
    **/
    porcentajeNoCumplidas: any = 0
      
    constructor(
        public transcripcionesService: TranscripcionesService,
        public activatedRoute: ActivatedRoute) { 

        const params = this.activatedRoute.snapshot.params
        this.obtenerTranscripciones(params.id, params.mes)
    }

    ngOnInit() {}

    /**
    * Obtiene cada una de las transcripciones asignadas al empleado y las almacena en el arreglo
    *
    *@return {void}
    **/
    obtenerTranscripciones(id, mes)
    {
        this.transcripcionesService.obtenerTranscripcionesAsignadas(id, mes).subscribe(
        res => {
            this.transcripciones = res
            this.transcripciones.filter(dato => {
                if(dato.updated_at <= dato.fecha_entrega && dato.estatus_tarea == 1)
                {
                    this.cumplidas++
                }
                else
                {
                    this.noCumplidas++
                }
            })
            var calculoCumplidas = (this.cumplidas / this.transcripciones.length) * 100
            var calculoNoCumplidas = (this.noCumplidas / this.transcripciones.length) * 100
            this.porcentajeCumplidas = calculoCumplidas.toFixed(2)
            this.porcentajeNoCumplidas = calculoNoCumplidas.toFixed(2)
            this.grafico()
        },
        err => {
            console.log(err)
        })
    }

    /**
    * Inicializa el grafico
    *
    *@return {void}
    **/
    grafico()
    {

  	    this.transcripcionesEficiencia = new Chart('transcripcionesEficiencia', {
            type: 'pie',
            data: 
            {
                labels: ["Cumplidas", "No Cumplidas"],
                    datasets: [{
                        label: '',
                        data: [this.porcentajeCumplidas,this.porcentajeNoCumplidas],
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
