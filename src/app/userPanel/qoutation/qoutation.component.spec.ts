import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QoutationComponent } from './qoutation.component';

describe('QoutationComponent', () => {
  let component: QoutationComponent;
  let fixture: ComponentFixture<QoutationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QoutationComponent]
    });
    fixture = TestBed.createComponent(QoutationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
