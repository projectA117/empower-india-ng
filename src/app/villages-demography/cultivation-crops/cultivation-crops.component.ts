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
  selector: 'app-cultivation-crops',
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
  templateUrl: './cultivation-crops.component.html',
  styleUrl: './cultivation-crops.component.scss',
})
export class CultivationCropsComponent implements OnInit {
  @Input() cultivationCropsData: any;
  @Input() cultivationCropsLookupData: any;
  @Input() vilageData: any;
  @Output() closeDialogEvent = new EventEmitter<boolean>();
  cultivationDataForm: FormGroup = new FormGroup({});

  cultivationSeasons: any[] = [
    { name: 'Rabi', id: 'rabi' },
    { name: 'kharif', id: 'kharif' },
    { name: 'All seasons', id: 'All' },
  ];
  cultivationEditMode = false;
  cultivationEditRecordID: any = null;
  cultivationDataVisible: boolean = false;

  constructor(private commonService: CommonService) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.cultivationDataForm = new FormGroup({
      cultivationCrop: new FormControl('', [Validators.required]),
      areainAcrs: new FormControl('', [Validators.required]),
      seasonsAll: new FormControl('', [Validators.required]),
    });
  }
  updateCultivationCropsData() {
    this.cultivationEditMode = false;
    this.createForm();
    this.cultivationDataVisible = true;
  }

  getcultivationCropsName(id: any) {
    return this.cultivationCropsLookupData.find((x: any) => x.id == id).name;
  }
  editCultivationData(cultivationData: any) {
    this.cultivationEditMode = true;
    this.cultivationEditRecordID = cultivationData.id;
    this.createForm();
    this.cultivationDataForm.patchValue({
      cultivationCrop: cultivationData.cultivationId,
      seasonsAll: cultivationData.seasonsAll,
      areainAcrs: cultivationData.totalAcrs,
    });
    this.cultivationDataVisible = true;
  }
  deleteCultivationData(cultivationData: any) {}

  updateCultivationDataForm() {
    this.cultivationDataVisible = false;
    const payload = {
      id: this.vilageData.id,
      villageId: this.vilageData.villageId,
      cultivationCropsVillage: [
        {
          villageId: this.cultivationEditRecordID
            ? this.cultivationEditRecordID
            : '',
          cultivationId: this.cultivationDataForm.get('cultivationCrop')?.value,
          seasonName: this.cultivationDataForm.get('seasonsAll')?.value,
          totalAcrs: this.cultivationDataForm.get('areainAcrs')?.value,
        },
      ],
    };
    console.log(payload);
    // this.commonService.saveVilageData(payload).subscribe((data) => {
    //   if (data) {
    //     this.cultivationDataForm.reset();
    //   }
    // });

    if (!this.cultivationEditMode) {
      this.commonService.saveVilageData(payload).subscribe((data) => {
        if (data) {
          this.cultivationDataForm.reset();
          this.closeDialogEvent.emit(true);
        }
      });
    } else {
      this.commonService
        .updateCommunityVilageData(payload)
        .subscribe((data) => {
          if (data) {
            this.cultivationDataForm.reset();
            this.closeDialogEvent.emit(true);
          }
        });
    }
  }
}
