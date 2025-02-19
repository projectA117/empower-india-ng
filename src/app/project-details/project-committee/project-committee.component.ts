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
  selector: 'app-project-committee',
  standalone: true,
  imports: [ButtonModule, TableModule, CommonModule],
  templateUrl: './project-committee.component.html',
  styleUrl: './project-committee.component.scss',
  providers: [ProjectDetailsService],
})
export class ProjectCommitteeComponent implements OnInit {
  products!: Product[];
  Committee: any = [
    {
      id: 1,
      firstName: 'Swetha',
      lastName: 'R',
      fatherName: 'Satya',
      address: '123 Main Street, Jax',
      phoneNumber: '555-1234',
      email: 'swetha.r@gmail.com',
      recordType: 'active',
      villageId: 101,
      createdBy: 'Admin',
      createdDate: '2025-02-17T09:30:00',
      lastUpdatedBy: 'Admin',
      lastUpdatedDate: '2025-02-17T09:30:00',
    },
  ];
  constructor(
    private productService: ProductService,
    private projectDetailsService: ProjectDetailsService
  ) {}
  ngOnInit() {
    this.productService.getProductsMini().then((data) => {
      this.products = data;
    });
  }

  getMandals(event: any) {
    this.projectDetailsService.showCommittee().subscribe(
      (data) => {
        this.Committee = data;
      },
      (err) => {
        //Temp fix for Gopi
        this.Committee = this.Committee;
      }
    );
  }
}
