import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from '../../../servicios/autenticacion/autenticacion.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public auth: AutenticacionService) { }

  ngOnInit() {
  }

}
