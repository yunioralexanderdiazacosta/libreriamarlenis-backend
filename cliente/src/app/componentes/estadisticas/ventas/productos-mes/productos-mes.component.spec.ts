import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosMesComponent } from './productos-mes.component';

describe('ProductosMesComponent', () => {
  let component: ProductosMesComponent;
  let fixture: ComponentFixture<ProductosMesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductosMesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductosMesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
