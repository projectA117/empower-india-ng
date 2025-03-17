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

export interface Product {
  id?: string;
  code?: string;
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  inventoryStatus?: string;
  category?: string;
  image?: string;
  rating?: number;
}

@Component({
  selector: 'app-project-work-in-progress',
  standalone: true,
  imports: [
    ButtonModule,
    TableModule,
    CommonModule,
    ImportsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './project-work-in-progress.component.html',
  styleUrl: './project-work-in-progress.component.scss',
  providers: [ProjectDetailsService, ProductService],
})
export class ProjectWorkInProgressComponent implements OnInit {
  @Input() projectData: any;
  WIPDetails: any;
  WIPSidebarVisible: boolean = false;
  WIPForm: FormGroup = new FormGroup({});
  constructor(
    private productService: ProductService,
    private projectDetailsService: ProjectDetailsService
  ) {}
  ngOnInit() {
    this.shoiwWIPDetails();
    this.createWIPFormForm();
  }

  createWIPFormForm() {
    this.WIPForm = new FormGroup({
      WIPDate: new FormControl('', [Validators.required]),
      WIPDescription: new FormControl('', [Validators.required]),
      WIPAuditor: new FormControl('', [Validators.required]),
      // WIPPhotosVideos: new FormControl('', [Validators.required]),
    });
  }

  shoiwWIPDetails() {
    this.productService.getProductsMini().then((data) => {
      this.WIPDetails = data;
    });
  }
  updateWIPForm() {}
}
