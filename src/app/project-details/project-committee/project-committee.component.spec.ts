import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCommitteeComponent } from './project-committee.component';

describe('ProjectCommitteeComponent', () => {
  let component: ProjectCommitteeComponent;
  let fixture: ComponentFixture<ProjectCommitteeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectCommitteeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectCommitteeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
