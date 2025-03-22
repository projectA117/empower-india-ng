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
  selector: 'app-institutions',
  standalone: true,
  imports: [
    ButtonModule,
    TableModule,
    CommonModule,
    ImportsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './institutions.component.html',
  styleUrl: './institutions.component.scss',
})
export class InstitutionsComponent implements OnInit {
  @Input() institutionsData: any = {};
  @Input() institutionsLookupData: any = {};
  institutionsDataVisible: boolean = false;
  institutionDataForm: FormGroup = new FormGroup({});
  selectedInstitutions: any = {};
  ngOnInit() {}
  updateInstitutionsData() {
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

  updateInstitutionDataForm() {
    this.institutionsDataVisible = false;
    const payload = {
      id: 1,
      villageId: 1,
      unEmployedYouthVillage: [
        {
          villageId: 1,
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
  }
}
