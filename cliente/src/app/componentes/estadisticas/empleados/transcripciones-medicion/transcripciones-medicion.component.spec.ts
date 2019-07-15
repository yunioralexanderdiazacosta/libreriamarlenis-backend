import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranscripcionesMedicionComponent } from './transcripciones-medicion.component';

describe('TranscripcionesMedicionComponent', () => {
  let component: TranscripcionesMedicionComponent;
  let fixture: ComponentFixture<TranscripcionesMedicionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranscripcionesMedicionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranscripcionesMedicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
