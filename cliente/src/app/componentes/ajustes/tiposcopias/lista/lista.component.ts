import { Component, OnInit } from '@angular/core';
import { TipoCopiasService } from '../../../../servicios/tipo-copias/tipo-copias.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lista-tipos-copias',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaTiposCopiasComponent implements OnInit {
	/**
	*Obtener tipos de copias
	*
	*@property {any}
	**/
	tipos

	constructor(
        public tipoCopiasService: TipoCopiasService,
        public toastr: ToastrService) {
		this.obtenerTipoDeCopias()
	}

  	ngOnInit() {}

    /**
    *Obtener tipo de copias
    *
    *@return {void}
    **/
  	obtenerTipoDeCopias()
  	{
  		this.tipoCopiasService.obtenerTipoCopias().subscribe(
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
        if(confirm('¿Esta seguro de que desea desactivar el tipo de copia?'))
        {
            const dato =  { estatus: 0 }
            this.tipoCopiasService.desactivarTipoCopia(id, dato).subscribe(
            res => {
                 this.toastr.success('Dato desactivado satisfactoriamente.', 'Exito')
                 this.obtenerTipoDeCopias()
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
        this.tipoCopiasService.reactivarTipoCopia(id, dato).subscribe(
        res => {
            this.toastr.success('Dato reactivado correctamente.', 'Exito')
            this.obtenerTipoDeCopias()
        },
        err => {
            console.log(err)
        })
    }
}
