import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VillagesDemographyEditComponent } from './villages-demography-edit.component';

describe('VillagesDemographyEditComponent', () => {
  let component: VillagesDemographyEditComponent;
  let fixture: ComponentFixture<VillagesDemographyEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VillagesDemographyEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VillagesDemographyEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
