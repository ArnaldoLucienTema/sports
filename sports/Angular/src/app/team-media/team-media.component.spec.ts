import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamMediaComponent } from './team-media.component';

describe('TeamMediaComponent', () => {
  let component: TeamMediaComponent;
  let fixture: ComponentFixture<TeamMediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamMediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
