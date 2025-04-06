import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminQuatationComponent } from './admin-quatation.component';

describe('AdminQuatationComponent', () => {
  let component: AdminQuatationComponent;
  let fixture: ComponentFixture<AdminQuatationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminQuatationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminQuatationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
