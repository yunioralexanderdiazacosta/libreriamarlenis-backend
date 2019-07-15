import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edicion-transcripcion',
  templateUrl: './edicion.component.html',
  styleUrls: ['./edicion.component.css']
})
export class EdicionTranscripcionComponent implements OnInit {
  est_tarea: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
