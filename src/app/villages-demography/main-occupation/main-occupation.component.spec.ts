import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainOccupationComponent } from './main-occupation.component';

describe('MainOccupationComponent', () => {
  let component: MainOccupationComponent;
  let fixture: ComponentFixture<MainOccupationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainOccupationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainOccupationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
