import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TryoutModalComponent } from './tryout-modal.component';

describe('TryoutModalComponent', () => {
  let component: TryoutModalComponent;
  let fixture: ComponentFixture<TryoutModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TryoutModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TryoutModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
