import { Component, Input, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ProductService } from '@service/productservice';
import { ProjectDetailsService } from '@service/project-details.service';
import { ImportsModule } from 'src/app/imports';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

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
  ],
  templateUrl: './project-committee.component.html',
  styleUrl: './project-committee.component.scss',
  providers: [ProjectDetailsService],
})
export class ProjectCommitteeComponent implements OnInit {
  @Input() projectData: any;
  products!: Product[];
  sidebarVisible: boolean = false;
  updatecommitteeForm: FormGroup = new FormGroup({});
  Committee: any = [
    {
      id: 1,
      firstName: 'Swetha',
      lastName: 'R',
      fatherName: 'Satya',
      address: '123 Main Street, Jax',
      phoneNumber: '555-1234',
      email: 'swetha.r@gmail.com',
      recordType: 'active',
      villageId: 101,
      createdBy: 'Admin',
      createdDate: '2025-02-17T09:30:00',
      lastUpdatedBy: 'Admin',
      lastUpdatedDate: '2025-02-17T09:30:00',
    },
  ];
  constructor(
    private productService: ProductService,
    private projectDetailsService: ProjectDetailsService
  ) {}
  ngOnInit() {
    this.createForm();
    this.showCommittee();
  }

  createForm() {
    this.updatecommitteeForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      fatherName: new FormControl('', [Validators.required]),
      email: new FormControl(''),
      villageId: new FormControl(this.projectData.villageName),
      Mobile: new FormControl(''),
    });
  }

  showCommittee() {
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
    this.projectDetailsService
      .addCommittee(payload, this.projectData.id)
      .subscribe((data) => {
        console.log('...Data', data);
      });
  }

  deleteCommittee(Committee: any) {
    console.log('...Committee', Committee);
    const payload = {
      projectId: this.projectData.id,
      id: Committee.id,
    };
    this.projectDetailsService.deleteCommittee(payload).subscribe((data) => {
      if (data) {
        this.showCommittee();
      }
    });
  }
}
