import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { User_infoStatsComponent } from './user-info-stats.component';

describe('User_infoStatsComponent', () => {
  let component: User_infoStatsComponent;
  let fixture: ComponentFixture<User_infoStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ User_infoStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(User_infoStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
