import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranscripcionesPendientesComponent } from './transcripciones-pendientes.component';

describe('TranscripcionesPendientesComponent', () => {
  let component: TranscripcionesPendientesComponent;
  let fixture: ComponentFixture<TranscripcionesPendientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranscripcionesPendientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranscripcionesPendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
