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
  occupationsForm: FormGroup = new FormGroup({});
  occupationsData: any = [];
  occupationsDataVisible: boolean = false;
  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.occupationsForm = new FormGroup({
      community: new FormControl('', [Validators.required]),
      government: new FormControl(1234, [Validators.required]),
      private: new FormControl(22, [Validators.required]),
      SelfEmpolyment: new FormControl(22, [Validators.required]),
    });
  }

  updateOccupationsData() {
    this.occupationsDataVisible = true;
  }
}
