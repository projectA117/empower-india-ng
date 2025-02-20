import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-project-approval',
  standalone: true,
  imports: [
    ImportsModule,
    InputTextModule,
    FormsModule,
    DropdownModule,
    ReactiveFormsModule,
  ],
  templateUrl: './project-approval.component.html',
  styleUrl: './project-approval.component.scss',
  providers: [ProjectDetailsService],
})
export class ProjectApprovalComponent implements OnInit {
  value: string | undefined;
  approvalForm: FormGroup = new FormGroup({});

  constructor(private projectDetailsService: ProjectDetailsService) {}
  ngOnInit() {}

  SaveApproval() {
    const payload = {
      // ProjectEstimation: this.approvalForm.get('ProjectEstimation')?.value,
      // GovtShare: this.approvalForm.get('GovtShare')?.value,
      // PublicShare: this.approvalForm.get('PublicShare')?.value,
    };
    this.projectDetailsService.SaveApproval(payload).subscribe((data) => {
      console.log('...Data', data);
    });
  }
}
