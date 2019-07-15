import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosCategoriasMesComponent } from './productos-categorias-mes.component';

describe('ProductosCategoriasMesComponent', () => {
  let component: ProductosCategoriasMesComponent;
  let fixture: ComponentFixture<ProductosCategoriasMesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductosCategoriasMesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductosCategoriasMesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
