import { Component, inject } from '@angular/core';
import { Button } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CommonService } from '@service/common.service';
import { HardCodedInfo } from 'src/constants/HardCodedInfo';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    TableModule,
    DialogModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  users: any[] = [];
  addUserFlag = false;
  userForm: FormGroup;
  districts: any = [];
  mandals: any = [];
  villages: any = [];
  selectedDistrict: any = {};
  selectedMandal: any = {};
  selectedVillage: any = {};
  selectedRole: any = {};
  roles = [
    {
      label: 'Admin',
      value: 1
    },
    {
      label: 'District Admin',
      value: 2
    },
    {
      label: 'District Volunteer',
      value: 3
    }
  ];

  private formBuilder = inject(FormBuilder);
  private commonService = inject(CommonService);

  get f() {
    return this.userForm.controls;
  }

  ngOnInit() {
    this.getAllUsers();
    this.createUserForm();
    this.getDistricts();
  }

  createUserForm() {
    this.userForm = this.formBuilder.group({
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
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      role: new FormControl('', Validators.required),
      assignedDistrict: new FormControl('')
    });

    this.userForm.get('role').valueChanges.subscribe((value) => {
      console.log(value)
      if (value && value.value !== 1) {
        this.userForm.get('assignedDistrict').addValidators(Validators.required);
      } else {
        this.userForm.get('assignedDistrict').removeValidators(Validators.required);
      }
    })
  }

  onHideDialog() {
    this.addUserFlag = false;
    this.userForm.reset();
  }

  addUser() {
    this.addUserFlag = true;
  }

  getAllUsers() {}

  getDistricts() {
    this.commonService.getDistricts().subscribe(
      (data) => {
        if (data.length > 0) {
          this.districts = data;
          if (this.selectedDistrict && this.selectedDistrict.id) {
          }
        }
      },
      (err) => {
        //Temp fix for Gopi
        this.districts = HardCodedInfo.districts;
      }
    );
  }

  districtChange(event: any) {
    this.getAllUsers();
  }

  roleChange(event: any) {
    this.getAllUsers()
  }

  reset() {}
  onSubmit() {}
}
 