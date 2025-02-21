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
  selector: 'app-project-vendors',
  standalone: true,
  imports: [
    ButtonModule,
    TableModule,
    CommonModule,
    ImportsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './project-vendors.component.html',
  styleUrl: './project-vendors.component.scss',
  providers: [ProjectDetailsService, ProductService],
})
export class ProjectVendorsComponent implements OnInit {
  @Input() projectData: any;
  VendorsDetails!: [];
  vendorSidebarVisible: boolean = false;
  VendorForm: FormGroup = new FormGroup({});
  constructor(
    private productService: ProductService,
    private projectDetailsService: ProjectDetailsService
  ) {}
  ngOnInit() {
    this.showVendorsDetails();
    this.createVendorForm();
  }

  showVendorsDetails() {
    this.projectDetailsService.showVendorsDetails().subscribe((data) => {
      this.VendorsDetails = data;
    });
  }

  createVendorForm() {
    this.VendorForm = new FormGroup({
      VendorName: new FormControl(''),
      VendorContractorName: new FormControl(''),
      VendorMobile: new FormControl(''),
      VendorAddress: new FormControl(''),
      villageId: new FormControl(this.projectData.villageName),
      Mobile: new FormControl(''),
    });
  }

  updateVendor() {
    const payload = {
      VendorName: this.VendorForm.get('VendorName')?.value,
      VendorContractorName: this.VendorForm.get('VendorContractorName')?.value,
      VendorMobile: this.VendorForm.get('VendorMobile')?.value,
      VendorAddress: this.VendorForm.get('VendorAddress')?.value,
      villageId: this.projectData.villageId,
      id: this.projectData.id,
    };
    this.projectDetailsService.addVendors(payload).subscribe((data) => {
      console.log('...Data', data);
      if (data) {
        this.showVendorsDetails();
      }
    });
  }
}
