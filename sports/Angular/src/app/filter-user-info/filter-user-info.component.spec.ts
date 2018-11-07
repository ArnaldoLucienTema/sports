import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterUserInfoComponent } from './filter-user-info.component';

describe('FilterUserInfoComponent', () => {
  let component: FilterUserInfoComponent;
  let fixture: ComponentFixture<FilterUserInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterUserInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterUserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
