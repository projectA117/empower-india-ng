import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandUtilizationComponent } from './land-utilization.component';

describe('LandUtilizationComponent', () => {
  let component: LandUtilizationComponent;
  let fixture: ComponentFixture<LandUtilizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandUtilizationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandUtilizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
