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
  selector: 'app-main-occupation',
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
  templateUrl: './main-occupation.component.html',
  styleUrl: './main-occupation.component.scss',
})
export class MainOccupationComponent implements OnInit {
  @Input() occupationsData: any;
  @Input() occupationsLookupData: any;
  @Input() vilageData: any;
  @Output() closeDialogEvent = new EventEmitter<boolean>();
  occupationsForm: FormGroup = new FormGroup({});
  occupationsDataVisible: boolean = false;

  occupationsEditMode = false;
  occupationsEditRecordID: any = null;
  constructor(private commonService: CommonService) {}
  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.occupationsForm = new FormGroup({
      occupation: new FormControl('', [Validators.required]),
      NumberofFamilies: new FormControl(0, [Validators.required]),
    });
  }

  updateOccupationsData() {
    this.occupationsEditMode = false;
    this.createForm();
    this.occupationsDataVisible = true;
  }
  getOccupationName(id: any) {
    return this.occupationsLookupData.find((x: any) => x.id == id).name;
  }
  editOccupationsData(data: any) {
    this.occupationsEditMode = true;
    this.occupationsDataVisible = true;
    this.createForm();
    this.occupationsEditRecordID = data.id;
    this.occupationsForm.patchValue({
      occupation: data.occupationId,
      NumberofFamilies: data.noOfFamilies,
    });
  }
  deleteOccupationsData(data: any) {}

  updateoccupationsForm() {
    this.occupationsDataVisible = false;
    const payload = {
      id: this.vilageData.id,
      villageId: this.vilageData.villageId,
      occupations: [
        {
          id: this.occupationsEditRecordID ? this.occupationsEditRecordID : '',
          villageId: this.vilageData.populations[0].villageId,
          occupationId: this.occupationsForm.get('occupation')?.value,
          noOfFamilies: this.occupationsForm.get('NumberofFamilies')?.value,
        },
      ],
    };
    console.log(payload);
    // this.commonService.saveVilageData(payload).subscribe((data) => {
    //   if (data) {
    //     this.unemployedYouthForm.reset();
    //   }
    // });

    if (!this.occupationsEditMode) {
      this.commonService.saveVilageData(payload).subscribe((data) => {
        if (data) {
          this.occupationsForm.reset();
          this.closeDialogEvent.emit(true);
        }
      });
    } else {
      this.commonService
        .updateCommunityVilageData(payload)
        .subscribe((data) => {
          if (data) {
            this.occupationsForm.reset();
            this.closeDialogEvent.emit(true);
          }
        });
    }
  }
}
