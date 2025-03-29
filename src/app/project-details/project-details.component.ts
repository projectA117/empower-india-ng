import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { Component, OnInit } from '@angular/core';
import { ImportsModule } from '../imports';
import { ProjectApprovalComponent } from './project-approval/project-approval.component';
import { ProjectCommitteeComponent } from './project-committee/project-committee.component';
import { ProjectDonorsComponent } from './project-donors/project-donors.component';
import { ProjectFinanceComponent } from './project-finance/project-finance.component';
import { ProjectVendorsComponent } from './project-vendors/project-vendors.component';
import { ProjectWorkInProgressComponent } from './project-work-in-progress/project-work-in-progress.component';
import { ProjectsignoffComponent } from './project-signoff/project-signoff.component';
import { ProductService } from '@service/productservice';
import { ActivatedRoute } from '@angular/router';
import { ProjectBankDetailsComponent } from './project-bank-details/project-bank-details.component';
import { ProjectPublishComponent } from './project-publish/project-publish.component';
import { RoleDirective } from 'src/directives/role-access.directive';
import { ProjectDetailsService } from '@service/project-details.service';
export interface Tab {
  label: string;
  icon?: string;
  component?: any;
  isDisabled?: boolean;
}
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
    ProjectBankDetailsComponent,
    ProjectPublishComponent,
    RoleDirective,
  ],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.scss',
  providers: [ProductService],
})
export class ProjectDetailsComponent implements OnInit {
  product: any;
  constructor(
    private projectDetailsService: ProjectDetailsService,
    private activatedRoute: ActivatedRoute
  ) {}

  activeTab: string = 'Estimation'; // Set default active tab

  tabs = [
    {
      label: 'Estimation',
      icon: 'https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png',
    },
    {
      label: 'Committee',
      icon: 'https://primefaces.org/cdn/primeng/images/demo/avatar/onyamalimba.png',
    },
    {
      label: 'Sponsors',
      icon: 'https://primefaces.org/cdn/primeng/images/demo/avatar/ionibowcher.png',
    },
    {
      label: 'Vendors',
      icon: 'https://primefaces.org/cdn/primeng/images/demo/avatar/ionibowcher.png',
    },
    {
      label: 'Bank Details',
      icon: 'https://primefaces.org/cdn/primeng/images/demo/avatar/ionibowcher.png',
    },
    {
      label: 'Project Publish',
      icon: 'https://primefaces.org/cdn/primeng/images/demo/avatar/ionibowcher.png',
    },
    {
      label: 'Finance',
      icon: 'https://primefaces.org/cdn/primeng/images/demo/avatar/ionibowcher.png',
    },
    {
      label: 'Work In Progress',
      icon: 'https://primefaces.org/cdn/primeng/images/demo/avatar/ionibowcher.png',
    },
    {
      label: 'Project Sign off',
      icon: 'https://primefaces.org/cdn/primeng/images/demo/avatar/ionibowcher.png',
      isDisabled: true,
    },
    {
      label: 'KickOff',
      icon: 'https://primefaces.org/cdn/primeng/images/demo/avatar/ionibowcher.png',
      isDisabled: true,
    },
  ];

  onTabChange(label: string) {
    this.activeTab = label;
  }

  isTabDisabled(index: number): boolean {
    if (
      this.product.status === 'New' ||
      this.product.status?.toLowerCase() === 'waiting for donor'
    ) {
      // Disable last 4 tabs when status is 'New' or 'Waiting FOR DONOR'
      return index >= this.tabs.length - 4;
    }
    return false;
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.product = JSON.parse(params['project']);
      this.tabs.forEach((tab, index) => {
        tab.isDisabled = this.isTabDisabled(index);
      });
    });
  }

  projectKickOff() {
    this.projectDetailsService.kickOffProject(this.product.id).subscribe((data) => {

    })
  }
}
