import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutenticacionService } from '../../servicios/autenticacion/autenticacion.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-iniciarsesion',
  templateUrl: './iniciarsesion.component.html',
  styleUrls: ['./iniciarsesion.component.css']
})
export class IniciarsesionComponent implements OnInit {
  	login: FormGroup;
    input_required = "Este campo no puede estar vacío";
    error = '';

  	constructor(
        public fb: FormBuilder,
        public auth: AutenticacionService,
        public router: Router) { 
  	}

    ngOnInit() {
        if(this.auth.isLoggedIn()){
            this.router.navigateByUrl('/inicio')
        }

        this.login = this.fb.group({
            usuario: ['', Validators.required],
            clave: ['', Validators.required]
        });
    }

    get f(){ return this.login.controls; } 

    onSubmit(){
        this.auth.login(this.login.value).subscribe(
            res => {
                this.router.navigateByUrl('/inicio')
            },
            err => {
                if(err.status == 403)
                {
                    this.error = err.error
                }
                else
                {
                    console.log(err);
                }
            }
        )
    }
}
