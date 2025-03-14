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
import { HardCodedInfo } from '../../constants/HardCodedInfo';
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
  projectTypes: any = [];
  projectForm: FormGroup = new FormGroup({});
  allProjects: any = [];
  governmentShareAmount: number = 0;

  constructor(private commonService: CommonService) {}

  ngOnInit() {
    this.getDistricts(this.updateExistingProject);
    this.getCategories(this.updateExistingProject);
    if (this.addNewProject) {
      this.project.isNew = true;
    }
    this.createForm();
  }

  createForm() {
    this.projectForm = new FormGroup({
      districtId: new FormControl(
        this.project.districtId ? this.project.districtId : null,
        [Validators.required]
      ),
      mandalId: new FormControl(
        this.project.mandalId ? this.project.mandalId : null,
        [Validators.required]
      ),
      villageId: new FormControl(
        this.project.villageId ? this.project.villageId : null,
        [Validators.required]
      ),
      location: new FormControl(
        this.project.location ? this.project.location : null
      ),
      latitude: new FormControl(
        this.project.latitude ? this.project.latitude : null
      ),
      longitude: new FormControl(
        this.project.longitude ? this.project.longitude : null
      ),
      projectCategoryId: new FormControl(
        this.project.projectCategoryId ? this.project.projectCategoryId : null,
        [Validators.required]
      ),
      projectTypeId: new FormControl(
        this.project.projectTypeId ? this.project.projectTypeId : null,
        [Validators.required]
      ),
      projectNeed: new FormControl(this.project.isNew ? 'New' : 'Existing', [
        Validators.required,
      ]),
      projectEstimation: new FormControl(
        this.project.projectEstimation ? this.project.projectEstimation : null
      ),
      governmentShare: new FormControl(
        this.project.governmentShare ? this.project.governmentShare : null, [Validators.max(100), Validators.min(0)]
      ),
      publicShare: new FormControl(
        this.project.publicShare ? this.project.publicShare : null
      ),
      description: new FormControl(
        this.project.description ? this.project.description : null
      ),
      statusCode: new FormControl(
        this.project.status ? this.project.status : null
      ),
    });
    this.projectForm.get('publicShare')?.disable();
    this.projectForm.get('projectEstimation')?.valueChanges.subscribe((value) => {
      this.governmentShareAmount = value * ((this.projectForm.get('governmentShare')?.value || 0) / 100);
    });
    this.projectForm.get('governmentShare')?.valueChanges.subscribe((value) => {
      this.governmentShareAmount = (this.projectForm.get('projectEstimation')?.value || 0) * (value / 100);
      this.projectForm.get('publicShare')?.setValue(100 - value);
    });
  }

  getDistricts(isDefaultLoad?: boolean) {
    this.commonService.getDistricts().subscribe(
      (data) => {
        if (data.length > 0) {
          this.districts = data;
          if (isDefaultLoad) {
            this.getMandals(this.project.districtId, isDefaultLoad);
          }
        }
      },
      (err) => {
        //Temp fix for Gopi
        this.districts = HardCodedInfo.districts;
      }
    );
  }

  getMandals(districtId: any, isDefaultLoad?: boolean) {
    this.commonService.getMandals(districtId).subscribe(
      (data) => {
        if (data.length > 0) {
          this.mandals = data;
          if (isDefaultLoad) {
            this.getvillages(this.project.mandalId, isDefaultLoad);
          }
          if (
            !isDefaultLoad &&
            (this.addNewProject || this.updateExistingProject)
          ) {
            this.projectForm.get('mandalId')?.setValue(null);
            this.projectForm.get('villageId')?.setValue(null);
          }
        }
      },
      (err) => {
        //Temp fix for Gopi
        this.mandals = HardCodedInfo.mandals;
      }
    );
  }

  getvillages(mandalId: any, isDefaultLoad?: boolean) {
    this.commonService.getVillages(mandalId).subscribe(
      (data) => {
        this.villages = data;
        if (
          !isDefaultLoad &&
          (this.addNewProject || this.updateExistingProject)
        ) {
          this.projectForm.get('villageId')?.setValue(null);
        }
      },
      (err) => {
        //Temp fix for Gopi
        this.villages = HardCodedInfo.villages;
      }
    );
  }

  getCategories(isDefaultLoad?: boolean) {
    this.commonService.getProjectCategories().subscribe(
      (data) => {
        this.categories = data;
        this.allProjects = data.flatMap((category) =>
          category.projects.map((project) => ({
            ...project,
            categoryId: category.id, // Assign category ID manually
          }))
        );
        if (isDefaultLoad) {
          this.getProjectTypes(this.project.projectCategoryId, isDefaultLoad);
        }
      },
      (err) => {
        //Temp fix for Gopi
        this.categories = HardCodedInfo.categories;
        this.allProjects = this.categories.flatMap((category) =>
          category.projects.map((project) => ({
            ...project,
            categoryId: category.id, // Assign category ID manually
          }))
        );
      }
    );
  }
  getProjectTypes(categoryId: any, isDefaultLoad?: boolean) {
    this.projectTypes = this.allProjects.filter(
      (project) => project.categoryId == Number(categoryId)
    );
    if (!isDefaultLoad && (this.addNewProject || this.updateExistingProject)) {
      this.projectForm.get('projectTypeId')?.setValue(null);
    }
  }
  onSubmit() {
    if (this.addNewProject) {
      this.save();
    } else if (this.updateExistingProject) {
      this.update();
    }
  }
  save() {
    this.submitted = true;
    if (this.projectForm.invalid) {
      return;
    }
    this.commonService.saveProject(this.createPayload()).subscribe(
      (data) => {
        console.log('...Data', data);
        this.closeDialog();
      },
      (err) => {
        console.log(err);
      }
    );
  }
  update() {
    this.submitted = true;
    if (this.projectForm.invalid) {
      return;
    }
    this.commonService.updateProject(this.createPayload()).subscribe(
      (data) => {
        console.log('...Data', data);
        this.closeDialog();
      },
      (err) => {
        console.log(err);
      }
    );
  }
  createPayload() {
    const payload = {
      districtId: this.projectForm.get('districtId')?.value,
      mandalId: this.projectForm.get('mandalId')?.value,
      villageId: this.projectForm.get('villageId')?.value,
      location: this.projectForm.get('location')?.value,
      latitude: this.projectForm.get('latitude')?.value,
      longitude: this.projectForm.get('longitude')?.value,
      projectCategoryId: this.projectForm.get('projectCategoryId')?.value,
      projectType: this.projectForm.get('projectTypeId')?.value,
      projectNeed: this.projectForm.get('projectNeed')?.value,
      projectEstimation: this.projectForm.get('projectEstimation')?.value,
      governmentShare: this.projectForm.get('governmentShare')?.value,
      publicShare: this.projectForm.get('publicShare')?.value,
      description: this.projectForm.get('description')?.value,
      ...(this.updateExistingProject && {
        statusCode: this.project.status,
        id: this.project.id,
      }),
    };

    return payload;
  }
  closeDialog() {
    console.log('.......closeDialog.......');
    this.closeDialogEvent.emit(true);
  }
  cancel() {
    this.closeDialog();
  }
}
