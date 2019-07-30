import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-reportes-seleccion',
  templateUrl: './seleccion.component.html',
  styleUrls: ['./seleccion.component.css']
})
export class ReportesSeleccionComponent implements OnInit {
	formReporte: FormGroup
	input_required: string = 'Este campo no puede estar vacío'
    hoy: any

	constructor(
		public fb: FormBuilder,
		public router: Router) { 
		this.formReporte = this.fb.group({
			tipo: ['', Validators.required],
			desde: ['', Validators.required],
			hasta: ['', Validators.required]
		})
	}

  	ngOnInit() {
        var fecha = new Date()
        this.hoy = moment(fecha).format("YYYY-MM-DD")
  	}

    obtenerTipo(tipo)
    {
        const desde = this.formReporte.get('desde')
        const hasta = this.formReporte.get('hasta')

        if(tipo == '4')
        {
            
            desde.setValidators(null)
            hasta.setValidators(null)
        }
        else
        {
            desde.setValidators(Validators.required)
            hasta.setValidators(Validators.required)
        }
        
        desde.updateValueAndValidity()
        hasta.updateValueAndValidity()
    }

  	get f(){ return  this.formReporte.controls }

  	verReporte()
  	{
  		if(this.formReporte.invalid){ return }

        if(this.formReporte.value.tipo == 1)
        {
            this.router.navigate(['/reportes/ventas', this.formReporte.value.desde, this.formReporte.value.hasta])
        }

  		if(this.formReporte.value.tipo == 2)
  		{
  			this.router.navigate(['/reportes/compras', this.formReporte.value.desde, this.formReporte.value.hasta])
  		}

        if(this.formReporte.value.tipo == 3)
        {
            this.router.navigate(['/reportes/fotocopias', this.formReporte.value.desde, this.formReporte.value.hasta])
        }
        if(this.formReporte.value.tipo == 4)
        {
            this.router.navigate(['/reportes/inventario'])
        }
  	}

}
