import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPlansEditComponent } from './admin-plans-edit.component';

describe('AdminPlansEditComponent', () => {
  let component: AdminPlansEditComponent;
  let fixture: ComponentFixture<AdminPlansEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPlansEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminPlansEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
