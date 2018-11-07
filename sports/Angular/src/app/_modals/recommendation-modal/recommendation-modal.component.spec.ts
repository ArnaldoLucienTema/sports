import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendationModalComponent } from './recommendation-modal.component';

describe('TryoutModalComponent', () => {
  let component: RecommendationModalComponent;
  let fixture: ComponentFixture<RecommendationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecommendationModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
