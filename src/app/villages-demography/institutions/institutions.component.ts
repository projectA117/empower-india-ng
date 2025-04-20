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
  selector: 'app-institutions',
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
  templateUrl: './institutions.component.html',
  styleUrl: './institutions.component.scss',
})
export class InstitutionsComponent implements OnInit {
  @Input() institutionsData: any = {};
  @Input() institutionsLookupData: any = {};
  @Input() selectedVilageData: any;
  @Input() vilageData: any;
  @Output() closeDialogEvent = new EventEmitter<boolean>();
  institutionsDataVisible: boolean = false;
  institutionDataForm: FormGroup = new FormGroup({});
  selectedInstitutions: any = {};

  institutionsEditMode = false;
  institutionsEditRecordID: any = null;

  constructor(private commonService: CommonService) {}
  ngOnInit() {}
  updateInstitutionsData() {
    this.institutionsEditMode = false;
    this.institutionsDataVisible = true;
    this.createForm();
  }
  createForm() {
    this.institutionDataForm = new FormGroup({
      institutions: new FormControl('', [Validators.required]),
    });
  }
  getInstitutionName(id: any) {
    return this.institutionsLookupData.find((x: any) => x.id == id).name;
  }

  ShowVilage() {
    if (this.selectedVilageData?.id) {
      return true;
    } else {
      return false;
    }
  }

  updateInstitutionDataForm() {
    this.institutionsDataVisible = false;
    const payload = {
      id: this.vilageData.id,
      villageId: this.vilageData.villageId,
      institutionsVillages: [
        {
          id: this.institutionsEditRecordID
            ? this.institutionsEditRecordID
            : '',
          villageId: this.vilageData.institutionsVillages[0]?.villageId,
          instituteId: this.institutionDataForm.get('institutions')?.value,
        },
      ],
    };
    console.log(payload);
    // this.commonService.saveVilageData(payload).subscribe((data) => {
    //   if (data) {
    //     this.unemployedYouthForm.reset();
    //   }
    // });

    if (!this.institutionsEditMode) {
      this.commonService.saveVilageData(payload).subscribe((data) => {
        if (data) {
          this.institutionDataForm.reset();
          this.closeDialogEvent.emit(true);
        }
      });
    } else {
      this.commonService
        .updateCommunityVilageData(payload)
        .subscribe((data) => {
          if (data) {
            this.institutionDataForm.reset();
            this.closeDialogEvent.emit(true);
          }
        });
    }
  }
}
