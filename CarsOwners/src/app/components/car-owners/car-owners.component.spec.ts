import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarOwnersComponent } from './car-owners.component';

describe('CarOwnersComponent', () => {
  let component: CarOwnersComponent;
  let fixture: ComponentFixture<CarOwnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarOwnersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarOwnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
