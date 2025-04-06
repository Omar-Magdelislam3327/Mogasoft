import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTeamEditComponent } from './admin-team-edit.component';

describe('AdminTeamEditComponent', () => {
  let component: AdminTeamEditComponent;
  let fixture: ComponentFixture<AdminTeamEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminTeamEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminTeamEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
