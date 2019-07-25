import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranscripcionesComponent } from './transcripciones.component';

describe('TranscripcionesComponent', () => {
  let component: TranscripcionesComponent;
  let fixture: ComponentFixture<TranscripcionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranscripcionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranscripcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
