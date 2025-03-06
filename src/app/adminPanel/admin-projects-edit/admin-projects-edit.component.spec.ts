import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProjectsEditComponent } from './admin-projects-edit.component';

describe('AdminProjectsEditComponent', () => {
  let component: AdminProjectsEditComponent;
  let fixture: ComponentFixture<AdminProjectsEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminProjectsEditComponent]
    });
    fixture = TestBed.createComponent(AdminProjectsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
