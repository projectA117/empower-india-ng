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

@Component({
  selector: 'app-land-utilization',
  standalone: true,
  imports: [
    ButtonModule,
    TableModule,
    CommonModule,
    ImportsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './land-utilization.component.html',
  styleUrl: './land-utilization.component.scss',
})
export class LandUtilizationComponent implements OnInit {
  @Input() landUtilizationData: any;
  @Input() landUtilizationLookupData: any;
  landUtilizationForm: FormGroup = new FormGroup({});
  landUtilizationDataVisible: boolean = false;
  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.landUtilizationForm = new FormGroup({
      landUtilization: new FormControl('', [Validators.required]),
      areaInAcrs: new FormControl('', [Validators.required]),
    });
  }
  updateLandUtilizationData() {
    this.createForm();
    this.landUtilizationDataVisible = true;
  }
  getutilizationName(id: any) {
    // return this.landUtilizationLookupData.utilization[id].name;
    return this.landUtilizationLookupData.find((x: any) => x.id == id).name;
  }
  editUtilizationData(data: any) {
    this.createForm();
    this.landUtilizationDataVisible = true;
    this.landUtilizationForm.patchValue({
      landUtilization: data.landTypeId,
      areaInAcrs: data.totalArea,
    });
  }
  deleteUtilizationData() {}

  updateoccupationsForm() {
    this.landUtilizationDataVisible = false;
    const payload = {
      id: 1,
      villageId: 1,
      unEmployedYouthVillage: [
        {
          villageId: 1,
          landTypeId: this.landUtilizationForm.get('landUtilization')?.value,
          totalArea: this.landUtilizationForm.get('areaInAcrs')?.value,
        },
      ],
    };
    console.log(payload);
    // this.commonService.saveVilageData(payload).subscribe((data) => {
    //   if (data) {
    //     this.unemployedYouthForm.reset();
    //   }
    // });
  }
}
