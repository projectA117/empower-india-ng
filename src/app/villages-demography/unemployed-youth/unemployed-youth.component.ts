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
  selector: 'app-unemployed-youth',
  standalone: true,
  imports: [
    ButtonModule,
    TableModule,
    CommonModule,
    ImportsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './unemployed-youth.component.html',
  styleUrl: './unemployed-youth.component.scss',
})
export class UnemployedYouthComponent implements OnInit {
  unemployedYouthForm: FormGroup = new FormGroup({});
  unEmployedYouthVillage: any = [];
  unEmployedYouthVisible: boolean = false;
  ngOnInit() {}

  updateunEmployedYouth() {
    this.unEmployedYouthVisible = true;
  }

  createForm() {
    this.unemployedYouthForm = new FormGroup({
      community: new FormControl('', [Validators.required]),
      belowThirty: new FormControl(1234, [Validators.required]),
      belowFortyFive: new FormControl(22, [Validators.required]),
      belowSixty: new FormControl(22, [Validators.required]),
    });
  }
  getTotal() {
    return (
      this.unemployedYouthForm.controls.belowThirty.value +
      this.unemployedYouthForm.controls.belowFortyFive.value +
      this.unemployedYouthForm.controls.belowSixty.value
    );
  }
}
