import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { CopiasService } from '../../../servicios/copias/copias.service';

@Component({
  selector: 'app-fotocopias-semana',
  templateUrl: './fotocopias-semana.component.html',
  styleUrls: ['./fotocopias-semana.component.css']
})
export class FotocopiasSemanaComponent implements OnInit {
  	/**
	* Almacena el array con las propiedades requeridas para inicializar el gráfico
	*
	*@property {Array} 
	*/
  	fotocopiasSemana = [];

    /**
    * Almacena las ultimas copias realizadas en los ultimos dias
    *
    *@property {any} 
    */
    ultimasCopias

    /**
    * Almacena las fechas de inicio
    *
    *@property {any} 
    */
    fecha: any = []

    /**
    * Almacena el total de copias exitosas
    *
    *@property {any} 
    */
    cantidadCopias: any = []

    /**
    * Almacena el total de copias danadas
    *
    *@property {any} 
    */
    cantidadDanadas: any = []

    /**
    * Contador que almacena la cantidad de copias dañadas de acuerdo a la fecha
    *
    *@property {number} 
    */
    contadorDanadas: number = 0
 	
  	constructor(public copiasService: CopiasService) { 
          this.obtenerFotocopiasSemana()
    }

  	ngOnInit() {	
  	}

    /**
    * Obtiene las fotocopias exitosas y dañadas de los ultimos dias
    *
    *@return {void} 
    */
    obtenerFotocopiasSemana()
    {
        this.copiasService.ultimasCopiasSemana().subscribe(
        res => {
            this.ultimasCopias = res
            this.ultimasCopias.filter(dato => {
                this.fecha.push(dato.fecha)
                this.cantidadCopias.push(parseInt(dato.cantidadCopias))
                this.copiasService.ultimasCopiasDanadasSemana(dato.fecha).subscribe(
                (res:any) => {
                    this.contadorDanadas = 0
                    if(res.cantidadCopias == null)
                    {
                        this.contadorDanadas = 0
                    }
                    else
                    {
                        this.contadorDanadas = this.contadorDanadas + parseInt(res.cantidadCopias)
                    }
                    this.cantidadDanadas.push(this.contadorDanadas)
                    this.grafico()
                },
                err => {
                    console.log(err)
                })
            })
        },
        err => {
            console.log(err)
        }
        )
    }

  	/**
  	* Grafico que muestra el numero de copias efectuados en la ultima semana
  	*
  	*@return {void} 
 	*/
  	grafico()
  	{
  		this.fotocopiasSemana = new Chart('fotocopiasSemana', 
	  	{
	  		type: "bar",
  			data: 
  			{
  				labels: this.fecha,
  				datasets: [
  					{ 
  						label: "Exitosas",
  						data: this.cantidadCopias,
  						backgroundColor: "rgba(130,224,170, 0.5)",
  						fill: false,
  						borderColor: "#20c998",
  						borderWidth: 1
  					},

  					{
  						label: 'Dañadas',
            			data: this.cantidadDanadas,
            			backgroundColor: "rgba(255, 99, 132, 0.2)",
                        fill: false,
            			borderColor: "rgb(255, 99, 132)",
                        borderWidth: 1
  					}
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
