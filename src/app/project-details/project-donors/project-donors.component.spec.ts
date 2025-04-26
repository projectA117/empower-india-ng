import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDonorsComponent } from './project-donors.component';

describe('ProjectDonorsComponent', () => {
  let component: ProjectDonorsComponent;
  let fixture: ComponentFixture<ProjectDonorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectDonorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectDonorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
