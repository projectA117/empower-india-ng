import { Component, inject } from '@angular/core';
import { Button } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CommonService } from '@service/common.service';
import { HardCodedInfo } from 'src/constants/HardCodedInfo';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    TableModule,
    DialogModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
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
  role = []

  private formBuilder = inject(FormBuilder);
  private commonService = inject(CommonService);

  get f() {
    return this.userForm.controls;
  }

  ngOnInit() {
    this.getAllUsers();
    this.createUserForm();
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
        password: new FormControl('', [Validators.required])
      });

  }

  onHideDialog() {
    this.addUserFlag = false;
    this.userForm.reset();
  }

  addUser() {
    this.addUserFlag = true;
  }

  getAllUsers() {

  }

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

  getMandals(event: any) {
    const districtCode = event.value.id;
    this.mandals = [];
    this.villages = [];
    this.selectedMandal = null;
    this.selectedVillage = null;
    this.commonService.getMandals(districtCode).subscribe(
      (data) => {
        this.mandals = data;
      },
      (err) => {
        //Temp fix for Gopi
        this.mandals = HardCodedInfo.mandals;
      }
    );
  }

  getvilages(event: any) {
    const mandalCode = event.value.id;
    this.villages = [];
    this.selectedVillage = null;
    this.commonService.getVillages(mandalCode).subscribe(
      (data) => {
        this.villages = data;
      },
      (err) => {
        //Temp fix for Gopi
        this.villages = HardCodedInfo.villages;
      }
    );
  }

  onSubmit() {

  }
}
