import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { User_infoMediaComponent } from './user-info-media.component';

describe('User_infoMediaComponent', () => {
  let component: User_infoMediaComponent;
  let fixture: ComponentFixture<User_infoMediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ User_infoMediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(User_infoMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
