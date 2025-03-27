import { Component, inject, Input } from '@angular/core';
import { ProjectDetailsService } from '@service/project-details.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-project-publish',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './project-publish.component.html',
  styleUrl: './project-publish.component.scss',
})
export class ProjectPublishComponent {
  @Input() projectData: any;
  isEstimationComplete: boolean = false;
  isBankDetailsPresent: boolean = false;
  isCommittee: boolean = false;

  private projectDetailsService = inject(ProjectDetailsService);

  ngOnInit() {
    this.getBankDetails();
    this.getCommitteeDetails();
    this.isEstimationComplete = this.projectData?.projectEstimation > 0;
  }

  getBankDetails() {
    this.projectDetailsService
      .getBankDetails(this.projectData.id)
      .subscribe((data) => {
        if (data && data.length >= 1) {
          this.isBankDetailsPresent = true;
        }
      });
  }

  getCommitteeDetails() {
    this.projectDetailsService
      .showCommittee(this.projectData.id)
      .subscribe((data) => {
        if (data && data.length >= 2) {
          this.isCommittee = true;
        }
      });
  }

  onProjectPublish() {
    const payload = {
      committeeFormed: this.isCommittee,
      bankDetailsAdded: this.isBankDetailsPresent,
      estimationAdded: this.isEstimationComplete,
    };
    this.projectDetailsService
      .publishProject(payload, this.projectData.id)
      .subscribe((data) => {
        console.log(data);
      });
  }
}
