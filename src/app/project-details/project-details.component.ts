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
import { ActivatedRoute } from '@angular/router';
import { ProjectBankDetailsComponent } from './project-bank-details/project-bank-details.component';
import { ProjectPublishComponent } from './project-publish/project-publish.component';
import { RoleDirective } from 'src/directives/role-access.directive';
import { ProjectDetailsService } from '@service/project-details.service';
import { MapComponent } from '../map/map.component';
export interface Tab {
  label: string;
  icon?: string;
  component?: any;
  isDisabled?: boolean;
  show?: boolean;
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
    MapComponent,
  ],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.scss',
})
export class ProjectDetailsComponent implements OnInit {
  product: any;
  constructor(
    private projectDetailsService: ProjectDetailsService,
    private activatedRoute: ActivatedRoute
  ) {}

  activeTab: string = 'Estimation'; // Set default active tab
  hideTabs = ['Bank Details', 'Project Publish', 'KickOff', 'Project Sign off'];

  tabs = [
    {
      label: 'Estimation',
      icon: 'https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png',
    },
    {
      label: 'Governance Body Members',
      icon: 'https://primefaces.org/cdn/primeng/images/demo/avatar/onyamalimba.png',
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
      label: 'Sponsors',
      icon: 'https://primefaces.org/cdn/primeng/images/demo/avatar/ionibowcher.png',
    },
    {
      label: 'Vendors',
      icon: 'https://primefaces.org/cdn/primeng/images/demo/avatar/ionibowcher.png',
    },
    {
      label: 'KickOff',
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
  ];
  fromPage = 'project';

  onTabChange(label: string) {
    this.activeTab = label;
  }

  isTabDisabled(index: number): boolean {
    if (
      this.product.statusCode?.toLowerCase() === 'draft' ||
      this.product.statusCode?.toLowerCase() === 'wfa'
    ) {
      // Disable last 4 tabs when status is 'New' or 'Waiting FOR DONOR'
      return index >= this.tabs.length - 6;
    } else if (this.product.statusCode?.toLowerCase() === 'wfd') {
      return index >= this.tabs.length - 3;
    }
    return false;
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      // this.product = JSON.parse(params['project']);
      // this.tabs.forEach((tab, index) => {
      //   tab.isDisabled = this.isTabDisabled(index);
      // });
      this.getProjectDetails(params['projectId']);
      if (params['fromPage']) {
        this.fromPage = params['fromPage'];
      }
    });
  }

  getProjectDetails(id) {
    this.projectDetailsService.getProjectDetailsById(id).subscribe((data) => {
      const localStorageuser = JSON.parse(localStorage.getItem('user'));

      this.product = data;
      const sponsorAmount = this.product?.sponsersList?.reduce(
        (total, sponsor) => total + Number(sponsor.amount),
        0
      );
      const publicEstimate =
      this.product.projectEstimation * (this.product.publicShare / 100);
      this.product.sponsorAmount = sponsorAmount;
      this.product.disableAddSponsor = publicEstimate <= sponsorAmount;
      if (!localStorageuser) {
        const filtertabs = this.tabs.filter((tab) => {
          return !this.hideTabs.includes(tab.label);
        });
        this.tabs = filtertabs;
      }

      this.tabs.forEach((tab: any, index) => {
        tab.isDisabled = this.isTabDisabled(index);
      });
    });
  }

  projectKickOff() {
    this.projectDetailsService
      .kickOffProject(this.product.id)
      .subscribe((data) => {
        this.getProjectDetails(this.product.id)
      });
  }
}
