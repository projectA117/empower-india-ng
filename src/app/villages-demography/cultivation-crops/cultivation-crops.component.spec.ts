import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CultivationCropsComponent } from './cultivation-crops.component';

describe('CultivationCropsComponent', () => {
  let component: CultivationCropsComponent;
  let fixture: ComponentFixture<CultivationCropsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CultivationCropsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CultivationCropsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
