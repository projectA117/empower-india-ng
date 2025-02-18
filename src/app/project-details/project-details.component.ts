import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { Component } from '@angular/core';
import { ImportsModule } from '../imports';
import { ProjectApprovalComponent } from './project-approval/project-approval.component';
import { ProjectCommitteeComponent } from './project-committee/project-committee.component';
import { ProjectDonorsComponent } from './project-donors/project-donors.component';
import { ProjectFinanceComponent } from './project-finance/project-finance.component';
import { ProjectVendorsComponent } from './project-vendors/project-vendors.component';
import { ProjectWorkInProgressComponent } from './project-work-in-progress/project-work-in-progress.component';
import { ProjectsignoffComponent } from './project-signoff/project-signoff.component';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [
    ImportsModule,
    FormsModule,
    DropdownModule,
    ReactiveFormsModule,
    ProjectApprovalComponent,
    ProjectCommitteeComponent,
    ProjectDonorsComponent,
    ProjectFinanceComponent,
    ProjectsignoffComponent,
    ProjectVendorsComponent,
    ProjectWorkInProgressComponent,
  ],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.scss',
})
export class ProjectDetailsComponent {
  product = {
    id: 1,
    villageProposalId: 1,
    projectCategory: 'School',
    projectName: 'Library Books',
    status: 'Open',
    location: 'Near Government School',
    latitude: 16.539889,
    longitude: 80.783239,
    projectEstimation: 100000.0,
    governmentShare: 40000.0,
    publicShare: 60000.0,
    isNew: true,
    projectType: false,
    description:
      'Construction of a 10,000-liter capacity water tank near the school',
    createdBy: 'Admin',
    lastUpdatedBy: 'Admin',
  };
}
