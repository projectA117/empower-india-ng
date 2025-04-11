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
import { RoleDirective } from 'src/directives/role-access.directive';

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
    RoleDirective,
  ],
  templateUrl: './project-finance.component.html',
  styleUrl: './project-finance.component.scss',
  providers: [ProjectDetailsService, ProductService],
})
export class ProjectFinanceComponent implements OnInit {
  @Input() projectData: any;
  showTransaction!: [];
  remainingBalance: number = 0;
  totalExpenses: number = 0;
  totalFunds: number = 0;
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
        this.totalFunds = data.totalFunds;
        this.totalExpenses = data.totalExpenses;
        this.remainingBalance = data.remainingBalance;
        this.showTransaction = data.transactions;
      });
  }
  createFinanceForm() {
    this.FinanceForm = new FormGroup({
      financeDate: new FormControl('', [Validators.required]),
      financeExpenseType: new FormControl('', [Validators.required]),
      financeAmount: new FormControl('', [Validators.required]),
      financeSpentBy: new FormControl('', [Validators.required]),
      financePaidto: new FormControl('', [Validators.required]),
      financeModeofPayment: new FormControl('', [Validators.required]),
      financeApprovedBy: new FormControl('', [Validators.required]),
      financeDescription: new FormControl('', [Validators.required]),
      financeBillProofs: new FormControl(''),
    });
  }

  addExpence() {
    const payload = {
      villageProjectId: this.projectData.id,
      transactionAmount: this.FinanceForm.get('financeAmount')?.value,
      paymentMode: this.FinanceForm.get('financeModeofPayment')?.value,
      transactionDate: this.FinanceForm.get('financeDate')?.value,
      createdDate: '2025-04-11T14:52:50.310Z',
      paidTo: this.FinanceForm.get('financePaidto')?.value,
      expenseType: this.FinanceForm.get('financeExpenseType')?.value,
      description: this.FinanceForm.get('financeDescription')?.value,
      billProofs: this.FinanceForm.get('financeBillProofs')?.value
        ? this.FinanceForm.get('financeBillProofs')?.value
        : 'No',
      spentBy: this.FinanceForm.get('financeSpentBy')?.value,
      approvedBy: this.FinanceForm.get('financeApprovedBy')?.value,
      // financeDate: this.FinanceForm.get('financeDate')?.value,
      // financeExpenseType: this.FinanceForm.get('financeExpenseType')?.value,
      // financeAmount: this.FinanceForm.get('financeAmount')?.value,
      // financeSpentBy: this.FinanceForm.get('financeSpentBy')?.value,
      // villageId: this.projectData.villageId,
      // villageProjectId: this.projectData.id,
      // financePaidto: this.FinanceForm.get('financePaidto')?.value,
      // id: this.projectData.id,
      // financeModeofPayment: this.FinanceForm.get('financeModeofPayment')?.value,
      // financeApprovedBy: this.FinanceForm.get('financeApprovedBy')?.value,
      // financeDescription: this.FinanceForm.get('financeDescription')?.value,
      // financeBillProofs: this.FinanceForm.get('financeBillProofs')?.value,
    };

    this.projectDetailsService.addFinanceExpence(payload).subscribe((data) => {
      console.log('...Data', data);
      if (data) {
        this.showTransactionData();
        this.FinanceForm.reset();
        this.financeSidebarVisible = false;
      }
    });
  }
}
