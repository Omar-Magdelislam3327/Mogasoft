import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProjectsEditComponent } from './admin-projects-edit.component';

describe('AdminProjectsEditComponent', () => {
  let component: AdminProjectsEditComponent;
  let fixture: ComponentFixture<AdminProjectsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminProjectsEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminProjectsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
