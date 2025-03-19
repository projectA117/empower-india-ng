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
  selector: 'app-contact',
  standalone: true,
  imports: [ImportsModule, FormsModule, DropdownModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  providers: [ProjectDetailsService, ProductService],
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup = new FormGroup({});
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private projectDetailsService: ProjectDetailsService,
    private commonService: CommonService
  ) {}

  ngOnInit() {
    this.createcontactForm();
  }

  createcontactForm() {
    this.contactForm = new FormGroup({
      Name: new FormControl('', [Validators.required]),
      Subject: new FormControl('', [Validators.required]),
      Message: new FormControl('', [Validators.required]),

      DonorsEmail: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}'
        ),
      ]),
    });
  }

  updateContactForm() {
    const payload = {
      name: this.contactForm.get('Name')?.value,
      subject: this.contactForm.get('Subject')?.value,
      message: this.contactForm.get('Message')?.value,
      email: this.contactForm.get('DonorsEmail')?.value,
    };

    this.commonService.contactSubmit(payload).subscribe((data) => {
      if (data) {
        this.contactForm.reset();
      }
    });
  }
}
