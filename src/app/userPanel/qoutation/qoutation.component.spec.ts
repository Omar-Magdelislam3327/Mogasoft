import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QoutationComponent } from './qoutation.component';

describe('QoutationComponent', () => {
  let component: QoutationComponent;
  let fixture: ComponentFixture<QoutationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QoutationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QoutationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
