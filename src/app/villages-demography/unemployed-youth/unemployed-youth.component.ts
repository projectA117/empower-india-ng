import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
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
  selector: 'app-unemployed-youth',
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
  templateUrl: './unemployed-youth.component.html',
  styleUrl: './unemployed-youth.component.scss',
})
export class UnemployedYouthComponent implements OnInit {
  @Input() unemployedData: any;
  @Input() communityData: any;
  @Input() vilageData: any;
  @Input() selectedVilageData: any;
  @Output() closeDialogEvent = new EventEmitter<boolean>();
  CommunityPopulationData: any = [];
  unemployedYouthForm: FormGroup = new FormGroup({});
  unEmployedYouthVillage: any = [];
  unEmployedYouthVisible: boolean = false;
  editUnEmployedYouth: boolean = false;
  unEmployedYouthEditRecordID: any = null;
  unEmployedYouthEditMode = false;

  constructor(private commonService: CommonService) {}
  ngOnInit() {
    this.createForm();
  }

  updateunEmployedYouth() {
    this.createForm();
    this.unEmployedYouthVisible = true;
    this.unEmployedYouthEditMode = false;
  }

  createForm() {
    this.unemployedYouthForm = new FormGroup({
      community: new FormControl('', [Validators.required]),
      belowThirty: new FormControl(0, [Validators.required]),
      belowFortyFive: new FormControl(0, [Validators.required]),
      belowSixty: new FormControl(0, [Validators.required]),
    });
  }
  getTotal() {
    return (
      this.unemployedYouthForm.controls.belowThirty.value +
      this.unemployedYouthForm.controls.belowFortyFive.value +
      this.unemployedYouthForm.controls.belowSixty.value
    );
  }
  getCommunityName(id: any) {
    return this.communityData.find((x: any) => x.id == id).name;
  }
  editUnEmployeeData(data: any) {
    this.unEmployedYouthEditMode = true;
    this.unEmployedYouthVisible = true;
    this.unEmployedYouthEditRecordID = data.id;
    this.createForm();
    this.unemployedYouthForm.patchValue({
      community: data.communityId,
      belowThirty: data.age1830,
      belowFortyFive: data.age3145,
      belowSixty: data.age4660,
    });
  }
  deleteUnEmployeeData(data: any) {}

  ShowVilage() {
    if (this.selectedVilageData?.id) {
      return true;
    } else {
      return false;
    }
  }

  updateunEmployedYouthForm() {
    this.unEmployedYouthVisible = false;
    const payload = {
      id: this.vilageData?.id,
      villageId: this.vilageData?.villageId,
      unEmployedYouthVillage: [
        {
          id: this.unEmployedYouthEditRecordID
            ? this.unEmployedYouthEditRecordID
            : '',
          villageId: this.vilageData.populations[0].villageId,
          communityId: this.unemployedYouthForm.get('community')?.value,
          age1830: this.unemployedYouthForm.get('belowThirty')?.value,
          age3145: this.unemployedYouthForm.get('belowFortyFive')?.value,
          age4660: this.unemployedYouthForm.get('belowSixty')?.value,
          total:
            this.unemployedYouthForm.get('belowThirty')?.value +
            this.unemployedYouthForm.get('belowFortyFive')?.value +
            this.unemployedYouthForm.get('belowSixty')?.value,
        },
      ],
    };
    if (!this.vilageData.id) {
      this.commonService.saveVilageData(payload).subscribe((data) => {
        if (data) {
          this.unemployedYouthForm.reset();
          this.closeDialogEvent.emit(true);
        }
      });
    } else {
      this.commonService
        .updateCommunityVilageData(payload)
        .subscribe((data) => {
          if (data) {
            this.unemployedYouthForm.reset();
            this.closeDialogEvent.emit(true);
          }
        });
    }
  }
}
