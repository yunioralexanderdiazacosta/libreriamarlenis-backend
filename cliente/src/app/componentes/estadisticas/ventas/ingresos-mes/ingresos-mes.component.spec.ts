import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresosMesComponent } from './ingresos-mes.component';

describe('IngresosMesComponent', () => {
  let component: IngresosMesComponent;
  let fixture: ComponentFixture<IngresosMesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngresosMesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresosMesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
