import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasSemanaComponent } from './ventas-semana.component';

describe('VentasSemanaComponent', () => {
  let component: VentasSemanaComponent;
  let fixture: ComponentFixture<VentasSemanaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VentasSemanaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VentasSemanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
