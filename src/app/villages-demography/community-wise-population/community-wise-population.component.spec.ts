import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityWisePopulationComponent } from './community-wise-population.component';

describe('CommunityWisePopulationComponent', () => {
  let component: CommunityWisePopulationComponent;
  let fixture: ComponentFixture<CommunityWisePopulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommunityWisePopulationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommunityWisePopulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
