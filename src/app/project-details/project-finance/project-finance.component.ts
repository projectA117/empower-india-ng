import { Component, inject, Input, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
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
})
export class ProjectFinanceComponent implements OnInit {
  @Input() projectData: any;
  showTransaction!: [];
  remainingBalance: number = 0;
  totalExpenses: number = 0;
  totalFunds: number = 0;
  financeSidebarVisible: boolean = false;
  isAdd = false;
  FileUpload: any;
  FinanceForm: FormGroup = new FormGroup({});
  uploadimage: any = undefined;
  imagePreviews: any;
  selectedFiles: (File | { base64: string; fromServer: true })[] = [];
  projectDetailsService = inject(ProjectDetailsService);
  constructor(private commonService: CommonService) {}
  ngOnInit() {
    this.showTransactionData();
    this.createFinanceForm();
  }
  localStorageuser() {
    return this.commonService.showInputAdmin(this.projectData?.districtId);
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
      id: new FormControl(0),
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
      paidTo: this.FinanceForm.get('financePaidto')?.value,
      expenseType: this.FinanceForm.get('financeExpenseType')?.value,
      description: this.FinanceForm.get('financeDescription')?.value,
      billProofs: this.FinanceForm.get('financeBillProofs')?.value
        ? this.FinanceForm.get('financeBillProofs')?.value
        : 'No',
      spentBy: this.FinanceForm.get('financeSpentBy')?.value,
      approvedBy: this.FinanceForm.get('financeApprovedBy')?.value,
    };
    if (!this.isAdd) {
      payload['id'] = this.FinanceForm.get('id')?.value;
      const formData = new FormData();
      formData.append(
        'finance',
        new Blob([JSON.stringify(payload)], { type: 'application/json' })
      );
      formData.append('financeImage', this.uploadimage);
      this.projectDetailsService
        .updateFinanceExpence(formData, this.FinanceForm.get('id')?.value)
        .subscribe((data) => {
          console.log('...Data', data);
          if (data) {
            this.showTransactionData();
            this.FinanceForm.reset();
            this.financeSidebarVisible = false;
            this.isAdd = false;
            this.FinanceForm.reset();
          }
        });
      return;
    }
    const formData = new FormData();
    formData.append(
      'finance',
      new Blob([JSON.stringify(payload)], { type: 'application/json' })
    );
    formData.append('financeImage', this.uploadimage);
    this.projectDetailsService.addFinanceExpence(formData).subscribe((data) => {
      console.log('...Data', data);
      if (data) {
        this.showTransactionData();
        this.FinanceForm.reset();
        this.financeSidebarVisible = false;
        this.FinanceForm.reset();
      }
    });
  }

  onEditTransaction(transaction: any) {
    this.financeSidebarVisible = true;
    this.isAdd = false;
    this.FinanceForm.patchValue({
      id: transaction.id,
      financeDate: transaction.transactionDate,
      financeExpenseType: transaction.expenseType,
      financeAmount: transaction.transactionAmount,
      financeSpentBy: transaction.spentBy,
      financePaidto: transaction.paidTo,
      financeModeofPayment: transaction.paymentMode,
      financeApprovedBy: transaction.approvedBy,
      financeDescription: transaction.description,
      financeBillProofs: transaction.billProofs,
    });
    if (transaction.billImage) {
      this.imagePreviews.push(
        `data:image/jpeg;base64,${transaction.billImage}`
      );
      this.selectedFiles = this.imagePreviews.map((b64) => ({
        base64: b64,
        fromServer: true,
      }));
    }
  }

  onUpload(event: any) {
    // const file = event.files;
    // console.log('...File', file);

    const file = event.target?.files[0]; // Get the selected file
    const formData = new FormData();

    formData.append('file', file);

    this.uploadimage = file;

    this.FileUpload = formData;
  }

  onDeleteTransaction(transaction: any) {
    this.projectDetailsService
      .deleteFinanceExpence(transaction.id, this.projectData.id)
      .subscribe((data) => {
        console.log('...Data', data);
        // if (data) {
        this.showTransactionData();
        // }
      });
  }
}
