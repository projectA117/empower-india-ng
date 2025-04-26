import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployedyouthComponent } from './employedyouth.component';

describe('EmployedyouthComponent', () => {
  let component: EmployedyouthComponent;
  let fixture: ComponentFixture<EmployedyouthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployedyouthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployedyouthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
