import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DifucionComponent } from './difucion.component';

describe('DifucionComponent', () => {
  let component: DifucionComponent;
  let fixture: ComponentFixture<DifucionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DifucionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DifucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
