import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProjectDetailsService } from '@service/project-details.service';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { SidebarModule } from 'primeng/sidebar';
import { RoleDirective } from 'src/directives/role-access.directive';
import { CommonService } from '@service/common.service';

@Component({
  selector: 'app-project-bank-details',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    TableModule,
    SidebarModule,
    RoleDirective,
  ],
  templateUrl: './project-bank-details.component.html',
  styleUrl: './project-bank-details.component.scss',
})
export class ProjectBankDetailsComponent {
  @Input() projectData: any;

  bankDetailsForm: FormGroup;
  bankDetails: any[] = [];
  bankDetailsSliderVisible = false;
  editForm = false;
  projectDetailsService = inject(ProjectDetailsService);

  constructor(private commonService: CommonService) {}

  ngOnInit() {
    console.log(this.projectData.id);
    this.bankDetailsForm = new FormGroup({
      id: new FormControl(0),
      projectId: new FormControl(this.projectData.id),
      accountNumber: new FormControl('', [Validators.required]),
      accountName: new FormControl('', [Validators.required]),
      bankName: new FormControl('', [Validators.required]),
      bankAddress: new FormControl('', [Validators.required]),
      bankPhoneNumber: new FormControl('', [Validators.required]),
      ifscCode: new FormControl('', [Validators.required]),
      swiftCode: new FormControl('', [Validators.required]),
    });
    this.showBankDetails();
  }

  addBankDetails() {
    this.bankDetailsForm.reset();
    this.bankDetailsSliderVisible = true;
  }

  edit(bankDetails) {
    this.bankDetailsForm.patchValue({
      id: bankDetails.id,
      projectId: bankDetails.id,
      accountNumber: bankDetails.accountNumber,
      accountName: bankDetails.accountName,
      bankName: bankDetails.bankName,
      bankAddress: bankDetails.bankAddress,
      bankPhoneNumber: bankDetails.bankPhoneNumber,
      ifscCode: bankDetails.ifscCode,
      swiftCode: bankDetails.swiftCode,
    });
    this.bankDetailsSliderVisible = true;
    this.editForm = true;
  }

  onCancel() {
    this.bankDetailsForm.reset();
    this.editForm = false;
    this.bankDetailsSliderVisible = false;
  }

  showBankDetails() {
    this.projectDetailsService
      .getBankDetails(this.projectData.id)
      .subscribe((data) => {
        if (data) {
          this.bankDetails = data;
        }
      });
  }

  localStorageuser() {
    return this.commonService.showInputAdmin(this.projectData?.districtId);
  }

  onSubmitBankDetails() {
    this.bankDetailsForm.get('projectId').setValue(this.projectData.id);
    if (this.editForm) {
      this.projectDetailsService
        .updateBankDetails(this.bankDetailsForm.value)
        .subscribe((data) => {
          if (data) {
            this.showBankDetails();
            this.onCancel();
          }
        });
    } else {
      this.projectDetailsService
        .addBankDetails(this.bankDetailsForm.value)
        .subscribe((data) => {
          if (data) {
            this.showBankDetails();
            this.onCancel();
          }
        });
    }
  }
}
