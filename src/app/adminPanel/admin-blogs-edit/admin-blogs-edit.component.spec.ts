import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBlogsEditComponent } from './admin-blogs-edit.component';

describe('AdminBlogsEditComponent', () => {
  let component: AdminBlogsEditComponent;
  let fixture: ComponentFixture<AdminBlogsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminBlogsEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminBlogsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
