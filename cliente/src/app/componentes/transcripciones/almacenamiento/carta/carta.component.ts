import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-carta',
  templateUrl: './carta.component.html',
  styleUrls: ['./carta.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartaComponent implements OnInit {
	@Input('transcripcion') transcripcion
	
	constructor() { }

  	ngOnInit() {
  	}

}
