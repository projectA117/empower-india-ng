import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
import { CommonService } from '@service/common.service';
import { RoleDirective } from 'src/directives/role-access.directive';

@Component({
  selector: 'app-community-wise-population',
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
  templateUrl: './community-wise-population.component.html',
  styleUrl: './community-wise-population.component.scss',
})
export class CommunityWisePopulationComponent implements OnInit {
  @Input() villagesDemographyData: any;
  @Input() communityData: any;
  @Input() vilageData: any;
  @Output() closeDialogEvent = new EventEmitter<boolean>();
  communityWisePopulationForm: FormGroup = new FormGroup({});
  CommunityPopulationData: any = [];
  communityWisePopulationVisible: boolean = false;
  communityEditMode = false;
  communityEditRecordID: any = null;
  constructor(private commonService: CommonService) {}

  ngOnInit() {
    this.CommunityPopulationData = this.villagesDemographyData;
    console.log(this.CommunityPopulationData);
  }

  updatePopulationData() {
    this.communityEditMode = false;
    this.communityWisePopulationVisible = true;
    this.createForm();
  }

  createForm() {
    this.communityWisePopulationForm = new FormGroup({
      community: new FormControl('', [Validators.required]),
      communityFemale: new FormControl(0, [Validators.required]),
      communityMale: new FormControl(0, [Validators.required]),
    });
  }
  getTotal() {
    return (
      this.communityWisePopulationForm.controls.communityFemale.value +
      this.communityWisePopulationForm.controls.communityMale.value
    );
  }

  getCommunityName(id: any) {
    return this.communityData.find((x: any) => x.id == id).name;
  }

  updateCommunityForm() {
    this.communityWisePopulationVisible = false;
    const payload = {
      id: this.vilageData.id,
      villageId: this.vilageData.villageId,
      populations: [
        {
          id: this.communityEditRecordID ? this.communityEditRecordID : '',
          villageId: this.vilageData.populations[0].villageId,
          communityId: this.communityWisePopulationForm.get('community')?.value,
          male: this.communityWisePopulationForm.get('communityMale')?.value,
          female:
            this.communityWisePopulationForm.get('communityFemale')?.value,
          total:
            this.communityWisePopulationForm.get('communityFemale')?.value +
            this.communityWisePopulationForm.get('communityMale')?.value,
        },
      ],
    };
    if (!this.vilageData.id) {
      this.commonService.saveVilageData(payload).subscribe((data) => {
        if (data) {
          this.communityWisePopulationForm.reset();
          this.closeDialogEvent.emit(true);
        }
      });
    } else {
      this.commonService
        .updateCommunityVilageData(payload)
        .subscribe((data) => {
          if (data) {
            this.communityWisePopulationForm.reset();
            this.closeDialogEvent.emit(true);
          }
        });
    }
  }

  editPoplationData(data: any) {
    this.communityEditMode = true;
    this.communityWisePopulationVisible = true;
    this.communityEditRecordID = data.id;
    this.createForm();
    this.communityWisePopulationForm.patchValue({
      community: data.communityId,
      communityFemale: data.female,
      communityMale: data.male,
    });
  }

  deletePoplationData(data: any) {}
}
