import { Component, OnInit } from '@angular/core';
import * as moment from 'moment'; 
import { TranscripcionesService } from '../../servicios/transcripciones/transcripciones.service';
import { UsuariosService } from '../../servicios/usuarios/usuarios.service';
import { TokenPayload } from '../../modelos/tokenPayload';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
    /**
    *Obtiene cada una de las transcripciones pendientes
    *
    *@property {Array<any>}
    **/
    tpendientes: any = [] 

    /**
    *Almacena los datos del usuario conectado
    *
    *@property {TokenPayload}
    **/
	usuario: TokenPayload

    /**
    *Contador para saber la cantidad de transcripciones pendientes
    *
    *@property {number}
    **/
	cont_pend = 0;

	constructor(
		public usuariosService: UsuariosService,
		public transcripcionesService: TranscripcionesService) 
	{
		this.listarTranscripcionesPendientes() 
	}

  	ngOnInit() {}

  	daydiff(first, second) {
    	return Math.round((second - first) / (1000 * 60 * 60 * 24));
  	}

  	listarTranscripcionesPendientes()
  	{
  		this.usuariosService.obtenerUsuario().subscribe( 
  		(res: any) => {
  			this.usuario = res
			this.tpendientes = this.transcripcionesService.obtenerTranscripcionesPendientes(this.usuario.id).subscribe(
	  		res => {
	  			this.tpendientes = res
	  			this.tpendientes.filter(dato => {
  				    if(dato.estatus_entrega == 0 || dato.estatus_tarea == 0)
  				    {
  				    	this.cont_pend++
  				    }
  					var fecha_entrega = dato.fecha_entrega  
  					var fecha_hoy = new Date()				
  					var nuevaFecha = moment(fecha_entrega, "YYYY-MM-DD")
  					var hoy = moment(fecha_hoy, "YYYY-MM-DD")
  					var dias = nuevaFecha.diff(hoy, 'days')
					Object.defineProperty(dato, 'dias', { value: dias }) 
	  			})
	  		},
	  		err => {
	  			console.log(err)
	  		})
  		},
  		err => {
  			console.log(err)
  		})
  	}
}
