import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-iniciarsesion',
  templateUrl: './iniciarsesion.component.html',
  styleUrls: ['./iniciarsesion.component.css']
})
export class IniciarsesionComponent implements OnInit {
  	logueado: boolean = true;
  	constructor(public router: Router) { 
	  	console.log(this.router.url);
	  	if(this.router.url == '/iniciarsesion')
	  	{
	  		console.log(this.router.url);
	  		this.logueado = false;
	  	}
  	}

  ngOnInit() {
  }

}
