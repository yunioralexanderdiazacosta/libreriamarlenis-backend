import { Component, OnInit } from '@angular/core';
import { VentasService } from '../../../../servicios/ventas/ventas.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-clientes-mes-ventas',
  templateUrl: './clientes-mes.component.html',
  styleUrls: ['./clientes-mes.component.css']
})
export class ClientesMesVentasComponent implements OnInit {
	clientesMes = [];

    clientes

    datosClientes: any = []

    totalAtencion: any = []


	constructor(public ventasService: VentasService) { 
        this.listarClientesFrecuentes()
    }

  	ngOnInit() {}

    listarClientesFrecuentes()
    {
        this.ventasService.obtenerClientesFrecuentes().subscribe(
        res => {
            this.clientes = res
            this.clientes.filter(dato => {
            var cliente = dato.cliente.cedula+" - "+dato.cliente.nombres +" "+dato.cliente.apellidos
                this.datosClientes.push(cliente)
                this.totalAtencion.push(parseInt(dato.totalAtencion))
            })
            this.grafico()
        },
        err => {
            console.log(err)
        })
    }

  	grafico()
  	{
        this.clientesMes = new Chart('clientesMes', 
        {
  		    type: "polarArea",
            data: 
            {
                labels: this.datosClientes,
                datasets: [{
                    label: "Total de Atenciones",
                    data: this.totalAtencion,
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
