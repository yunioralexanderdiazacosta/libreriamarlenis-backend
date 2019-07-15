import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nueva-fotocopia',
  templateUrl: './nueva.component.html',
  styleUrls: ['./nueva.component.css']
})
export class NuevaFotocopiaComponent implements OnInit {
  cantidad: number = 1;
  precio: number = 5000;
  constructor() { }

  ngOnInit() {
  }

}
