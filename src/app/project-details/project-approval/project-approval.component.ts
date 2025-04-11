import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import {
  FormsModule,
  FormControl,
  ReactiveFormsModule,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ProjectDetailsService } from '@service/project-details.service';
import { ImportsModule } from 'src/app/imports';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { RoleDirective } from 'src/directives/role-access.directive';

@Component({
  selector: 'app-project-approval',
  standalone: true,
  imports: [
    ImportsModule,
    InputTextModule,
    InputNumberModule,
    FormsModule,
    DropdownModule,
    ReactiveFormsModule,
    RoleDirective,
  ],
  templateUrl: './project-approval.component.html',
  styleUrl: './project-approval.component.scss',
  providers: [ProjectDetailsService],
})
export class ProjectApprovalComponent implements OnInit, OnChanges {
  @Input() projectData: any;
  value: string | undefined;
  approvalForm: FormGroup = new FormGroup({});
  value1: number;
  governmentShareAmount: number = 0;
  nonAdmin: any = '';
  constructor(private projectDetailsService: ProjectDetailsService) {}

  ngOnInit() {
    if (this.approvalForm) {
      this.createapprovalForm();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
      if (changes.projectData) {
      this.createapprovalForm();
    }
  }

  // ngAfterViewInit() {
  //   const localStorageuser = JSON.parse(localStorage.getItem('user'));
  //   if (localStorageuser && localStorageuser.roles[0].id != 3) {
  //     this.nonAdmin = '';
  //   } else {
  //     this.nonAdmin = 3;
  //   }
  // }

  localStorageuser() {
    const localStorageuser = JSON.parse(localStorage.getItem('user'));
    if (!localStorageuser || localStorageuser.roles[0].id != 3) {
      return false;
    } else {
      return true;
    }
  }

  profileImageShowHide() {
    const localStorageuser = JSON.parse(localStorage.getItem('user'));
    if (
      localStorageuser?.profilePhoto &&
      localStorageuser?.profilePhoto?.length > 4
    ) {
      return true;
    } else {
      return false;
    }
  }

  localStorageuserimage() {
    const localStorageuser = JSON.parse(localStorage.getItem('user'));
    if (localStorageuser) {
      return 'data:image/jpeg;base64,' + localStorageuser.profilePhoto;
    }
  }

  createapprovalForm() {
    this.approvalForm = new FormGroup({
      ProjectEstimation: new FormControl(this.projectData?.projectEstimation),
      GovtShare: new FormControl(this.projectData?.governmentShare),
      PublicShare: new FormControl(this.projectData?.publicShare),
    });

    this.governmentShareAmount =
      ((this.projectData?.projectEstimation || 0) *
        (this.projectData?.governmentShare || 0)) /
      100;

    this.approvalForm.get('PublicShare').disable();
    this.approvalForm
      .get('ProjectEstimation')
      ?.valueChanges.subscribe((value) => {
        this.governmentShareAmount =
          value * ((this.approvalForm.get('GovtShare')?.value || 0) / 100);
      });
    this.approvalForm.get('GovtShare')?.valueChanges.subscribe((value) => {
      this.governmentShareAmount =
        (this.approvalForm.get('ProjectEstimation')?.value || 0) *
        (value / 100);
      this.approvalForm.get('PublicShare')?.setValue(100 - value);
    });
  }

  updateApproval() {
    const payload = {
      ...this.projectData,
      projectEstimation: this.approvalForm.get('ProjectEstimation')?.value,
      governmentShare: this.approvalForm.get('GovtShare')?.value,
      publicShare: this.approvalForm.get('PublicShare')?.value,
    };
    const formData = new FormData();
    formData.append(
      'project',
      new Blob([JSON.stringify(payload)], { type: 'application/json' })
    );
    this.projectDetailsService.updateApproval(formData).subscribe((data) => {
      console.log('...Data', data);
    });
  }
}
