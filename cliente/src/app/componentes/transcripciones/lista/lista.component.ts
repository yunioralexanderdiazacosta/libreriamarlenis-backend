import { Component, OnInit } from '@angular/core';
import { TranscripcionesService } from '../../../servicios/transcripciones/transcripciones.service';
import { UsuariosService } from '../../../servicios/usuarios/usuarios.service';
import * as moment from 'moment'; 

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaTranscripcionesComponent implements OnInit {
    busqueda: string = ''
	transcripciones = []
    usuario 
	constructor(
        public transcripcionesService: TranscripcionesService,
        public usuariosService: UsuariosService) { }

  	ngOnInit() {
  		this.listarTranscripciones()
  	}

  	listarTranscripciones()
  	{
        this.usuariosService.obtenerUsuario().subscribe(
        res => {
            this.usuario = res 
            this.transcripcionesService.obtenerTranscripciones().subscribe(
            (res: any) => {
                this.transcripciones = res
                this.transcripciones.filter(dato => {
                Object.defineProperty(dato, 'tipo', { value: dato.tipos_transcripcione.descripcion })
                    if(this.usuario.rol_id == 1)
                    {
                        return dato.created_at = moment().format(dato.created_at)
                    }
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
