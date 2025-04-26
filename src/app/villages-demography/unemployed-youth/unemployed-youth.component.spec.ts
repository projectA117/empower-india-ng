import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnemployedYouthComponent } from './unemployed-youth.component';

describe('UnemployedYouthComponent', () => {
  let component: UnemployedYouthComponent;
  let fixture: ComponentFixture<UnemployedYouthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnemployedYouthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnemployedYouthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
