import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuariosService } from '../../../servicios/usuarios/usuarios.service';
import { meses } from '../../../_datos/meses';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seleccion',
  templateUrl: './seleccion.component.html',
  styleUrls: ['./seleccion.component.css']
})
export class EstadisticasSeleccionComponent implements OnInit {
	/**
	*Almacena los datos del formulario
	*
	*@property {FormGroup}
	**/
	formulario: FormGroup

	/**
	* Activa o desactiva los datos del formulario
	*
	*@property {boolean}
	**/
	submitted: boolean = false

	/**
	* Año actual
	*
	*@property {any}
	**/
	ano

    /**
    *Almacena cada uno de los empleados obtenidos de la API
    *
    *@property {any}
    **/
    empleados

    /**
    *Almacena cada uno de los meses del arreglo
    *
    *@property {any}
    **/
    meses

    /**
    *Almacena el mes actual
    *
    *@property {any}
    **/
    mesActual

  	constructor(
  		public fb: FormBuilder,
  		public router: Router,
        public usuariosService: UsuariosService) { 

        const hoy = new Date()
        this.ano = hoy.getFullYear()
        this.mesActual = hoy.getMonth() + 1
  		this.formulario = this.fb.group({
  			consulta: ['', Validators.required],
            empleado: [null],
            mes: [this.mesActual]
  		})

        this.meses = meses
        this.obtenerUsuarios()
  	}

  	ngOnInit() {
  	}

  	/**
  	*Accede a cada uno de los elementos del formulario
  	*
  	*@return {Object}
  	**/
  	get f(){ return this.formulario.controls }

    obtenerUsuarios()
    {
        this.usuariosService.obtenerUsuarios().subscribe(
        res => {
            this.empleados = res
        },
        err => {
            console.log(err)
        }
        )
    }

    opcionSeleccionada(id)
    {
        const empleado = this.formulario.get('empleado')
        const mes = this.formulario.get('mes')
        id == 2 
        ? empleado.setValidators(Validators.required)
        : empleado.setValidators(null)
        id >= 2
        ? mes.setValidators(Validators.required)
        : mes.setValidators(null)

        empleado.updateValueAndValidity()
        mes.updateValueAndValidity()
    }

  	/**
  	*Accede a la acción correspondiente
  	*
  	*@return {void}
  	**/
  	procesarPeticion()
  	{
  		this.submitted = true
  		if(this.formulario.invalid){ return }
  		if(this.formulario.value.consulta == 1)
  		{
  			this.router.navigate(['/estadisticas/ventas'])
  		}

        if(this.formulario.value.consulta == 2)
        {
            this.router.navigate([`/estadisticas/empleados/${this.formulario.value.empleado}/mes/${this.formulario.value.mes}`])
        }

        if(this.formulario.value.consulta == 3)
        {
            this.router.navigate([`/estadisticas/fotocopias/${this.formulario.value.mes}`])
        }
  	}

}
