import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { ImportsModule } from '../imports';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { CommonService } from '@service/common.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProductService } from '@service/productservice';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ImportsModule, FormsModule, DropdownModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  providers: [
    MessageService,
    ConfirmationService,
    ProductService,
    CommonService,
  ],
})
export class RegisterComponent {
  registerForm: FormGroup = new FormGroup({});
  submitted: boolean = false;
  loading = false;
  returnUrl: string;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: new FormControl(null, [
        Validators.required,
        Validators.pattern(`^[0-9]{10}$`),
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}'
        ),
      ]),
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    const payload = {
      firstName: this.registerForm.get('firstName')?.value,
      lastName: this.registerForm.get('lastName')?.value,
      phoneNumber: this.registerForm.get('phoneNumber')?.value,
      email: this.registerForm.get('email')?.value,
      userName: this.registerForm.get('userName')?.value,
      password: this.registerForm.get('password')?.value,
    };
    this.commonService.register(payload).subscribe((data) => {
      if (data) {
        this.registerForm.reset();
        if (data.id) {
          this.router.navigate(['/home']);
        }
      }
    });
  }
}
