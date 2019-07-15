import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nueva',
  templateUrl: './nueva.component.html',
  styleUrls: ['./nueva.component.css']
})
export class NuevaVentaComponent implements OnInit {
  adjuntar;

  /** 
  * Activa o desactiva el collapse de productos
  *
  *@property {boolean}
  **/
  formProductos: boolean = false;

  /** 
  * Activa o desactiva el collapse de copias
  *
  *@property {boolean}
  **/
  formCopias: boolean = false;

  /** 
  * Activa o desactiva el collapse de transcripciones
  *
  *@property {boolean}
  **/
  formTranscripciones: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
