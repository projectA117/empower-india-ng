import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '@service/productservice';
import { DropdownModule } from 'primeng/dropdown';
import { ImportsModule } from '../imports';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProjectDetailsService } from '@service/project-details.service';
import { CommonService } from '@service/common.service';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-project-sponsors',
  standalone: true,
  imports: [
    ImportsModule,
    FormsModule,
    DropdownModule,
    ReactiveFormsModule,
    TableModule,
  ],
  templateUrl: './project-sponsors.component.html',
  styleUrl: './project-sponsors.component.scss',
  providers: [ProjectDetailsService, CommonService, ProductService],
})
export class ProjectSponsorsComponent implements OnInit {
  donors!: [];
  ProjectSponsorSidebarVisible: boolean = false;
  donorForm: FormGroup = new FormGroup({});
  apiCall: boolean = false;
  totalCollected: number = 0;
  projectCost: number = 0;
  remainingAmount: number = 0;
  sponsorType: string = 'new';

  @Input() projectData: any;
  @Output() closeDialogEvent = new EventEmitter<boolean>();

  constructor(private projectDetailsService: ProjectDetailsService) {}

  ngOnInit() {
    this.donors = this.projectData.sponsersList;
    this.totalCollected = this.projectData.sponsorAmount;
    this.projectCost = this.projectData.projectEstimation * (this.projectData.publicShare / 100);
    this.remainingAmount = this.projectCost - this.totalCollected;
    this.createDonorForm();
  }

  createDonorForm() {
    this.donorForm = new FormGroup({
      ID: new FormControl(''),
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
      DonorsMemoryOf: new FormControl('', [Validators.required]),
      DonorsAmount: new FormControl('', [Validators.required]),
      DonorsModeofPayment: new FormControl('', [Validators.required]),
    });
  }

  updateDonorForm() {
    console.log(this.apiCall);
    if (this.apiCall) {
      return;
    }
    this.apiCall = true;
    const payload = {
      firstName: this.donorForm.get('DonorsFirstName')?.value,
      lastName: this.donorForm.get('DonorsLastName')?.value,
      phoneNumber: this.donorForm.get('DonorsPhone')?.value,
      email: this.donorForm.get('DonorsEmail')?.value,
      address: this.donorForm.get('DonorsAddress')?.value,
      memoryOf: this.donorForm.get('DonorsMemoryOf')?.value,
      amount: this.donorForm.get('DonorsAmount')?.value,
      modeOfPayment: this.donorForm.get('DonorsModeofPayment')?.value,
    };

    this.projectDetailsService
      .addDonors(payload, this.projectData.id)
      .subscribe((data) => {
        if (data) {
          // this.showdonor();
          this.apiCall = false;
          this.onClose();
        }
      });
  }

  isSearching: boolean = false;
  filteredDonors: any[] = [];
  selectedDonor: any = null;

  searchDonors(event: any) {
    this.isSearching = true;

    // Get the search term
    const searchTerm = event.query;

    // Call your API with the search term
    this.projectDetailsService.searchDonors(searchTerm).subscribe(donors => {
      this.filteredDonors = donors;
      this.isSearching = false;
    }, error => {
      console.error('Error fetching donors:', error);
      this.isSearching = false;
    });
  }

  onDonorSelected(donor: any) {
    this.selectedDonor = donor.value;

    // Populate form with donor data
    this.donorForm.patchValue({
      DonorsFirstName: donor.value.firstName,
      DonorsLastName: donor.value.lastName,
      DonorsPhone: donor.value.phoneNumber,
      DonorsEmail: donor.value.email,
      DonorsAddress: donor.value.address,
    });
  }

  clearUserSelection() {
    this.selectedDonor = null;
    this.donorForm.reset();
  }

  onSponsorTypeChange(event: any) {
    this.donorForm.reset();
    if (event === 'new') {
      this.donorForm.get('DonorsFirstName')?.enable();
      this.donorForm.get('DonorsLastName')?.enable();
      this.donorForm.get('DonorsPhone')?.enable();
      this.donorForm.get('DonorsEmail')?.enable();
      this.donorForm.get('DonorsAddress')?.enable();
    } else if (event === 'existing') {
      this.donorForm.get('DonorsFirstName')?.disable();
      this.donorForm.get('DonorsLastName')?.disable();
      this.donorForm.get('DonorsPhone')?.disable();
      this.donorForm.get('DonorsEmail')?.disable();
      this.donorForm.get('DonorsAddress')?.disable();
    }
  }

  existingDonorSelected(event: any) {
    const selectedDonor = event.value;
    this.donorForm.get('DonorsFirstName')?.setValue(selectedDonor.firstName);
    this.donorForm.get('DonorsLastName')?.setValue(selectedDonor.lastName);
    this.donorForm.get('DonorsPhone')?.setValue(selectedDonor.phoneNumber);
    this.donorForm.get('DonorsEmail')?.setValue(selectedDonor.email);
    this.donorForm.get('DonorsAddress')?.setValue(selectedDonor.address);
  }

  onClose() {
    this.ProjectSponsorSidebarVisible = false;
    this.donorForm.reset();
    this.closeDialogEvent.emit(true);
  }
}
