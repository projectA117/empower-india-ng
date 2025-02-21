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
  providers: [ProductService],
})
export class ProjectDetailsComponent implements OnInit {
  product: any;
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.product = JSON.parse(params['project']);
    });
  }
}
