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
  employedYouthForm: FormGroup = new FormGroup({});
  employedYouthVisible: boolean = false;
  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.employedYouthForm = new FormGroup({
      community: new FormControl('', [Validators.required]),
      government: new FormControl('', [Validators.required]),
      private: new FormControl('', [Validators.required]),
      SelfEmpolyment: new FormControl('', [Validators.required]),
    });
  }

  updateemployedYouthData() {
    this.employedYouthVisible = true;
  }
  getCommunityName(id: any) {
    return this.communityData.find((x: any) => x.id == id).name;
  }
  editemployedData(data: any) {
    this.employedYouthVisible = true;
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
      id: 1,
      villageId: 1,
      unEmployedYouthVillage: [
        {
          villageId: 1,
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
  }
}
