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
  selector: 'app-employedyouth',
  standalone: true,
  imports: [
    ButtonModule,
    TableModule,
    CommonModule,
    ImportsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './employedyouth.component.html',
  styleUrl: './employedyouth.component.scss',
})
export class EmployedyouthComponent implements OnInit {
  @Input() employedYouthVillage: any;
  @Input() communityData: any;
  @Input() vilageData: any;
  employedyouthEditMode = false;
  employedyouthEditRecordID: any = null;
  employedYouthForm: FormGroup = new FormGroup({});
  employedYouthVisible: boolean = false;

  constructor(private commonService: CommonService) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.employedYouthForm = new FormGroup({
      community: new FormControl('', [Validators.required]),
      government: new FormControl(0, [Validators.required]),
      private: new FormControl(0, [Validators.required]),
      SelfEmpolyment: new FormControl(0, [Validators.required]),
    });
  }

  updateemployedYouthData() {
    this.employedyouthEditMode = false;
    this.createForm();
    this.employedYouthVisible = true;
  }
  getCommunityName(id: any) {
    return this.communityData.find((x: any) => x.id == id).name;
  }
  editemployedData(data: any) {
    this.employedYouthVisible = true;
    this.employedyouthEditRecordID = data.id;
    this.createForm();
    this.employedYouthForm.patchValue({
      community: data.communityId,
      government: data.government,
      private: data.privateJob,
      SelfEmpolyment: data.selfEmployee,
    });
  }
  deleteemployedData(data: any) {}

  updateEmployedYouthForm() {
    this.employedYouthVisible = false;
    const payload = {
      id: this.vilageData.id,
      villageId: this.vilageData.villageId,
      employedYouthVillage: [
        {
          villageId: this.employedyouthEditRecordID
            ? this.employedyouthEditRecordID
            : '',
          communityId: this.employedYouthForm.get('community')?.value,
          government: this.employedYouthForm.get('government')?.value,
          privateJob: this.employedYouthForm.get('private')?.value,
          selfEmployee: this.employedYouthForm.get('SelfEmpolyment')?.value,
          total:
            this.employedYouthForm.get('government')?.value +
            this.employedYouthForm.get('private')?.value +
            this.employedYouthForm.get('SelfEmpolyment')?.value,
        },
      ],
    };
    console.log(payload);
    // this.commonService.saveVilageData(payload).subscribe((data) => {
    //   if (data) {
    //     this.unemployedYouthForm.reset();
    //   }
    // });

    if (!this.employedyouthEditMode) {
      this.commonService.saveVilageData(payload).subscribe((data) => {
        if (data) {
          this.employedYouthForm.reset();
        }
      });
    } else {
      this.commonService
        .updateCommunityVilageData(payload)
        .subscribe((data) => {
          if (data) {
            this.employedYouthForm.reset();
          }
        });
    }
  }
}
