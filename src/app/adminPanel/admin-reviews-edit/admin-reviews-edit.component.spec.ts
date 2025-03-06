import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReviewsEditComponent } from './admin-reviews-edit.component';

describe('AdminReviewsEditComponent', () => {
  let component: AdminReviewsEditComponent;
  let fixture: ComponentFixture<AdminReviewsEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminReviewsEditComponent]
    });
    fixture = TestBed.createComponent(AdminReviewsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
