import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProductService } from '@service/productservice';
import { ImportsModule } from '../imports';
import { CommonService } from '../../service/common.service';
import { ProjectComponent } from '../project/project.component';
import { Project } from 'src/models/Project';
import { Constants } from 'src/constants/Constants';
@Component({
  selector: 'app-projects',
  templateUrl: './project-list.component.html',
  standalone: true,
  imports: [ImportsModule, ProjectComponent],
  providers: [
    MessageService,
    ConfirmationService,
    ProductService,
    CommonService,
  ],
  styleUrl: './project-list.component.scss',
  styles: [
    `
      :host ::ng-deep .p-dialog .product-image {
        width: 150px;
        margin: 0 auto 2rem auto;
        display: block;
      }
    `,
  ],
})
export class ProjectListComponent implements OnInit {

  projects: any = [];
  project: any = null;

  selectedDistrict: any = {};
  selectedMandal: any = {};
  selectedVilage: any = {};

  districts: any = [];
  mandals: any = [];
  villages: any = [];

  showProjectDialog: boolean = false;
  updateExistingProject: boolean = false;
  addNewProject: boolean = false;

  constructor(
    private commonService: CommonService
  ) { }

  ngOnInit() {
    this.getProjects();
    this.getDistricts();
  }

  getProjects() {
    this.commonService.getProjects().subscribe((data: Project[]) => {
      if (data.length > 0) {
        this.projects = data;
      }
    }, err => {
      //Temp fix for Gopi
      this.projects = Constants.projects;
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
    const districtCode = event.value.id;
    this.commonService.getMandals(districtCode).subscribe((data) => {
      this.mandals = data;
    }, err => {
      //Temp fix for Gopi
      this.mandals = Constants.mandals;
    });
  }

  getvilages(event: any) {
    const mandalCode = event.value.id;
    this.commonService.getVillages(mandalCode).subscribe((data) => {
      this.villages = data;
    }, err => {
      //Temp fix for Gopi
      this.villages = Constants.villages;
    });
  }

  hideDialog() {
    this.showProjectDialog = false;
  }

  refresh(val: boolean) {
    if (val) {
      this.hideDialog();
      this.getProjects();
    }
  }

  showDialog() {
    this.showProjectDialog = true;
  }

  onHideDialog() {
    this.addNewProject = false;
    this.updateExistingProject = false;
  }

  createProject() {
    this.project = {};
    this.addNewProject = true;
    this.showDialog();
  }
  editProject(project: Project) {
    this.project = project;
    this.updateExistingProject = true;
    this.showDialog();
  }

}
