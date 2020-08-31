import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndustrialPetroleroComponent } from './industrial-petrolero.component';

describe('IndustrialPetroleroComponent', () => {
  let component: IndustrialPetroleroComponent;
  let fixture: ComponentFixture<IndustrialPetroleroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndustrialPetroleroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndustrialPetroleroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
