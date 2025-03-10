import { ChangeDetectorRef, Component, effect, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProductService } from '@service/productservice';
import { ImportsModule } from '../imports';
import { CommonService } from '../../service/common.service';
import { ProjectComponent } from '../project/project.component';
import { Project } from 'src/models/Project';

import { HardCodedInfo } from 'src/constants/HardCodedInfo';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from '@service/loader.service';
interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}
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
  categories: any = [];
  status: any = [];
  selectedStatus: any = '';
  selectedcategory: any = '';

  showProjectDialog: boolean = false;
  updateExistingProject: boolean = false;
  addNewProject: boolean = false;
  totalRecords: number = 0;
  first: number = 0;
  rows: number = 10;
  projectSponsorDetails: any = {};

  constructor(
    private commonService: CommonService,
    private router: Router,
    private productService: ProductService,
    private cdr: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    // this.getProjects(this.first, this.rows);
    this.getCategories();
    this.getDistricts();
    this.status = [
      {
        id: 1,
        name: 'NEW',
      },
      {
        id: 2,
        name: 'APPROVED',
      },
      {
        id: 3,
        name: 'REJECTED',
      },
      {
        id: 4,
        name: 'WIP',
      },
      {
        id: 5,
        name: 'WFD',
      },
      {
        id: 6,
        name: 'COMPLETED',
      },
      {
        id: 7,
        name: 'OPEN',
      },
    ];
    this.categories = [
      {
        id: 23,
        description: 'Bus shelter',
        image: 'bus_shelter.png',
      },
      {
        id: 22,
        description: 'Library',
        image: 'library.png',
      },
      {
        id: 21,
        description: 'Public Toilets',
        image: 'public_toilets.png',
      },
      {
        id: 20,
        description: 'RO Plants',
        image: 'ro_plants.png',
      },
      {
        id: 19,
        description: 'Schools',
        image: 'schools.png',
      },
      {
        id: 18,
        description: 'Audio System',
        image: 'project-1.jpg',
      },
      {
        id: 17,
        description: 'Computers',
        image: 'project-1.jpg',
      },
      {
        id: 16,
        description: 'Sanitary Pad',
        image: 'project-1.jpg',
      },
      {
        id: 15,
        description: 'Dustbins',
        image: 'project-1.jpg',
      },
      {
        id: 14,
        description: 'Sports Kits',
        image: 'project-1.jpg',
      },
      {
        id: 13,
        description: 'Paints',
        image: 'project-1.jpg',
      },
      {
        id: 12,
        description: 'Cycles',
        image: 'project-1.jpg',
      },
      {
        id: 11,
        description: 'Library',
        image: 'project-1.jpg',
      },
      {
        id: 10,
        description: 'Toilets',
        image: 'project-1.jpg',
      },
      {
        id: 9,
        description: 'RO Plant',
        image: 'project-1.jpg',
      },
      {
        id: 8,
        description: 'Benches',
        image: 'project-1.jpg',
      },
      {
        id: 7,
        description: 'Digital Boards',
        image: 'project-1.jpg',
      },
      {
        id: 6,
        description: 'Solar Fencing',
        image: 'project-1.jpg',
      },
      {
        id: 5,
        description: 'CC Cameras',
        image: 'project-1.jpg',
      },
      {
        id: 4,
        description: 'Racks',
        image: 'project-1.jpg',
      },
      {
        id: 3,
        description: 'Ceiling Fans',
        image: 'project-1.jpg',
      },
      {
        id: 2,
        description: 'Class Rooms',
        image: 'project-1.jpg',
      },
      {
        id: 1,
        description: 'Library Books',
        image: 'project-1.jpg',
      },
    ];

    this.projectSponsorDetails = [
      {
        createdBy: 'Admin',
        createdDate: '2025-02-17T10:00:00',
        lastUpdatedBy: 'Admin',
        lastUpdatedDate: '2025-02-17T10:00:00',
        id: 1,
        firstName: 'Swetha',
        lastName: 'R',
        phoneNumber: '1234567890',
        email: 'swetha.r@example.com',
        address: null,
        memoryOf: null,
        village: null,
      },
      {
        createdBy: null,
        createdDate: null,
        lastUpdatedBy: null,
        lastUpdatedDate: null,
        id: 2,
        firstName: 'ZXCzxcxzc',
        lastName: 'ZXCzxcxzc',
        phoneNumber: 'zxcxzc',
        email: 'xzcxzc',
        address: '',
        memoryOf: 'zxcxzc',
        village: null,
      },
      {
        createdBy: null,
        createdDate: null,
        lastUpdatedBy: null,
        lastUpdatedDate: null,
        id: 3,
        firstName: 'asasda',
        lastName: 'asasda',
        phoneNumber: '9963376888',
        email: 'asdada',
        address: 'asdasdsad',
        memoryOf: 'asdsad',
        village: null,
      },
      {
        createdBy: null,
        createdDate: null,
        lastUpdatedBy: null,
        lastUpdatedDate: null,
        id: 4,
        firstName: 'Venkat',
        lastName: 'Venkat',
        phoneNumber: '4121212121',
        email: '',
        address: '',
        memoryOf: '',
        village: null,
      },
      {
        createdBy: null,
        createdDate: null,
        lastUpdatedBy: null,
        lastUpdatedDate: null,
        id: 5,
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        address: '',
        memoryOf: '',
        village: null,
      },
      {
        createdBy: null,
        createdDate: null,
        lastUpdatedBy: null,
        lastUpdatedDate: null,
        id: 6,
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        address: '',
        memoryOf: '',
        village: null,
      },
      {
        createdBy: null,
        createdDate: null,
        lastUpdatedBy: null,
        lastUpdatedDate: null,
        id: 7,
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        address: '',
        memoryOf: '',
        village: null,
      },
      {
        createdBy: null,
        createdDate: null,
        lastUpdatedBy: null,
        lastUpdatedDate: null,
        id: 8,
        firstName: 'sadasd',
        lastName: 'sadasd',
        phoneNumber: '1234567890',
        email: '2343242@gmai.com',
        address: '234324',
        memoryOf: 'xcvxcv',
        village: null,
      },
      {
        createdBy: null,
        createdDate: null,
        lastUpdatedBy: null,
        lastUpdatedDate: null,
        id: 9,
        firstName: 'sdsadsa',
        lastName: 'sdsadsa',
        phoneNumber: '9966333',
        email: 'ss@gmai.com',
        address: 'cXasda',
        memoryOf: 'asdsada',
        village: null,
      },
      {
        createdBy: null,
        createdDate: null,
        lastUpdatedBy: null,
        lastUpdatedDate: null,
        id: 10,
        firstName: 'Venkat',
        lastName: 'Venkat',
        phoneNumber: '4126576759',
        email: 'scompnoa@gmail.com',
        address: 'yrtdd',
        memoryOf: 'Krishnaiah',
        village: null,
      },
      {
        createdBy: null,
        createdDate: null,
        lastUpdatedBy: null,
        lastUpdatedDate: null,
        id: 11,
        firstName: 'Venkat',
        lastName: 'Venkat',
        phoneNumber: '45454545445',
        email: 'scompnoa@gmail.com',
        address: '4558 Hunterston Ln',
        memoryOf: 'Krishnaiah',
        village: null,
      },
      {
        createdBy: null,
        createdDate: null,
        lastUpdatedBy: null,
        lastUpdatedDate: null,
        id: 12,
        firstName: 'test',
        lastName: 'test',
        phoneNumber: '1234567899',
        email: 'ss@gmail.com',
        address: 'test',
        memoryOf: 'test',
        village: null,
      },
    ];

    this.activatedRoute.queryParams.subscribe((params) => {
      this.selectedcategory = parseInt(params['category']);
      if (this.selectedcategory) {
        this.projectDMVSearch();
      } else {
        this.getProjects(this.first, this.rows);
      }
    });
  }

  getProjects(pagenumber, pagesize) {
    this.commonService.getProjects(pagenumber, pagesize).subscribe(
      (data: any) => {
        if (data.content.length > 0) {
          this.projects = data.content;
          this.totalRecords = data.totalElements;
        }
      },
      (err) => {
        //Temp fix for Gopi
        this.projects = HardCodedInfo.projects;
      }
    );
  }

  projectDMVSearch() {
    //districtId=17&mandalId=77&villageId=9418
    let params = '';

    if (this.selectedDistrict && this.selectedDistrict.id) {
      params = 'districtId=' + this.selectedDistrict.id;
    }
    if (this.selectedMandal && this.selectedMandal.id) {
      params += '&mandalId=' + this.selectedMandal.id;
    }
    if (this.selectedVilage && this.selectedVilage.id) {
      params += '&villageId=' + this.selectedVilage.id;
    }

    if (this.selectedcategory && params.length > 0 && this.selectedcategory) {
      params += '&category=' + this.selectedcategory;
    } else if (this.selectedcategory && params.length == 0) {
      params += 'category=' + this.selectedcategory;
    }

    if (this.selectedStatus && params.length > 0 && this.selectedStatus) {
      params += '&status=' + this.selectedStatus;
    } else if (this.selectedStatus && params.length == 0) {
      params += 'status=' + this.selectedStatus;
    }

    console.log(params);
    this.commonService.getProjectDMVSearch(params).subscribe(
      (data) => {
        if (!data.error) {
          this.projects = data.content;
        }
      },
      (err) => {
        //Temp fix for Gopi
        this.projects = HardCodedInfo.projects;
      }
    );
  }

  getDistricts() {
    this.commonService.getDistricts().subscribe(
      (data) => {
        if (data.length > 0) {
          this.districts = data;
          if (this.selectedDistrict && this.selectedDistrict.id) {
            this.projectDMVSearch();
          }
        }
      },
      (err) => {
        //Temp fix for Gopi
        this.districts = HardCodedInfo.districts;
      }
    );
  }
  getCategories(isDefaultLoad?: boolean) {
    this.commonService.getProjectCategories().subscribe(
      (data) => {
        // this.categories = data.projects;

        for (var i = 0; i < data.length; i += 1) {
          if (data[i].projects.length > 0) {
            this.categories.push(data[i].projects);
          }
        }
      },

      (err) => {
        //Temp fix for Gopi
        this.categories = HardCodedInfo.categories;
      }
    );
  }

  getMandals(event: any) {
    const districtCode = event.value.id;
    this.mandals = [];
    this.villages = [];
    this.selectedMandal = null;
    this.selectedVilage = null;
    this.commonService.getMandals(districtCode).subscribe(
      (data) => {
        this.mandals = data;
        this.projectDMVSearch();
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
    this.selectedVilage = null;
    this.commonService.getVillages(mandalCode).subscribe(
      (data) => {
        this.villages = data;
        this.projectDMVSearch();
      },
      (err) => {
        //Temp fix for Gopi
        this.villages = HardCodedInfo.villages;
      }
    );
  }

  vilageChange(event: any) {
    this.projectDMVSearch();
  }

  categoryChange(event: any) {
    this.projectDMVSearch();
  }

  StatusChange(event: any) {
    this.projectDMVSearch();
  }

  hideDialog() {
    this.showProjectDialog = false;
  }

  refresh(val: boolean) {
    if (val) {
      this.hideDialog();
      this.getProjects(0, 10);
    }
  }
  // pageChange(event, first) {
  //   this.getProjects(event.first, event.rows);
  // }
  onPageChange(event: PageEvent) {
    this.first = event.first;
    this.rows = event.rows;
    this.getProjects(event.page, event.rows);
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

  getProjectDetails(project: any) {
    //this.project = project;
    //this.productService.selectedProject.next(project);
    this.router.navigate(['project-details'], {
      queryParams: { project: JSON.stringify(project) },
    });
  }

  getProjectSponsorDetails(project: any) {
    //this.project = project;
    //this.productService.selectedProject.next(project);
    this.router.navigate(['project-sponsors'], {
      queryParams: { project: JSON.stringify(project) },
    });
  }
  reset() {
    this.selectedcategory = null;
    this.selectedDistrict = null;
    this.selectedMandal = null;
    this.selectedVilage = null;
    this.getProjects(this.first, this.rows);
  }
}
