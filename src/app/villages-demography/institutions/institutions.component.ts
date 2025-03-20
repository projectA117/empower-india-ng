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
  institutionsData: any = [];
  institutionsDataVisible: boolean = false;
  institutionDataForm: FormGroup = new FormGroup({});
  ngOnInit() {}
  updateInstitutionsData() {
    this.institutionsDataVisible = true;
    this.createForm();
  }
  createForm() {
    this.institutionDataForm = new FormGroup({
      Institutions: new FormControl('', [Validators.required]),
    });
  }
}
