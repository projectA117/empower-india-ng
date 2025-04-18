import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
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
import { CommonService } from '../../service/common.service';
import { ProductService } from '@service/productservice';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ImportsModule, FormsModule, DropdownModule, ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
  providers: [MessageService, ConfirmationService, ProductService],
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup = new FormGroup({});
  submitted: boolean = false;
  loading = false;
  returnUrl: string;
  invalidUserNameOrPassword: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private commonService: CommonService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.signinForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.signinForm.valueChanges.subscribe(() => {
      this.invalidUserNameOrPassword = false;
    });
  }

  changePasswordType(passwordinput: any) {
    passwordinput.type =
      passwordinput.type === 'password' ? 'text' : 'password';
    setTimeout(() => {
      passwordinput.type = 'password';
    }, 1000);
  }

  onSubmit() {
    const payload = {
      userName: this.signinForm.get('username')?.value,
      password: this.signinForm.get('password')?.value,
    };
    this.commonService.signin(payload).subscribe((data) => {
      if (data) {
        this.signinForm.reset();
        if (data.id) {
          sessionStorage.setItem('token', JSON.stringify(data.jwtToken));
          this.router.navigate(['/home']);
        } else {
          this.invalidUserNameOrPassword = true;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail:
              data.error ??
              'The application has encountered an unknown error. Please try again later.',
          });
        }
      }
    });
  }
}
