import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormsModule,
  FormControl,
  ReactiveFormsModule,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProductService } from '@service/productservice';
import { ImportsModule } from '../imports';
import { CommonService } from '../../service/common.service';
import { Project } from '@domain/Project';
import { Constants } from '../../constants/Constants';
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  standalone: true,
  imports: [ImportsModule, FormsModule, DropdownModule, ReactiveFormsModule],
  providers: [
    MessageService,
    ConfirmationService,
    ProductService,
    CommonService,
  ],
  styleUrl: './project.component.scss',
})
export class ProjectComponent implements OnInit {
  @Input()
  project: Project;
  @Input()
  addNewProject: boolean;
  @Input()
  updateExistingProject: boolean;
  @Output() closeDialogEvent = new EventEmitter<boolean>();

  submitted: boolean = false;
  districts: any = [];
  mandals: any = [];
  villages: any = [];
  categories: any = [];
  projectNames: any = [];
  projectForm: FormGroup = new FormGroup({});
  allProjects: any = [];

  constructor(
    private commonService: CommonService
  ) { }

  ngOnInit() {
    this.getDistricts();
    this.getCategories();
      this.createForm();
  }

  createForm() {
    this.projectForm = new FormGroup({
      districtId: new FormControl('', [Validators.required]),
      mandalId: new FormControl('', [Validators.required]),
      villageId: new FormControl('', [Validators.required]),
      location: new FormControl(''),
      latitude: new FormControl(''),
      longitude: new FormControl(''),
      projectCategoryId: new FormControl('', [Validators.required]),
      projectType: new FormControl('', [Validators.required]),
      projectNeed: new FormControl('New', [Validators.required]),
      projectEstimation: new FormControl(null),
      governmentShare: new FormControl(null),
      publicShare: new FormControl(null),
      description: new FormControl(null, [Validators.required]),
      statusCode: new FormControl('')
    });
  }

  getDistricts() {
    this.commonService.getDistricts().subscribe((data) => {
      if (data.length > 0) {
        this.districts = data;
      }
    }, err => {
      //Temp fix for Gopi
      this.districts = Constants.districts;
    });
  }

  getMandals(event: any) {
    const districtCode = event.value;
    this.commonService.getMandals(districtCode).subscribe((data) => {
      this.mandals = data;
    },err => {
      //Temp fix for Gopi
      this.mandals = Constants.mandals;
    });
  }

  getvillages(event: any) {
    const mandalCode = event.value;
    this.commonService.getVillages(mandalCode).subscribe((data) => {
      this.villages = data;
    },err => {
      //Temp fix for Gopi
      this.villages = Constants.villages;
    });
  }

  getCategories() {
    this.commonService.getProjectCategories().subscribe((data) => {
      this.categories = data;
      this.allProjects = data.flatMap(category =>
        category.projects.map(project => ({
          ...project,
          categoryId: category.id  // Assign category ID manually
        }))
      );
    },err => {
      //Temp fix for Gopi
      this.categories = Constants.categories;
      this.allProjects = this.categories.flatMap(category =>
        category.projects.map(project => ({
          ...project,
          categoryId: category.id  // Assign category ID manually
        }))
      );
    });
  }
  getProjectNames(event: any) {
    this.projectNames = this.allProjects.filter(project => project.categoryId == Number(event?.value));
  }

  save() {
    this.submitted = true;
    if (this.projectForm.invalid) {
      return;
    }
    const payload = {
      districtId: this.projectForm.get('districtId')?.value,
      mandalId: this.projectForm.get('mandalId')?.value,
      villageId: this.projectForm.get('villageId')?.value,
      location: this.projectForm.get('location')?.value,
      latitude: this.projectForm.get('latitude')?.value,
      longitude: this.projectForm.get('longitude')?.value,
      projectCategoryId: this.projectForm.get('projectCategoryId')?.value,
      projectType: this.projectForm.get('projectType')?.value,
      projectNeed: this.projectForm.get('projectNeed')?.value,
      projectEstimation: this.projectForm.get('projectEstimation')?.value,
      governmentShare: this.projectForm.get('governmentShare')?.value,
      publicShare: this.projectForm.get('publicShare')?.value,
      description: this.projectForm.get('description')?.value,
      statusCode: this.projectForm.get('statusCode')?.value
    };
    this.commonService.saveProject(payload).subscribe((data) => {
      console.log("...Data", data);
      this.closeDialog();
    },
      err => {
        console.log(err);
      });
  }
  closeDialog() {
    console.log(".......closeDialog.......");
    this.closeDialogEvent.emit(true);
  }
  cancel() {
    this.closeDialog();
  }
}
