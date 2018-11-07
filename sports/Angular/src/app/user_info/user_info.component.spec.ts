import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { User_infoComponent } from './user_info.component';

describe('User_infoComponent', () => {
  let component: User_infoComponent;
  let fixture: ComponentFixture<User_infoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ User_infoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(User_infoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
