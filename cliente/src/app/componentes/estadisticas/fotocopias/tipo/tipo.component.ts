import { Component, OnInit } from '@angular/core';
import { CopiasService } from '../../../../servicios/copias/copias.service';
import { Chart } from 'chart.js';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-estadistica-fotocopias-tipo',
  templateUrl: './tipo.component.html',
  styleUrls: ['./tipo.component.css']
})
export class EstadisticaFotocopiasTipoComponent implements OnInit {
  	/**
  	* Almacena el array con las propiedades requeridas para inicializar el gráfico
  	*
  	*@property {Array} 
  	*/
    totalFotocopiasTipo = []

    /**
    * Almacena la cantidad de copias de las categorias correspondientes de la API
    *
    *@property {any} 
    */
    copias

    /**
    * Almacena los nombres de las copias
    *
    *@property {any} 
    */
    copiasNombre: any = []

    /**
    * Almacena la cantidad de cada una de las categorias encontradas
    *
    *@property {any} 
    */
    data: any = []

	  constructor(
          public copiasService: CopiasService,
          public activatedRoute: ActivatedRoute) { 

          const params = this.activatedRoute.snapshot.params
          this.obtenerFotocopiasCategorias(params.mes)
      }

  	ngOnInit() {}

    obtenerFotocopiasCategorias(mes)
    {
        this.copiasService.obtenerFotocopiasEfectuadasCategoriasMes(mes).subscribe(
        res => {
            this.copias = res
            this.copias.filter(dato => {
                this.copiasNombre.push(dato.tipos_copia.descripcion)
                this.data.push(parseInt(dato.cantidadCopias))
            })
            this.grafico()
        },
        err => {
             console.log(err)
        })
    }
    /**
  	* Grafico que muestra el total de copias realizadas por tipo 
  	*
  	*@return {void} 
 	  */
  	grafico()
  	{
  		var ict_unit = [];
	    var efficiency = [];
	    var coloR = [];

  		var dynamicColors = function() {
            var r = Math.floor(Math.random() * 255);
            var g = Math.floor(Math.random() * 255);
            var b = Math.floor(Math.random() * 255);
            return "rgb(" + r + "," + g + "," + b + ")";
        };

        for (var i in this.data) {
            ict_unit.push("ICT Unit " + this.data[i].ict_unit);
            efficiency.push(this.data[i].efficiency);
            coloR.push(dynamicColors());
        }

  		this.totalFotocopiasTipo = new Chart('totalFotocopiasTipo', 
  		{
  			type: "doughnut",
  			data: 
  			{
  				labels: this.copiasNombre,
  				datasets:[{
  					label:"Productos más vendidos",
  					backgroundColor: coloR,
  					data: this.data
  				}]
  			},
  			options: 
            {
  				 tooltips: {
                    intersect: false,
                    titleFontSize: 18,
                    bodyFontSize: 18
                },
                legend: {
                    display: true,
                    labels: {
                      fontSize:18
                    }
                },
            }
  		})
  	}

}
