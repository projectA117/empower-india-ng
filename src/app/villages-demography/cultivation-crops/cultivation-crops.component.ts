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
  selector: 'app-cultivation-crops',
  standalone: true,
  imports: [
    ButtonModule,
    TableModule,
    CommonModule,
    ImportsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './cultivation-crops.component.html',
  styleUrl: './cultivation-crops.component.scss',
})
export class CultivationCropsComponent implements OnInit {
  cultivationDataForm: FormGroup = new FormGroup({});
  cultivationCropsData: any = [];
  cultivationDataVisible: boolean = false;
  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.cultivationDataForm = new FormGroup({
      community: new FormControl('', [Validators.required]),
      government: new FormControl(1234, [Validators.required]),
      private: new FormControl(22, [Validators.required]),
      SelfEmpolyment: new FormControl(22, [Validators.required]),
    });
  }
  updateCultivationCropsData() {
    this.cultivationDataVisible = true;
  }
}
