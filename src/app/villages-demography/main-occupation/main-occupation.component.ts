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
  selector: 'app-main-occupation',
  standalone: true,
  imports: [
    ButtonModule,
    TableModule,
    CommonModule,
    ImportsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './main-occupation.component.html',
  styleUrl: './main-occupation.component.scss',
})
export class MainOccupationComponent implements OnInit {
  @Input() occupationsData: any;
  @Input() occupationsLookupData: any;
  occupationsForm: FormGroup = new FormGroup({});
  occupationsDataVisible: boolean = false;
  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.occupationsForm = new FormGroup({
      occupation: new FormControl('', [Validators.required]),
      NumberofFamilies: new FormControl('', [Validators.required]),
    });
  }

  updateOccupationsData() {
    this.createForm();
    this.occupationsDataVisible = true;
  }
  getOccupationName(id: any) {
    return this.occupationsLookupData.find((x: any) => x.id == id).name;
  }
  editOccupationsData(data: any) {
    this.occupationsDataVisible = true;
    this.createForm();
    this.occupationsForm.patchValue({
      occupation: data.occupationId,
      NumberofFamilies: data.noOfFamilies,
    });
  }
  deleteOccupationsData(data: any) {}

  updateoccupationsForm() {
    this.occupationsDataVisible = false;
    const payload = {
      id: 1,
      villageId: 1,
      unEmployedYouthVillage: [
        {
          villageId: 1,
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
  }
}
