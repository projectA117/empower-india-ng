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
  selector: 'app-project-vendors',
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
  templateUrl: './project-vendors.component.html',
  styleUrl: './project-vendors.component.scss',
})
export class ProjectVendorsComponent implements OnInit {
  @Input() projectData: any;
  VendorsDetails!: [];
  vendorSidebarVisible: boolean = false;
  VendorForm: FormGroup = new FormGroup({});
  VendorAddEditText: string = 'Add Vendor';
  constructor(
    private projectDetailsService: ProjectDetailsService,
    private commonService: CommonService
  ) {}
  ngOnInit() {
    this.showVendorsDetails();
    this.createVendorForm();
  }
  localStorageuser() {
    return this.commonService.showInputAdmin(this.projectData?.districtId);
  }
  showVendorsDetails() {
    this.projectDetailsService
      .showVendorsDetails(this.projectData.id)
      .subscribe((data) => {
        this.VendorsDetails = data;
      });
  }

  createVendorForm() {
    this.VendorForm = new FormGroup({
      id: new FormControl(0),
      VendorName: new FormControl('', [Validators.required]),
      VendorContractorName: new FormControl('', [Validators.required]),
      VendorMobile: new FormControl(null, [
        Validators.required,
        Validators.pattern(`^[0-9]{10}$`),
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      VendorAddress: new FormControl('', [Validators.required]),
    });
  }

  updateVendor() {
    const payload = {
      id: this.VendorForm.get('id')?.value ?? null, //,
      name: this.VendorForm.get('VendorName')?.value,
      contractorName: this.VendorForm.get('VendorContractorName')?.value,
      phone: this.VendorForm.get('VendorMobile')?.value,
      address: this.VendorForm.get('VendorAddress')?.value,
      projectId: this.projectData.id,
      //villageId: this.projectData.villageId,
      //id: this.projectData.id,
    };
    this.projectDetailsService.addVendors(payload).subscribe((data) => {
      console.log('...Data', data);
      if (data) {
        this.showVendorsDetails();
        this.vendorSidebarVisible = false;
        this.VendorForm.reset();
      }
    });
  }
  onEditVendors(VendorsDetails: any) {
    this.vendorSidebarVisible = true;
    this.VendorAddEditText = 'Edit';
    this.VendorForm.patchValue({
      id: VendorsDetails.id,
      VendorName: VendorsDetails.name,
      VendorContractorName: VendorsDetails.contractorName,
      VendorMobile: VendorsDetails.phone,
      VendorAddress: VendorsDetails.address,
    });
  }

  onDelete(id) {
    this.projectDetailsService.deleteVendors(id).subscribe((res) => {
      this.showVendorsDetails();
    });
  }
}
