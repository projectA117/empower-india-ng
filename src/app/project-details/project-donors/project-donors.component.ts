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
import { RoleDirective } from 'src/directives/role-access.directive';
import { SponsorsComponent } from '../../sponsors/sponsors.component';

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
    RoleDirective,
  ],
  templateUrl: './project-donors.component.html',
  styleUrl: './project-donors.component.scss',
  providers: [ProjectDetailsService, ProductService],
})
export class ProjectDonorsComponent implements OnInit {
  @Input() projectData: any;
  doners!: [];
  donorsSidebarVisible: boolean = false;
  donorForm: FormGroup = new FormGroup({});
  FileUpload: any;
  uploadimage: any;
  imagePreview: any = 'assets/images/upload-img.svg';
  editdonors = false;
  donorsAddEditText = 'Add Sponsor';
  imagePreviews: any;
  selectedFiles: (File | { base64: string; fromServer: true })[] = [];
  totalCollected: number = 0;
  projectCost: number = 0;
  remainingAmount: number = 0;
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
      DonorsFirstName: new FormControl('', [Validators.required]),
      DonorsLastName: new FormControl('', [Validators.required]),
      DonorsPhone: new FormControl(null, [
        Validators.required,
        Validators.pattern(`^[0-9]{10}$`),
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      DonorsEmail: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}'
        ),
      ]),
      DonorsAddress: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      DonorsMemoryOf: new FormControl('', [Validators.required]),
      DonorsAmount: new FormControl('', [Validators.required]),
      DonorsModeofPayment: new FormControl('', [Validators.required]),
    });
  }
  showdonor() {
    this.projectDetailsService
      .showDonars(this.projectData.id)
      .subscribe((data) => {
        this.doners = data;

        this.totalCollected = this.doners.reduce((sum, doner) => sum + doner['amount'], 0);
        this.projectCost =
          this.projectData.projectEstimation *
          (this.projectData.publicShare / 100);
        this.remainingAmount = this.projectCost - this.totalCollected;
      });
  }
  updatedonorForm() {
    const payload = {
      firstName: this.donorForm.get('DonorsFirstName')?.value,
      lastName: this.donorForm.get('DonorsLastName')?.value,
      phoneNumber: this.donorForm.get('DonorsPhone')?.value,
      email: this.donorForm.get('DonorsEmail')?.value,
      address: this.donorForm.get('DonorsAddress')?.value,
      description: this.donorForm.get('description')?.value,
      memoryOf: this.donorForm.get('DonorsMemoryOf')?.value,
      amount: this.donorForm.get('DonorsAmount')?.value,
      modeOfPayment: this.donorForm.get('DonorsModeofPayment')?.value,
    };

    const formData = new FormData();
    formData.append('donarImage', this.uploadimage); // Add the file
    // formData.append('user', this.testpayload);
    formData.append(
      'donar',
      new Blob([JSON.stringify(payload)], { type: 'application/json' })
    );

    this.projectDetailsService
      .addDonors(formData, this.projectData.id)
      .subscribe((data) => {
        if (data) {
          this.showdonor();
          this.donorsSidebarVisible = false;
          this.donorForm.reset();
        }
      });
  }

  onUpload(event: any) {
    // const file = event.files;
    // console.log('...File', file);

    const file = event.target?.files[0]; // Get the selected file
    const formData = new FormData();

    formData.append('file', file);

    this.uploadimage = file;

    this.FileUpload = formData;
  }

  onEditSponsors(selectedSponsorsdata: any) {
    this.donorForm.reset();
    this.donorsSidebarVisible = true;
    this.editdonors = true;
    this.donorsAddEditText = 'Edit Sponsor';
    this.donorForm.patchValue({
      DonorsName: selectedSponsorsdata.firstName,
      DonorsPhone: selectedSponsorsdata.phoneNumber,
      DonorsEmail: selectedSponsorsdata.email,
      DonorsAddress: selectedSponsorsdata.address,
      description: selectedSponsorsdata.description,
      DonorsMemoryOf: selectedSponsorsdata.memoryOf,
      DonorsAmount: selectedSponsorsdata.amount,
      DonorsModeofPayment: selectedSponsorsdata.modeOfPayment,
    });
    if (selectedSponsorsdata.statusImage) {
      this.imagePreviews.push(
        `data:image/jpeg;base64,${selectedSponsorsdata.statusImage}`
      );
      this.selectedFiles = this.imagePreviews.map((b64) => ({
        base64: b64,
        fromServer: true,
      }));
    }
  }

  onDelete(donor: any) {
    this.projectDetailsService
      .deleteDonars(donor.id, this.projectData.id)
      .subscribe((res) => {
        this.showdonor();
      });
  }
}
