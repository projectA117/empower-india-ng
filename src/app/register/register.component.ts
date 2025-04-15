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
  providers: [MessageService, ConfirmationService, ProductService],
})
export class RegisterComponent {
  registerForm: FormGroup = new FormGroup({});
  submitted: boolean = false;
  loading = false;
  returnUrl: string;
  FileUpload: any;
  testpayload: any;
  uploadimage: any;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private commonService: CommonService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      aboutYourSelf: ['', Validators.required],
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

  onUpload(event: any) {
    // const file = event.files;
    // console.log('...File', file);

    const file = event.target?.files[0]; // Get the selected file
    const formData = new FormData();

    formData.append('file', file);

    this.uploadimage = file;

    this.FileUpload = formData;
  }

  onSubmit() {
    this.testpayload = {
      firstName: this.registerForm.get('firstName')?.value,
      aboutYourSelf: this.registerForm.get('aboutYourSelf')?.value,
      lastName: this.registerForm.get('lastName')?.value,
      phoneNumber: this.registerForm.get('phoneNumber')?.value,
      email: this.registerForm.get('email')?.value,
      userName: this.registerForm.get('userName')?.value,
      password: this.registerForm.get('password')?.value,
      roles: [
        {
          id: 3,
        },
      ],
    };

    const formData = new FormData();
    formData.append('profilePhoto', this.uploadimage); // Add the file
    // formData.append('user', this.testpayload);
    formData.append(
      'user',
      new Blob([JSON.stringify(this.testpayload)], { type: 'application/json' })
    );

    //  formData.append('user', this.testpayload);

    // const testpayload {
    //   'user': ... payload,
    //   'profilePhoto': this.FileUpload
    // }
    // this.FileUpload ;

    // this.FileUpload.append(
    //   'firstName',
    //   this.registerForm.get('firstName')?.value
    // );
    // this.FileUpload.append(
    //   'lastName',
    //   this.registerForm.get('lastName')?.value
    // );
    // this.FileUpload.append(
    //   'aboutYourSelf',
    //   this.registerForm.get('aboutYourSelf')?.value
    // );
    // this.FileUpload.append('email', this.registerForm.get('email')?.value);
    // this.FileUpload.append(
    //   'userName',
    //   this.registerForm.get('userName')?.value
    // );
    // this.FileUpload.append(
    //   'password',
    //   this.registerForm.get('password')?.value
    // );
    // this.FileUpload.append(
    //   'phoneNumber',
    //   this.registerForm.get('phoneNumber')?.value
    // );

    this.commonService.register(formData).subscribe((data) => {
      if (data) {
        this.registerForm.reset();
        if (data.id) {
          this.router.navigate(['/home']);
        } else {
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
  onProfileUpload(event: any) {
    const file = event; // Get the selected file
    this.uploadimage = event;
    const formData = new FormData();

    //formData.append('profilePhoto', file);

    // this.FileUpload = formData;
  }
  changePasswordType(passwordinput: any) {
    passwordinput.type =
      passwordinput.type === 'password' ? 'text' : 'password';
    setTimeout(() => {
      passwordinput.type = 'password';
    }, 1000);
  }
}
