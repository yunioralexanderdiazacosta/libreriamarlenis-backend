import { Component, OnInit, Input } from '@angular/core';
import { CopiasService } from '../../../../servicios/copias/copias.service';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-estadistica-comp-fotocopias',
  templateUrl: './comp.component.html',
  styleUrls: ['./comp.component.css']
})
export class EstadisticaCompFotocopiasComponent implements OnInit {
    /**
    * Almacena las copias obtenidas de la API
    *
    *@property {any}
    **/
    copias

	/**
    *Almacena las fotocopias exitosas obtenidas del componente padre
    *
    *@property {number}
    **/
    fotocopiasExitosas: number = 0

    /**
    *Almacena las fotocopias dañadas obtenidas del componente padre
    *
    *@property {number}
    **/
    fotocopiasDanadas: number = 0

    /**
    *Almacena el total de fotocopias efectuadas obtenidas del componente padre
    *
    *@property {number}
    **/
    fotocopiasEfectuadas: number = 0
  
    /**
    * Almacena las propiedades del grafico
    *
    *@property {any}
    **/
    comparacionFotocopias = []

    /**
    * Almacena el porcentaje de fotocopias exitosas
    *
    *@property {any}
    **/
    porcentajeExitosas: any = 0

    /**
    * Almacena el porcentaje de fotocopias dañadas
    *
    *@property {any}
    **/
    porcentajeDanadas: any = 0

	constructor(
        public copiasService: CopiasService,
        public activatedRoute: ActivatedRoute) { 

        const params = this.activatedRoute.snapshot.params
        this.obtenerFotocopiasEfectuadas(params.mes)
    }

  	ngOnInit() {
           
  	}

    obtenerFotocopiasEfectuadas(mes)
    {
        this.copiasService.obtenerFotocopiasEfectuadasMes(mes).subscribe(
        res => {
            this.copias = res
            this.copias.filter(dato => {
                this.fotocopiasExitosas = this.fotocopiasExitosas + parseInt(dato.cantidad)
            })
            this.copiasService.obtenerCopiasDanadasMes(mes).subscribe(
            (res:any) => {
                if(res.cantidadCopias != null)
                {
                    this.fotocopiasDanadas = parseInt(res.cantidadCopias)
                }
                this.fotocopiasEfectuadas = this.fotocopiasExitosas + this.fotocopiasDanadas
          
                var calculoexitosas = (this.fotocopiasExitosas / this.fotocopiasEfectuadas) * 100
                var calculodanadas = (this.fotocopiasDanadas / this.fotocopiasEfectuadas) * 100
                this.porcentajeExitosas = calculoexitosas.toFixed(2)
                this.porcentajeDanadas = calculodanadas.toFixed(2)
                this.grafico()
              },
              err => {
                  console.log(err)
              })
          },
          err => {
              console.log(err)
          })
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
                        data: [this.porcentajeExitosas,this.porcentajeDanadas],
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
