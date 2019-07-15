import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesAtendidosMesComponent } from './clientes-atendidos-mes.component';

describe('ClientesAtendidosMesComponent', () => {
  let component: ClientesAtendidosMesComponent;
  let fixture: ComponentFixture<ClientesAtendidosMesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientesAtendidosMesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientesAtendidosMesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
