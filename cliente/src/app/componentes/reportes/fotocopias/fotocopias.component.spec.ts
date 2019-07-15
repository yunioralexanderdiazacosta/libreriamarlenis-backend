import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FotocopiasComponent } from './fotocopias.component';

describe('FotocopiasComponent', () => {
  let component: FotocopiasComponent;
  let fixture: ComponentFixture<FotocopiasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FotocopiasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FotocopiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
