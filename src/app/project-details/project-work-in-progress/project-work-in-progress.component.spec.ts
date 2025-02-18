import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectWorkInProgressComponent } from './project-work-in-progress.component';

describe('ProjectWorkInProgressComponent', () => {
  let component: ProjectWorkInProgressComponent;
  let fixture: ComponentFixture<ProjectWorkInProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectWorkInProgressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectWorkInProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
