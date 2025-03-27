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
  @Input() vilageData: any;
  @Output() closeDialogEvent = new EventEmitter<boolean>();
  landUtilizationForm: FormGroup = new FormGroup({});
  landUtilizationDataVisible: boolean = false;

  landUtilizationEditMode = false;
  landUtilizationEditRecordID: any = null;

  constructor(private commonService: CommonService) {}
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
    this.landUtilizationEditMode = false;
    this.createForm();
    this.landUtilizationDataVisible = true;
  }
  getutilizationName(id: any) {
    // return this.landUtilizationLookupData.utilization[id].name;
    return this.landUtilizationLookupData.find((x: any) => x.id == id).name;
  }
  editUtilizationData(data: any) {
    this.landUtilizationEditMode = true;
    this.createForm();
    this.landUtilizationDataVisible = true;
    this.landUtilizationEditRecordID = data.id;
    this.landUtilizationForm.patchValue({
      landUtilization: data.landTypeId,
      areaInAcrs: data.totalArea,
    });
  }
  deleteUtilizationData() {}

  updatelandUtilizationForm() {
    this.landUtilizationDataVisible = false;
    const payload = {
      id: this.vilageData.id,
      villageId: this.vilageData.villageId,
      landUtilizationVillage: [
        {
          id: this.landUtilizationEditRecordID
            ? this.landUtilizationEditRecordID
            : '',
          villageId: this.vilageData.landUtilizationVillage[0]?.villageId
            ? this.vilageData.landUtilizationVillage[0]?.villageId
            : '',
          landTypeId: this.landUtilizationForm.get('landUtilization')?.value,
          totalArea: this.landUtilizationForm.get('areaInAcrs')?.value,
        },
      ],
    };
    console.log(payload);

    if (!this.landUtilizationEditMode) {
      this.commonService.saveVilageData(payload).subscribe((data) => {
        if (data) {
          this.landUtilizationForm.reset();
          this.closeDialogEvent.emit(true);
        }
      });
    } else {
      this.commonService
        .updateCommunityVilageData(payload)
        .subscribe((data) => {
          if (data) {
            this.landUtilizationForm.reset();
            this.closeDialogEvent.emit(true);
          }
        });
    }
    // this.commonService.saveVilageData(payload).subscribe((data) => {
    //   if (data) {
    //     this.unemployedYouthForm.reset();
    //   }
    // });
  }
}
