import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCreditCartComponent } from './profile-credit-cart.component';

describe('ProfileCreditCartComponent', () => {
  let component: ProfileCreditCartComponent;
  let fixture: ComponentFixture<ProfileCreditCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileCreditCartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileCreditCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
