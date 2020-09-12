import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminWebComponent } from './admin-web.component';

describe('AdminWebComponent', () => {
  let component: AdminWebComponent;
  let fixture: ComponentFixture<AdminWebComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminWebComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
