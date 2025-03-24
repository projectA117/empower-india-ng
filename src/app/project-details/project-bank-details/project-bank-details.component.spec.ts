import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectBankDetailsComponent } from './project-bank-details.component';

describe('ProjectBankDetailsComponent', () => {
  let component: ProjectBankDetailsComponent;
  let fixture: ComponentFixture<ProjectBankDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectBankDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectBankDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
