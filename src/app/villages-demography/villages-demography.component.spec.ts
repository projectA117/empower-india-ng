import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VillagesDemographyComponent } from './villages-demography.component';

describe('VillagesDemographyComponent', () => {
  let component: VillagesDemographyComponent;
  let fixture: ComponentFixture<VillagesDemographyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VillagesDemographyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VillagesDemographyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
