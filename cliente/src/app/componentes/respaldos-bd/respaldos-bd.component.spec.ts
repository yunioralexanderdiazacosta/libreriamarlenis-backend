import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RespaldosBdComponent } from './respaldos-bd.component';

describe('RespaldosBdComponent', () => {
  let component: RespaldosBdComponent;
  let fixture: ComponentFixture<RespaldosBdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RespaldosBdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RespaldosBdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
