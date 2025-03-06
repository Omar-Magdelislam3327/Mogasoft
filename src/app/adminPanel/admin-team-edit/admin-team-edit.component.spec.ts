import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTeamEditComponent } from './admin-team-edit.component';

describe('AdminTeamEditComponent', () => {
  let component: AdminTeamEditComponent;
  let fixture: ComponentFixture<AdminTeamEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminTeamEditComponent]
    });
    fixture = TestBed.createComponent(AdminTeamEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
