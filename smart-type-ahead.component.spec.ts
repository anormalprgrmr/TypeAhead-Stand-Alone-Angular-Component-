import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartTypeAheadComponent } from './smart-type-ahead.component';

describe('SmartTypeAheadComponent', () => {
  let component: SmartTypeAheadComponent;
  let fixture: ComponentFixture<SmartTypeAheadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmartTypeAheadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SmartTypeAheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
