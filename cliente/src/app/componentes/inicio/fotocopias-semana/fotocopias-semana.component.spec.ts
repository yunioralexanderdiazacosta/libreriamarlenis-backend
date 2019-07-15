import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FotocopiasSemanaComponent } from './fotocopias-semana.component';

describe('FotocopiasSemanaComponent', () => {
  let component: FotocopiasSemanaComponent;
  let fixture: ComponentFixture<FotocopiasSemanaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FotocopiasSemanaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FotocopiasSemanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
