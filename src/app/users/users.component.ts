import { Component, computed, inject } from '@angular/core';
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
import { ToggleButtonModule } from 'primeng/togglebutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RoleDirective } from 'src/directives/role-access.directive';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ImportsModule } from '../imports';

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
    InputSwitchModule,
    RoleDirective,
    ImportsModule,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  providers: [MessageService, ConfirmationService],
})
export class UsersComponent {
  users: any[] = [];
  addUserFlag = false;
  userForm: FormGroup;
  districts: any = [];
  districtMap: any = {};
  selectedDistrict: any = {};
  selectedRole: any = {};
  searchQuery: string = '';
  roles = computed(() =>
    this.commonService.roles().filter((role) => [3, 4, 5].includes(role.id))
  );
  useredit: boolean = false;
  private formBuilder = inject(FormBuilder);
  private commonService = inject(CommonService);
  private messageService = inject(MessageService);

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
      assignedDistrict: new FormControl(''),
    });

    this.userForm.get('role').valueChanges.subscribe((value) => {
      this.userForm.get('assignedDistrict').reset();
      if (value && value.id !== 3) {
        this.userForm
          .get('assignedDistrict')
          .addValidators(Validators.required);
        this.userForm.updateValueAndValidity();
      } else {
        this.userForm
          .get('assignedDistrict')
          .removeValidators([Validators.required]);
      }
      this.userForm.get('assignedDistrict').updateValueAndValidity();
      this.userForm.updateValueAndValidity();
    });
  }

  onHideDialog() {
    this.addUserFlag = false;
    this.userForm.reset();
  }

  addUser() {
    const userData = {
      firstName: this.userForm.get('firstName')?.value,
      aboutYourSelf: this.userForm.get('aboutYourSelf')?.value,
      lastName: this.userForm.get('lastName')?.value,
      phoneNumber: this.userForm.get('phoneNumber')?.value,
      email: this.userForm.get('email')?.value,
      userName: this.userForm.get('userName')?.value,
      password: this.userForm.get('password')?.value,
      roles: [this.userForm.get('role')?.value],
      districtId: this.userForm.get('assignedDistrict')?.value?.id
        ? this.userForm.get('assignedDistrict')?.value?.id
        : null,
    };
    const formData = new FormData();

    formData.append(
      'user',
      new Blob([JSON.stringify(userData)], { type: 'application/json' })
    );

    this.commonService.register(formData).subscribe((data) => {
      if (data.error) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail:
            data.error ??
            'The application has encountered an unknown error. Please try again later.',
        });
      } else {
        this.getAllUsers();
        this.addUserFlag = false;
      }
    });
  }

  getAllUsers() {
    const roleId = this.selectedRole ? this.selectedRole.id : 0;
    const districtId = this.selectedDistrict ? this.selectedDistrict.id : 0;
    this.commonService
      .getUsers(this.searchQuery, roleId, districtId)
      .subscribe((data) => {
        this.users = data;
        (this.users || []).forEach((user) => {
          user.isEnabled = user.isEnabled === 1 ? true : false;
        });
      });
  }

  getDistricts() {
    this.commonService.getDistricts().subscribe(
      (data) => {
        if (data.length > 0) {
          this.districts = data;

          this.districts.forEach((district) => {
            this.districtMap[district.id] = district.name;
          });
          if (this.selectedDistrict && this.selectedDistrict.id) {
            this.getAllUsers();
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
    this.getAllUsers();
  }

  activeInactiveChange(event, user) {
    this.commonService
      .activeDeActiveUser(user.id, event.value ? 1 : 0)
      .subscribe((data) => {
        this.getAllUsers();
      });
  }

  reset() {
    this.searchQuery = '';
    this.selectedDistrict = null;
    this.selectedRole = null;
    this.getAllUsers();
  }
  editUsers(user) {
    this.useredit = true;
    this.addUserFlag = true;
    // this.districts = await lastValueFrom(this.commonService.getDistricts());
    const selectedDistrict = this.districts.find(
      (d) => d.id == user.districtId
    );
    this.userForm.removeControl('password');
    this.userForm.patchValue({
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      email: user.email,
      userName: user.userName,
      role: user.roles[0],
      assignedDistrict: selectedDistrict,
    });
  }
}
