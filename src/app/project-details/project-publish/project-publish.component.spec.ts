import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectPublishComponent } from './project-publish.component';

describe('ProjectPublishComponent', () => {
  let component: ProjectPublishComponent;
  let fixture: ComponentFixture<ProjectPublishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectPublishComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectPublishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
