import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsignoffComponent } from './project-signoff.component';

describe('ProjectsignoffComponent', () => {
  let component: ProjectsignoffComponent;
  let fixture: ComponentFixture<ProjectsignoffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsignoffComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectsignoffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
