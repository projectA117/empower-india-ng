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
  selector: 'app-project-finance',
  standalone: true,
  imports: [ButtonModule, TableModule, CommonModule],
  templateUrl: './project-finance.component.html',
  styleUrl: './project-finance.component.scss',
  providers: [ProjectDetailsService, ProductService],
})
export class ProjectFinanceComponent implements OnInit {
  showTransaction!: [];

  constructor(
    private productService: ProductService,
    private projectDetailsService: ProjectDetailsService
  ) {}
  ngOnInit() {
    this.projectDetailsService.showTransaction().subscribe((data) => {
      this.showTransaction = data;
    });
  }
}
