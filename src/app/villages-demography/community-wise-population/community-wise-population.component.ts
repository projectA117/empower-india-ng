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
import { CommonService } from '@service/common.service';

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
  ],
  templateUrl: './community-wise-population.component.html',
  styleUrl: './community-wise-population.component.scss',
})
export class CommunityWisePopulationComponent implements OnInit {
  @Input() villagesDemographyData: any;
  @Input() communityData: any;
  communityWisePopulationForm: FormGroup = new FormGroup({});
  CommunityPopulationData: any = [];
  communityWisePopulationVisible: boolean = false;
  communityEditMode = false;
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
      id: 1,
      villageId: 1,
      populations: [
        {
          villageId: 1,
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
    if (!this.communityEditMode) {
      this.commonService.saveVilageData(payload).subscribe((data) => {
        if (data) {
          this.communityWisePopulationForm.reset();
        }
      });
    } else {
      this.commonService
        .updateCommunityVilageData(payload)
        .subscribe((data) => {
          if (data) {
            this.communityWisePopulationForm.reset();
          }
        });
    }
  }

  editPoplationData(data: any) {
    this.communityEditMode = true;
    this.communityWisePopulationVisible = true;
    this.createForm();
    this.communityWisePopulationForm.patchValue({
      community: data.communityId,
      communityFemale: data.female,
      communityMale: data.male,
    });
  }

  deletePoplationData(data: any) {}
}
