import { Component, Input, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ProductService } from '@service/productservice';
import { ProjectDetailsService } from '@service/project-details.service';
import { ImportsModule } from 'src/app/imports';
import { CommonService } from '@service/common.service';
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
  selector: 'app-project-donors',
  standalone: true,
  imports: [
    ButtonModule,
    TableModule,
    CommonModule,
    ImportsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './project-donors.component.html',
  styleUrl: './project-donors.component.scss',
  providers: [ProjectDetailsService, CommonService, ProductService],
})
export class ProjectDonorsComponent implements OnInit {
  @Input() projectData: any;
  doners!: [];
  donorsSidebarVisible: boolean = false;
  donorForm: FormGroup = new FormGroup({});
  constructor(
    private productService: ProductService,
    private projectDetailsService: ProjectDetailsService,
    private commonService: CommonService
  ) {}
  ngOnInit() {
    this.createdonorForm();
    this.showdonor();
  }

  createdonorForm() {
    this.donorForm = new FormGroup({
      DonorsName: new FormControl(''),
      DonorsPhone: new FormControl(''),
      DonorsEmail: new FormControl(''),
      DonorsAddress: new FormControl(''),
      DonorsMemoryOf: new FormControl(''),
      DonorsAmount: new FormControl(''),
      DonorsModeofPayment: new FormControl(''),
    });
  }
  showdonor() {
    this.projectDetailsService.showDonars().subscribe((data) => {
      this.doners = data;
    });
  }
  updatedonorForm() {
    const payload = {
      firstName: this.donorForm.get('DonorsName')?.value,
      lastName: this.donorForm.get('DonorsName')?.value,
      phoneNumber: this.donorForm.get('DonorsPhone')?.value,
      email: this.donorForm.get('DonorsEmail')?.value,
      address: this.donorForm.get('DonorsAddress')?.value,
      memoryOf: this.donorForm.get('DonorsMemoryOf')?.value,
      amount: this.donorForm.get('DonorsAmount')?.value,
      modeOfPayment: this.donorForm.get('DonorsModeofPayment')?.value,
    };

    this.projectDetailsService
      .addDonars(payload, this.projectData.id)
      .subscribe((data) => {
        if (data) {
          this.showdonor();
        }
      });
  }
}
