import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import * as moment from 'moment'; 
import { ComprasService } from '../../../servicios/compras/compras.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lista-compras',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ListaComprasComponent implements OnInit {
    /**
    * Almacena cada una de las compras obtenidas de la API
    *
    *@property {any}
    **/
    compras: any = []

     /**
    *Activa el dialogo para cancelar o anular la venta
    *
    *@return {void}
    **/
    busqueda: string = ''

    /**
    *Pagina inicial de la paginacion
    *
    *@property {number}
    **/
    p: number = 1

	constructor(
        public comprasService: ComprasService,
        public toastr: ToastrService) { 
      this.listarCompras()
  }

  	ngOnInit() {}

  	listarCompras()
  	{
  		this.comprasService.obtenerComprasApi().subscribe(
  		(res:any) => {
  			this.compras = res
            this.compras.filter(dato => {
                dato.created_at = moment(dato.created_at).format("DD-MM-YYYY hh:mm a")
                Object.defineProperty(dato, 'proveedorNombre', { value: dato.proveedore.razon_social })
                dato.estatus == 1
                ?  Object.defineProperty(dato, 'estatusTexto', { value: 'Procesada' }) 
                :  Object.defineProperty(dato, 'estatusTexto', { value: 'Anulada' }) 
            })
  		},
  		err => {
  			console.log(err)
  		})
  	}

    anularCompra(id)
    {
        if(confirm('¿Esta seguro de que desea anular la compra?'))
        {
            const dato = { estatus: 0 }
            this.comprasService.anularCompra(id, dato).subscribe(
            res => {
                this.toastr.success('Compra anulada satisfactoriamente.', 'Exito')
                this.listarCompras()
            },
            err => {
                console.log(err)
            })
        }
    }

    reactivarCompra(id)
    {
        const dato = { estatus: 1 }
        this.comprasService.reactivarCompra(id, dato).subscribe(
        res => {
            this.listarCompras()
            this.toastr.success('Compra reactivada satisfactoriamente.', 'Exito')
        }, 
        err => {
            console.log(err)
        })
    }
}
