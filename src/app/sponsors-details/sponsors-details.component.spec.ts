import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorsDetailsComponent } from './sponsors-details.component';

describe('SponsorsDetailsComponent', () => {
  let component: SponsorsDetailsComponent;
  let fixture: ComponentFixture<SponsorsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SponsorsDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SponsorsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
