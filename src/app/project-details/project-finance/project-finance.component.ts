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
  selector: 'app-project-finance',
  standalone: true,
  imports: [
    ButtonModule,
    TableModule,
    CommonModule,
    ImportsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './project-finance.component.html',
  styleUrl: './project-finance.component.scss',
  providers: [ProjectDetailsService, ProductService],
})
export class ProjectFinanceComponent implements OnInit {
  @Input() projectData: any;
  showTransaction!: [
    {
      id: 2;
      villageProjectId: 5;
      expenseCategoryId: 1;
      transactionAmount: 1500.75;
      paymentMode: 'Credit Card';
      transactionDate: '2025-02-17T10:00:00';
      committeeId: 1;
      createdDate: '2025-02-17T10:00:00';
      createdBy: 'admin';
      lastUpdatedDate: '2025-02-17T10:00:00';
      lastUpdatedBy: 'admin';
    }
  ];
  financeSidebarVisible: boolean = false;
  FinanceForm: FormGroup = new FormGroup({});
  constructor(
    private productService: ProductService,
    private projectDetailsService: ProjectDetailsService
  ) {}
  ngOnInit() {
    this.showTransactionData();

    this.createFinanceForm();
  }
  showTransactionData() {
    this.projectDetailsService
      .showTransaction(this.projectData.id)
      .subscribe((data) => {
        this.showTransaction = data.transactions;
      });
  }
  createFinanceForm() {
    this.FinanceForm = new FormGroup({
      financeDate: new FormControl(''),
      financeExpenseType: new FormControl(''),
      financeAmount: new FormControl(''),
      financeSpentBy: new FormControl(''),
      financePaidto: new FormControl(''),
      financeModeofPayment: new FormControl(''),
      financeApprovedBy: new FormControl(''),
      financeDescription: new FormControl(''),
      financeBillProofs: new FormControl(''),
    });
  }

  addExpence() {
    const payload = {
      financeDate: this.FinanceForm.get('financeDate')?.value,
      financeExpenseType: this.FinanceForm.get('financeExpenseType')?.value,
      financeAmount: this.FinanceForm.get('financeAmount')?.value,
      financeSpentBy: this.FinanceForm.get('financeSpentBy')?.value,
      villageId: this.projectData.villageId,
      financePaidto: this.FinanceForm.get('financePaidto')?.value,
      id: this.projectData.id,
      financeModeofPayment: this.FinanceForm.get('financeModeofPayment')?.value,
      financeApprovedBy: this.FinanceForm.get('financeApprovedBy')?.value,
      financeDescription: this.FinanceForm.get('financeDescription')?.value,
      financeBillProofs: this.FinanceForm.get('financeBillProofs')?.value,
    };

    this.projectDetailsService.addFinanceExpence(payload).subscribe((data) => {
      console.log('...Data', data);
      if (data) {
        this.showTransactionData();
      }
    });
  }
}
