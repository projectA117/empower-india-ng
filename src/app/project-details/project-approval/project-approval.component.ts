import { Component, Input, OnInit } from '@angular/core';
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
  ],
  templateUrl: './project-approval.component.html',
  styleUrl: './project-approval.component.scss',
  providers: [ProjectDetailsService],
})
export class ProjectApprovalComponent implements OnInit {
  @Input() projectData: any;
  value: string | undefined;
  approvalForm: FormGroup = new FormGroup({});
  value1: number;
  constructor(private projectDetailsService: ProjectDetailsService) {}
  ngOnInit() {
    if (this.approvalForm) {
      this.createapprovalForm();
    }
  }
  createapprovalForm() {
    this.approvalForm = new FormGroup({
      ProjectEstimation: new FormControl(this.projectData?.projectEstimation),
      GovtShare: new FormControl(this.projectData?.governmentShare),
      PublicShare: new FormControl(this.projectData?.publicShare),
    });
  }
  updateApproval() {
    const payload = {
      ...this.projectData,
      projectEstimation: this.approvalForm.get('ProjectEstimation')?.value,
      governmentShare: this.approvalForm.get('GovtShare')?.value,
      publicShare: this.approvalForm.get('PublicShare')?.value,
    };
    this.projectDetailsService.updateApproval(payload).subscribe((data) => {
      console.log('...Data', data);
    });
  }
}
