import { Component, OnInit } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProductService } from '@service/productservice';
import { ImportsModule } from '../imports';
import { CommonService } from '../../service/common.service';
import { ProjectComponent } from '../project/project.component';
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
export class ProjectsComponent implements OnInit {

  projects: any = [];
  project: any = null;

  selectedDistrict: any = {};
  selectedMandal: any = {};
  selectedVilage: any = {};

  districts: any = [];
  mandals: any = [];
  villages: any = [];

  showProjectDialog: boolean = false;

  constructor(
    private commonService: CommonService
  ) {}

  ngOnInit() {
    this.getProjects();
    this.getDistricts();
  }

  getProjects() {
    this.commonService.getProjects().subscribe((data) => {
      if (data.length > 0) {
        this.projects = data;
      }
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

  hideDialog() {
    this.showProjectDialog = false;
  }

  showDialog(){
    this.showProjectDialog = true;
  }

  createProject() {
    this.project = {};
    this.showDialog();
  }

}
