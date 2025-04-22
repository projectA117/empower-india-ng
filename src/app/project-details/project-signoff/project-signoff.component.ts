import { Component, Input, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ProjectDetailsService } from '@service/project-details.service';
import { ImportsModule } from 'src/app/imports';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RoleDirective } from 'src/directives/role-access.directive';
import { CommonService } from '@service/common.service';

export interface Product {
  id?: string;
  code?: string;
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  inventoryStatus?: string;
  category?: string;
  image?: string;
  rating?: number;
}

@Component({
  selector: 'app-project-signoff',
  standalone: true,
  imports: [
    ButtonModule,
    TableModule,
    CommonModule,
    ImportsModule,
    RoleDirective,
  ],
  templateUrl: './project-signoff.component.html',
  styleUrl: './project-signoff.component.scss',
})
export class ProjectsignoffComponent implements OnInit {
  @Input() projectData: any;
  products!: Product[];
  ProjectSignOffsidebarVisible: boolean = false;
  ProjectSignOffForm: FormGroup = new FormGroup({});
  editForm: boolean = false;
  constructor(
    private projectDetailsService: ProjectDetailsService,
    private commonService: CommonService
  ) {}
  ngOnInit() {
    this.createProjectSignOffForm();
    this.showProjectSignOffDetails();
  }

  createProjectSignOffForm() {
    this.ProjectSignOffForm = new FormGroup({
      id: new FormControl(''),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}'
        ),
      ]),
      phoneNumber:new FormControl('', [
        Validators.required,
        Validators.pattern(`^[0-9]{10}$`),
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
    });
  }

  showProjectSignOffDetails() {
    this.projectDetailsService.getProjectSignOff(this.projectData?.id).subscribe((data) => {
      this.products = data;
    });
  }

  addProjectSignOff() {
    this.ProjectSignOffsidebarVisible = true;
    this.ProjectSignOffForm.reset();
  }

  onProjectSignOffSubmit() {
    if (this.ProjectSignOffForm.valid) {
      if (this.ProjectSignOffForm.get('id').value) {
        this.updateWIP();
      } else {
        this.addProjectSignOffDetails();
      }
    }
  }
  addProjectSignOffDetails() {
    const payload = {
      ...this.ProjectSignOffForm.value,
      projectId: this.projectData?.id,
    };
    this.projectDetailsService.createProjectSignOff(payload).subscribe((data) => {
      if (data) {
        this.showProjectSignOffDetails();
        this.onCancel();
      }
    });
  }

  deleteProjectSignOff(id: number) {
    this.projectDetailsService.deleteProjectSignOff(id).subscribe((data) => {
      if (data) {
        this.showProjectSignOffDetails();
      }
    });
  }

  editProjectSignOff(ProjectSignOff: any) {
    this.ProjectSignOffsidebarVisible = true;
    this.editForm = true;
    this.ProjectSignOffForm.setValue({
      id: ProjectSignOff.id,
      firstName: ProjectSignOff.firstName,
      lastName: ProjectSignOff.lastName,
      email: ProjectSignOff.email,
      phoneNumber: ProjectSignOff.phoneNumber,
    });
  }

  updateWIP() {
    const payload = {
      ...this.ProjectSignOffForm.value,
      projectId: this.projectData?.id,

    };
    this.projectDetailsService.updateProjectSignOff(payload, this.ProjectSignOffForm.get('id').value).subscribe((data) => {
      if (data) {
        this.showProjectSignOffDetails();
        this.onCancel();
      }
    });
  }

  onCancel() {
    this.ProjectSignOffsidebarVisible = false;
    this.editForm = false;
    this.ProjectSignOffForm.reset();
  }

  completeProject() {
    const payload = {
      ...this.projectData,
      statusCode: 'COMPLETED',
    };

    const formData = new FormData();
    formData.append(
      'project',
      new Blob([JSON.stringify(payload)], { type: 'application/json' })
    );

    this.commonService.updateProject(formData).subscribe(
      (data) => {
        console.log('...Data', data);
        window.location.reload();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
