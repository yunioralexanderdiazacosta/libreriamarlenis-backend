import { Component } from '@angular/core';
import { AutenticacionService } from './servicios/autenticacion/autenticacion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	constructor(public auth: AutenticacionService){}  
}
