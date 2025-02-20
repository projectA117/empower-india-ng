import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ProductService } from '@service/productservice';
import { ProjectDetailsService } from '@service/project-details.service';
import { ImportsModule } from 'src/app/imports';
import { CommonService } from '@service/common.service';

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
  selector: 'app-project-donors',
  standalone: true,
  imports: [ButtonModule, TableModule, CommonModule, ImportsModule],
  templateUrl: './project-donors.component.html',
  styleUrl: './project-donors.component.scss',
  providers: [ProjectDetailsService, CommonService, ProductService],
})
export class ProjectDonorsComponent implements OnInit {
  doners!: [];

  constructor(
    private productService: ProductService,
    private projectDetailsService: ProjectDetailsService,
    private commonService: CommonService
  ) {}
  ngOnInit() {
    this.projectDetailsService.showDonars().subscribe((data) => {
      this.doners = data;
    });
  }
}
