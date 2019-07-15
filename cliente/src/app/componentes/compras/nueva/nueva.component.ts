import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nueva-compra',
  templateUrl: './nueva.component.html',
  styleUrls: ['./nueva.component.css']
})
export class NuevaCompraComponent implements OnInit {
  productos: Array<any> = [];

  /**
  *Activar o desactivar formulario para agregar nueva solicitud
  *
  *@property {boolean}
  **/
  nuevaSolicitud: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
