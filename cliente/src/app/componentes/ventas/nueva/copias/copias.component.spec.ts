import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CopiasComponent } from './copias.component';

describe('CopiasComponent', () => {
  let component: CopiasComponent;
  let fixture: ComponentFixture<CopiasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CopiasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CopiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
