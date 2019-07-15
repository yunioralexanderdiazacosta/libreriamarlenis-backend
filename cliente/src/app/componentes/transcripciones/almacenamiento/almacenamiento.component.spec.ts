import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlmacenamientoComponent } from './almacenamiento.component';

describe('AlmacenamientoComponent', () => {
  let component: AlmacenamientoComponent;
  let fixture: ComponentFixture<AlmacenamientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlmacenamientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlmacenamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
