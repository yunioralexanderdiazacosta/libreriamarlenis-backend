import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../servicios/usuarios/usuarios.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
	usuario: any
  	constructor(public usuariosService: UsuariosService) { 
  		this.obtenerUsuario()
	}
    
	ngOnInit() {
  	}
  
	obtenerUsuario()
  	{
  		this.usuariosService.obtenerUsuario().subscribe(	
  		res => {
  			this.usuario = res
  		},
  		err => {
  			console.log(err)
  		})
  	}

}
