import { Component, OnInit } from '@angular/core';
import * as moment from 'moment'; 
import { TranscripcionesService } from '../../servicios/transcripciones/transcripciones.service';
import { UsuariosService } from '../../servicios/usuarios/usuarios.service';
import { ContadorService } from '../../servicios/contador/contador.service';
import { TokenPayload } from '../../modelos/tokenPayload';
import { ToastrService } from 'ngx-toastr';

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
	cont_pend = 0

    /**
    *Contador para saber la cantidad de transcripciones pendientes
    *
    *@property {string}
    **/
    busqueda: string = ''

    /**
    *Pagina inicial de la paginacion
    *
    *@property {number}
    **/
    p: number = 1

    /**
    *Obtener contador del arreglo
    *
    *@property {number}
    **/
    contador


    /**
    *Obtener contador del arreglo
    *
    *@property {number}
    **/
    porRealizar:number = 0


    /**
    *Obtener contador del arreglo
    *
    *@property {number}
    **/
    porEntregar:number = 0

    /**
    *Activa o desactiva la precarga
    *
    *@property {number}
    **/
    loader: boolean = true


	constructor(
		public transcripcionesService: TranscripcionesService,
        public usuariosService: UsuariosService,
        public contadorService: ContadorService,
        public toastr: ToastrService) 
	{
        this.obteniendoContador()
        this.listarTranscripcionesPendientes() 
	}

  	ngOnInit() {}

  	daydiff(first, second) {
    	return Math.round((second - first) / (1000 * 60 * 60 * 24));
  	}

    obteniendoContador()
    {
        this.contador = 0
        this.contador = this.contadorService.obtenerContador()
        const dato = { e: 1 }
        this.contador.push(dato)
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
                        if(dato.estatus_entrega == 0) { this.porEntregar++ }
                        if(dato.estatus_tarea == 0){ this.porRealizar++ }
  				    }
  					var fecha_entrega = dato.fecha_entrega  
  					var fecha_hoy = new Date()				
  					var nuevaFecha = moment(fecha_entrega, "YYYY-MM-DD")
  					var hoy = moment(fecha_hoy, "YYYY-MM-DD")
  					var dias = nuevaFecha.diff(hoy, 'days')                   
					Object.defineProperty(dato, 'dias', { value: dias+1 }) 
                    dato.fecha_entrega = moment(dato.fecha_entrega).format("DD-MM-YYYY hh:mm a")
                    Object.defineProperty(dato, 'clienteAtendido', { value: dato.venta.cliente.cedula+' - '+dato.venta.cliente.nombres+" "+dato.venta.cliente.apellidos })
	  			    Object.defineProperty(dato, 'tipoTranscripcion', { value: dato.tipos_transcripcione.descripcion })
                  })
                  this.obteniendoDatos()
                  this.loader = false
	  		},
	  		err => {
	  			console.log(err)
	  		})
  		},
  		err => {
  			console.log(err)
  		})
  	}


    obteniendoDatos()
    {
        if(this.contador.length == 1 && this.porRealizar == 0)
        {
            this.toastr.success(`No tiene tarea(s) por realizar.`, 'Notificación', { timeOut: 10000 })
        }

        if(this.contador.length == 1 && this.porEntregar == 0)
        {
            this.toastr.success('No tiene tarea(s) por entregar.', 'Notificación', { timeOut: 10000 })
        }

        if(this.contador.length == 1 && this.porEntregar > 0)
        {
            this.toastr.error(`Tiene ${this.porEntregar} tarea(s) por entregar.`, 'Notificacion', { timeOut: 10000 })
        }

        if(this.contador.length == 1 && this.porRealizar > 0)
        {
            this.toastr.error(`Tiene ${this.porRealizar} tarea(s) por realizar.`, 'Notificación', { timeOut: 10000 })
        }
    }
}
