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
  selector: 'app-community-wise-population',
  standalone: true,
  imports: [
    ButtonModule,
    TableModule,
    CommonModule,
    ImportsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './community-wise-population.component.html',
  styleUrl: './community-wise-population.component.scss',
})
export class CommunityWisePopulationComponent implements OnInit {
  communityWisePopulationForm: FormGroup = new FormGroup({});
  @Input() projectData: any;
  CommunityPopulationData: any = [];
  communityWisePopulationVisible: boolean = false;

  ngOnInit() {}

  updatePopulationData() {
    this.communityWisePopulationVisible = true;
    this.createForm();
  }

  createForm() {
    this.communityWisePopulationForm = new FormGroup({
      community: new FormControl('', [Validators.required]),
      communityFemale: new FormControl(1234, [Validators.required]),
      communityMale: new FormControl(22, [Validators.required]),
    });
  }
  getTotal() {
    return (
      this.communityWisePopulationForm.controls.communityFemale.value +
      this.communityWisePopulationForm.controls.communityMale.value
    );
  }
}
