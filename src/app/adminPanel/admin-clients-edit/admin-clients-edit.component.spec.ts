import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminClientsEditComponent } from './admin-clients-edit.component';

describe('AdminClientsEditComponent', () => {
  let component: AdminClientsEditComponent;
  let fixture: ComponentFixture<AdminClientsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminClientsEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminClientsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
