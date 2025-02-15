import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopiersComponent } from './copiers.component';

describe('CopiersComponent', () => {
  let component: CopiersComponent;
  let fixture: ComponentFixture<CopiersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CopiersComponent]
    });
    fixture = TestBed.createComponent(CopiersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
