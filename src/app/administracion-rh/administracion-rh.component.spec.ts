import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministracionRhComponent } from './administracion-rh.component';

describe('AdministracionRhComponent', () => {
  let component: AdministracionRhComponent;
  let fixture: ComponentFixture<AdministracionRhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministracionRhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministracionRhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
