import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '@service/productservice';
import { DropdownModule } from 'primeng/dropdown';
import { ImportsModule } from '../imports';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProjectDetailsService } from '@service/project-details.service';
import { CommonService } from '@service/common.service';

@Component({
  selector: 'app-project-sponsors',
  standalone: true,
  imports: [ImportsModule, FormsModule, DropdownModule, ReactiveFormsModule],
  templateUrl: './project-sponsors.component.html',
  styleUrl: './project-sponsors.component.scss',
  providers: [ProjectDetailsService, CommonService, ProductService],
})
export class ProjectSponsorsComponent implements OnInit {
  @Input() projectData: any;
  doners!: [];
  ProjectSponsorSidebarVisible: boolean = false;
  donorForm: FormGroup = new FormGroup({});
  @Input() product: any;
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private projectDetailsService: ProjectDetailsService,
    private commonService: CommonService
  ) {}
  ngOnInit() {
    this.createdonorForm();
    this.activatedRoute.queryParams.subscribe((params) => {
      this.product = JSON.parse(params['project']);
    });
  }

  createdonorForm() {
    this.donorForm = new FormGroup({
      DonorsName: new FormControl('', [Validators.required]),
      DonorsPhone: new FormControl(null, [
        Validators.required,
        Validators.pattern(`^[0-9]{10}$`),
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      DonorsEmail: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}'
        ),
      ]),
      DonorsAddress: new FormControl('', [Validators.required]),
      DonorsMemoryOf: new FormControl('', [Validators.required]),
      DonorsAmount: new FormControl('', [Validators.required]),
      DonorsModeofPayment: new FormControl('', [Validators.required]),
    });
  }
  updatedonorForm() {
    const payload = {
      firstName: this.donorForm.get('DonorsName')?.value,
      lastName: this.donorForm.get('DonorsName')?.value,
      phoneNumber: this.donorForm.get('DonorsPhone')?.value,
      email: this.donorForm.get('DonorsEmail')?.value,
      address: this.donorForm.get('DonorsAddress')?.value,
      memoryOf: this.donorForm.get('DonorsMemoryOf')?.value,
      amount: this.donorForm.get('DonorsAmount')?.value,
      modeOfPayment: this.donorForm.get('DonorsModeofPayment')?.value,
    };

    this.projectDetailsService
      .addDonars(payload, this.product.id)
      .subscribe((data) => {
        if (data) {
          // this.showdonor();
          this.ProjectSponsorSidebarVisible = false;
          this.donorForm.reset();
        }
      });
  }
}
