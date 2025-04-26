import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectVendorsComponent } from './project-vendors.component';

describe('ProjectVendorsComponent', () => {
  let component: ProjectVendorsComponent;
  let fixture: ComponentFixture<ProjectVendorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectVendorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectVendorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
