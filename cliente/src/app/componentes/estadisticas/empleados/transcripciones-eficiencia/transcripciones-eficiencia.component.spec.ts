import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranscripcionesEficienciaComponent } from './transcripciones-eficiencia.component';

describe('TranscripcionesEficienciaComponent', () => {
  let component: TranscripcionesEficienciaComponent;
  let fixture: ComponentFixture<TranscripcionesEficienciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranscripcionesEficienciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranscripcionesEficienciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
