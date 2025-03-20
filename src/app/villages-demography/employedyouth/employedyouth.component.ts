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
  employedYouthForm: FormGroup = new FormGroup({});
  employedYouthVisible: boolean = false;
  employedYouthVillage: any = [];
  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.employedYouthForm = new FormGroup({
      community: new FormControl('', [Validators.required]),
      government: new FormControl(1234, [Validators.required]),
      private: new FormControl(22, [Validators.required]),
      SelfEmpolyment: new FormControl(22, [Validators.required]),
    });
  }

  updateemployedYouthData() {
    this.employedYouthVisible = true;
  }
}
