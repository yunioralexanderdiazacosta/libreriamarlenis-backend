import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { ArchivosService } from '../../../../servicios/archivos/archivos.service';

@Component({
  selector: 'app-carta',
  templateUrl: './carta.component.html',
  styleUrls: ['./carta.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartaComponent implements OnInit {
	/**
	*Obtiene los datos de la transcripcion del componente padre
	*
	*@property {any}
	**/
	@Input('transcripcion') transcripcion

	/**
	*Almacena los datos del archivo de la investigación
	*
	*@property {any}
	**/
	archivo
	
	constructor(public archivosService: ArchivosService) { }

  	ngOnInit() {
  		if(this.transcripcion.archivo_inv != '')
  		{
  			this.archivosService.obtenerArchivoInvestigacion(this.transcripcion.archivo_inv).subscribe(
  			res => {
  				this.archivo = res
  			}, 
  			err => {
  				console.log(err)
  			})
  		}
  	}

}
