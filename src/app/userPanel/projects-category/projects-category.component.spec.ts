import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsCategoryComponent } from './projects-category.component';

describe('ProjectsCategoryComponent', () => {
  let component: ProjectsCategoryComponent;
  let fixture: ComponentFixture<ProjectsCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectsCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
