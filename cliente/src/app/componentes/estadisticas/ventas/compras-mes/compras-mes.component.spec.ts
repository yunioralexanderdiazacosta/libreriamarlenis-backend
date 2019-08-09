import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprasMesComponent } from './compras-mes.component';

describe('ComprasMesComponent', () => {
  let component: ComprasMesComponent;
  let fixture: ComponentFixture<ComprasMesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComprasMesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprasMesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
