import { Component, Input, OnInit } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { ImportsModule } from '../imports';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonService } from '@service/common.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ImportsModule, FormsModule, DropdownModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  providers: [MessageService, ConfirmationService],
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup = new FormGroup({});
  constructor(
    private commonService: CommonService,
    private messageService: MessageService
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
      if (data.status === 200) {
        this.messageService.add({
          severity: 'success',
          summary: 'success',
          detail:
            data.error.text ??
            'Your information has been submitted successfully and we will get back to you soon.',
        });
        this.contactForm.reset();
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail:
            data.error.errorMessage ??
            'The application has encountered an unknown error. Please try again later.',
        });
        this.contactForm.reset();
      }
    });
  }
  cancelForm() {
    this.contactForm.reset();
  }
}
