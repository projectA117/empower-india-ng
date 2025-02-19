import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ProductService } from '@service/productservice';

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
  selector: 'app-project-vendors',
  standalone: true,
  imports: [ButtonModule, TableModule, CommonModule],
  templateUrl: './project-vendors.component.html',
  styleUrl: './project-vendors.component.scss',
})
export class ProjectVendorsComponent implements OnInit {
  products!: Product[];

  constructor(private productService: ProductService) {}
  ngOnInit() {
    this.productService.getProductsMini().then((data) => {
      this.products = data;
    });
  }
}
