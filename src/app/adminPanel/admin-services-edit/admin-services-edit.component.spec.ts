import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminServicesEditComponent } from './admin-services-edit.component';

describe('AdminServicesEditComponent', () => {
  let component: AdminServicesEditComponent;
  let fixture: ComponentFixture<AdminServicesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminServicesEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminServicesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
