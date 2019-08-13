import { Component, OnInit } from '@angular/core';
import { TipoTranscripcionesService } from '../../../../servicios/tipo-transcripciones/tipo-transcripciones.service';
import { UsuariosService } from '../../../../servicios/usuarios/usuarios.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class TipoTareasListaComponent implements OnInit {
	/**
	*Almacena los tipos de transcripciones
	*
	*@property {any}
	**/
	tipos

   /**
    *Almacena los datos del usuario conectado
    *
    *@property {any}
    **/
    usuario

	constructor(
		public tipotareasService: TipoTranscripcionesService,
    public usuariosService: UsuariosService,
		public toastr: ToastrService) { 
    
		this.listarTiposTareas()
	}

  	ngOnInit() {
  	}

  	/**
    *Obtener tipos de tareas
    *
    *@return {void}
    **/
  	listarTiposTareas()
  	{
  		this.tipotareasService.obtenerTipoTranscripciones().subscribe(
  		res => {
  			this.tipos = res
  		},
  		err => {
  			console.log(err)
  		})
  	}

  	/**
    *Activa el dialogo para cancelar o desactivar el tipo
    *
    *@return {void}
    **/
    anularTipo(id)
    {
        if(confirm('¿Esta seguro de que desea desactivar la categoria?'))
        {
            const dato =  { estatus: 0 }
            this.tipotareasService.desactivarTipoTarea(id, dato).subscribe(
            res => {
                 this.toastr.success('Categoria desactivada satisfactoriamente.', 'Exito')
                 this.listarTiposTareas()
            },
            err => {
                console.log(err)
            })
        }
    }

    /**
    *Reactivar un tipo previamente seleccionada
    *
    *@return {void}
    **/
    reactivarTipo(id)
    {
        const dato = { estatus: 1 }
        this.tipotareasService.reactivarTipoTarea(id, dato).subscribe(
        res => {
            this.toastr.success('Categoria reactivada correctamente.', 'Exito')
            this.listarTiposTareas()
        },
        err => {
            console.log(err)
        })
    }
}
