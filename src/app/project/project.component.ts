import { Component, Input, OnInit } from '@angular/core';
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
  project: any;
  @Input()
  addNewProject: boolean;

  submitted: boolean = false;
  districts: any = [];
  mandals: any = [];
  villages: any = [];
  categories: any= [];
  projectNames: any = [];
  projectForm: FormGroup = new FormGroup({});
  allProjects: any = [];

  constructor(
    private commonService: CommonService
  ) {}

  ngOnInit() {
    this.getDistricts();
    this.getCategories();
    if(this.addNewProject) {
      this.createForm();
    }
  }

  createForm() {
    this.projectForm = new FormGroup({
      district: new FormControl('', [Validators.required]),
      mandal: new FormControl('', [Validators.required]),
      village: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      need: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      latitude: new FormControl(''),
      longitude: new FormControl(''),
      address: new FormControl(''),
      estimation: new FormControl(''),
      govtShare: new FormControl(''),
      publicShare: new FormControl(''),
      projectType: new FormControl('New')
    });
  }

  getDistricts() {
    this.commonService.getDistricts().subscribe((data) => {
      if (data.length > 0) {
        this.districts = data;
      }
    });
    
  }

  getMandals(event: any) {
    const districtCode = event.value.id;
    this.commonService.getMandals(districtCode).subscribe((data) => {
      this.mandals = data;
    });
  }

  getvilages(event: any) {
    const mandalCode = event.value.id;
    this.commonService.getVillages(mandalCode).subscribe((data) => {
      this.villages = data;
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
    });
  }
  getProjectNames(event: any) {
    this.projectNames = this.allProjects.filter(project => project.categoryId == Number(event?.value?.id));
  }
  
  save() {
    this.submitted = true;
    if (this.projectForm.invalid) {
      return; // Stop if the form is invalid
    }
    const requestData = {
      district: this.projectForm.value.district.name,
      mandal: this.projectForm.value.mandal.name,
      village: this.projectForm.value.village.name,
      location: this.projectForm.value.newProjectAddress,
      latitude:
        this.projectForm.value.newProjectLatitude == ''
          ? 16.519771
          : this.projectForm.value.newProjectLatitude,
      longitude:
        this.projectForm.value.newProjectLongitude == ''
          ? 80.777217
          : this.projectForm.value.newProjectLongitude,
      category: this.projectForm.value.newProjectCategory.name,
      name: this.projectForm.value.newProjectName.description,
      projectNeed: this.projectForm.value.newProjectType,
      projectEstimation: this.projectForm.value.newProjectEstimation,
      governmentShare: this.projectForm.value.newProjectGovtShare,
      publicShare: this.projectForm.value.newProjectPublicShare,
      description: this.projectForm.value.newProjectDescription,
      // "projectType": this.newProjectForm.value.newProjectType,
      // "commitee": this.newProjectForm.value.newProjectCommitee
    };
  }
}
