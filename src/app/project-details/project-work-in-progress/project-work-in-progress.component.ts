import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ProductService } from '@service/productservice';
import { ProjectDetailsService } from '@service/project-details.service';

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
  imports: [ButtonModule, TableModule, CommonModule],
  templateUrl: './project-work-in-progress.component.html',
  styleUrl: './project-work-in-progress.component.scss',
  providers: [ProjectDetailsService, ProductService],
})
export class ProjectWorkInProgressComponent implements OnInit {
  products!: Product[];

  constructor(
    private productService: ProductService,
    private projectDetailsService: ProjectDetailsService
  ) {}
  ngOnInit() {
    this.productService.getProductsMini().then((data) => {
      this.products = data;
    });
  }
}
