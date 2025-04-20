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
  constructor(
    private projectDetailsService: ProjectDetailsService
  ) {}
  ngOnInit() {
    this.createProjectSignOffForm();
    this.showProjectSignOffDetails();
  }

  createProjectSignOffForm() {
    this.ProjectSignOffForm = new FormGroup({
      ProjectSignOffDate: new FormControl('', [Validators.required]),
      ProjectSignOffPhoto: new FormControl(''),
      // ProjectSignOffPhotoFile: new FormControl('', [Validators.required]),
      ProjectSignOffMembers: new FormControl('', [Validators.required]),
      ProjectSignOffDecription: new FormControl('', [Validators.required]),
    });
  }
  showProjectSignOffDetails() {

  }
  updateWIP() {
    const payload = {
      projectSignOffDate:
        this.ProjectSignOffForm.get('ProjectSignOffDate')?.value,
      projectSignOffPhoto: this.ProjectSignOffForm.get('ProjectSignOffPhoto')
        ?.value,
      projectSignOffMembers: this.ProjectSignOffForm.get(
        'ProjectSignOffMembers'
      )?.value,
      projectSignOffDecription: this.ProjectSignOffForm.get(
        'ProjectSignOffDecription'
      )?.value,

      villageId: this.projectData?.villageId,
      id: this.projectData?.id,
    };
    this.projectDetailsService.updateWIP(payload).subscribe((data) => {
      if (data) {
        this.showProjectSignOffDetails();
      }
    });
  }

  updateProjectSignOff() {
    this.ProjectSignOffsidebarVisible = true;
  }
}
