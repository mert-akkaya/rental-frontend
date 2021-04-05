import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileFindexComponent } from './profile-findex.component';

describe('ProfileFindexComponent', () => {
  let component: ProfileFindexComponent;
  let fixture: ComponentFixture<ProfileFindexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileFindexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileFindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
