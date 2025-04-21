import { Component, Input, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ProjectDetailsService } from '@service/project-details.service';
import { ImportsModule } from 'src/app/imports';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
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
  selector: 'app-project-committee',
  standalone: true,
  imports: [
    ButtonModule,
    TableModule,
    CommonModule,
    ImportsModule,
    FormsModule,
    ReactiveFormsModule,
    RoleDirective,
  ],
  templateUrl: './project-committee.component.html',
  styleUrl: './project-committee.component.scss',
})
export class ProjectCommitteeComponent implements OnInit {
  @Input() projectData: any;
  products!: Product[];
  sidebarVisible: boolean = false;
  updatecommitteeForm: FormGroup = new FormGroup({});
  Committee: any = [];
  editCommitee: boolean = false;
  addEditText = 'Add Governance Body Member';
  constructor(private projectDetailsService: ProjectDetailsService) {}
  ngOnInit() {
    this.createForm();
    this.showCommittee();
  }

  createForm() {
    this.updatecommitteeForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      fatherName: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}'
        ),
      ]),
      villageId: new FormControl(this.projectData.villageName, [
        Validators.required,
      ]),
      Mobile: new FormControl('', [
        Validators.required,
        Validators.pattern(`^[0-9]{10}$`),
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
    });
  }

  showCommittee() {
    this.Committee = this.Committee;
    this.projectDetailsService.showCommittee(this.projectData.id).subscribe(
      (data) => {
        this.Committee = data;
      },
      (err) => {
        //Temp fix for Gopi
        this.Committee = this.Committee;
      }
    );
  }
  editCommittee(Committee: any) {
    this.sidebarVisible = true;
    this.editCommitee = true;
    this.addEditText = 'edit Governance Body Member';
    console.log('...Committee', Committee);

    this.updatecommitteeForm.setValue({
      firstName: Committee.firstName,
      lastName: Committee.lastName,
      fatherName: Committee.fatherName,
      email: Committee.email,
      villageId: this.projectData.villageName,
      Mobile: Committee.phoneNumber,
    });
  }

  addCommitteeview() {
    this.sidebarVisible = true;
    this.updatecommitteeForm.reset();
    this.editCommitee = false;
    this.updatecommitteeForm
      .get('villageId')
      ?.setValue(this.projectData?.villageName);
    this.addEditText = 'Add Governance Body Member';
  }

  updatecommittee() {
    const payload = {
      firstName: this.updatecommitteeForm.get('firstName')?.value,
      lastName: this.updatecommitteeForm.get('lastName')?.value,
      fatherName: this.updatecommitteeForm.get('fatherName')?.value,
      email: this.updatecommitteeForm.get('email')?.value,
      villageId: this.projectData.villageId,
      phoneNumber: this.updatecommitteeForm.get('Mobile')?.value,
      // id: ,
    };
    if (this.editCommitee) {
      this.projectDetailsService
        .editCommittee(payload, this.projectData.id)
        .subscribe((data) => {
          console.log('...Data', data);
          this.refreshData();
        });
    } else {
      this.projectDetailsService
        .addCommittee(payload, this.projectData.id)
        .subscribe((data) => {
          console.log('...Data', data);
          this.refreshData();
        });
    }
  }

  refreshData() {
    this.sidebarVisible = false;
    this.editCommitee = false;
    this.showCommittee();
  }

  deleteCommittee(Committee: any) {
    console.log('...Committee', Committee);
    const payload = {
      projectId: this.projectData.id,
      id: Committee.id,
    };
    this.projectDetailsService.deleteCommittee(payload).subscribe((data) => {
      //if (data) {
      this.showCommittee();
      // }
    });
  }
}
