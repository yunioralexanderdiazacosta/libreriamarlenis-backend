import { Component, OnInit } from '@angular/core';
import { RespaldosService } from '../../servicios/respaldos/respaldos.service';
import * as moment from 'moment'; 
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-respaldos-bd',
  templateUrl: './respaldos-bd.component.html',
  styleUrls: ['./respaldos-bd.component.css']
})
export class RespaldosBdComponent implements OnInit {
	/**
	*Almacena los respaldos obtenidos del arreglo
	*
	*@property {any}
	**/
	respaldos 

	constructor(
		public respaldosService: RespaldosService,
		public toastr: ToastrService) { 
		
		this.obtenerRespaldos()
	}

  	ngOnInit() {
  	}

  	/**
	*Obtiene los respaldos almacenados en el arreglo y los guarda
	*
	*@return {void}
	**/
  	obtenerRespaldos()
  	{
  		this.respaldos = this.respaldosService.obtenerRespaldos()
  	}

  	/**
	*Genera un nuevo respaldo
	*
	*@return {void}
	**/
  	generarRespaldo()
  	{
  		const hoy = new Date()
  		const fecha = moment(hoy).format("DD-MM-YYYY-HH-mm-ss")
  		const formato = ".sql"
  		const nombreRespaldo = fecha+formato
  		const dato = { respaldo: nombreRespaldo }
  		this.respaldosService.nuevoRespaldo(dato)
  	}

  	/**
	*Elimina un respaldo previamente seleccionado
	*
	*@return {void}
	**/
  	eliminarRespaldo(i)
  	{
  		if(confirm('¿Esta seguro de que desea eliminar el respaldo?'))
  		{
  			this.respaldosService.eliminarRespaldo(i)
  		}
  	}

  	/**
	*Lanza un mensaje indicando si desea restaurar o no
	*
	*@return {void}
	**/
  	restaurarRespaldo()
  	{
  		if(confirm('¿Desea realizar la restauración?'))
  		{
  			 this.toastr.success('Restauración realizada correctamente.', 'Exito')
  		}
  	}
}
