import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CopiasService } from '../../../../servicios/copias/copias.service';
import { TipoCopiasService } from '../../../../servicios/tipo-copias/tipo-copias.service';

@Component({
  selector: 'app-copias-venta',
  templateUrl: './copias.component.html',
  styleUrls: ['./copias.component.css']
})
export class VentasCopiasComponent implements OnInit {
    /**
    * Evento que actualiza los montos de la venta
    * 
    * @property {EventEmitter<boolean>}
    */
    @Output() actualizarMontos = new EventEmitter<boolean>();
    @Output() enviarCopiasDanadas = new EventEmitter<number>();

	  copias: any = [];
    tipoCopias;
    cont: number = 0;
    copias_danadas: number = 0;

	constructor(
        public copiasService: CopiasService,
        public tipoCopiasService: TipoCopiasService) { }

  	ngOnInit() {
  		this.listarCopias();
      this.enviarCopiasDanadas.emit(this.copias_danadas)
  	}

  	listarCopias(){
  		this.copias = this.copiasService.obtenerCopiasArreglo()
  	}
    
    changeEnviar(){
      this.enviarCopiasDanadas.emit(this.copias_danadas)
    }

    eliminarCopia(indice, id){
        if(confirm('¿Esta seguro de que desea eliminar el registro?'))
        {
            this.copiasService.eliminarCopiaArreglo(indice)
            this.tipoCopias = this.tipoCopiasService.obtenerTipoCopiasArreglo()
            this.actualizarMontos.emit(true);
            this.tipoCopias.find(dato => {
                if(dato.id == id){
                    return dato.estado = 0
                }
            })
        }
    }

}
