import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminServicesEditComponent } from './admin-services-edit.component';

describe('AdminServicesEditComponent', () => {
  let component: AdminServicesEditComponent;
  let fixture: ComponentFixture<AdminServicesEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminServicesEditComponent]
    });
    fixture = TestBed.createComponent(AdminServicesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
