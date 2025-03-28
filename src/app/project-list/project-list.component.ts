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
import { ProjectSponsorsComponent } from '../project-sponsors/project-sponsors.component';
import { RoleDirective } from 'src/directives/role-access.directive';
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
  imports: [
    ImportsModule,
    ProjectComponent,
    ProjectSponsorsComponent,
    RoleDirective,
  ],
  providers: [MessageService, ConfirmationService, ProductService],
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
  pageNumber: number = 0;
  projectSponsorDetails: any = {};

  projectImages = {
    Computers: 'computer.png',
    Dustbins: 'dustbin.png',
    'Library Books': 'library.png',
    'Audio System': 'music.png',
    Toilets: 'public_toilets.png',
    'RO Plant': 'ro_plants.png',
    'Sanitary Pad': 'sanitary.png',
    'Sports Kits': 'sports.png',
    'Bus Shelter': 'bus_shelter.png',
    School: 'schools.png',
  };

  showSponsorDialog: boolean = false;

  // Store the project that will be passed to the dialog
  selectedProject: any;
  datastatus: any;
  serverError: boolean = false;

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
        id: 5,
        name: 'WAITING FOR SPONSORS',
      },

      {
        id: 3,
        name: 'REJECTED',
      },
      {
        id: 4,
        name: 'WORK IN PROGRESS',
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
        amount: '10000',
        ModeofPayment: 'cash',
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
        amount: '20000',
        ModeofPayment: 'Online',
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
        amount: '30000',
        ModeofPayment: 'online',
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
        amount: '40000',
        ModeofPayment: 'cash',
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
        amount: '50000',
        ModeofPayment: 'cash',
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
        amount: '60000',
        ModeofPayment: 'UPI',
      },
    ];

    this.activatedRoute.queryParams.subscribe((params) => {
      this.selectedcategory = parseInt(params['category']);
      // if (this.selectedcategory) {
      //   this.projectDMVSearch();
      // } else {
      //   this.getProjects(this.first, this.rows);
      // }
      this.getProjects();
      // this.getProjects(this.first, this.rows);
    });
  }

  getProjects() {
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
      params += '&typeId=' + this.selectedcategory;
    } else if (this.selectedcategory && params.length == 0) {
      params += 'typeId=' + this.selectedcategory;
    }

    if (this.selectedStatus && params.length > 0 && this.selectedStatus) {
      params += '&status=' + this.selectedStatus;
    } else if (this.selectedStatus && params.length == 0) {
      params += 'status=' + this.selectedStatus;
    }
    params += '&page=' + this.pageNumber;
    params += '&size=' + this.rows;

    this.commonService.getProjects(params).subscribe(
      (data: any) => {
        if (!data.content) {
          this.projects = [];
          this.totalRecords = 0;
          this.datastatus = data.status;
          this.serverError = true;
          return;
        }
        this.projects = data.content;
        this.serverError = false;
        this.projects.forEach((project: any) => {
          const sponsorAmount = project.sponsersList.reduce(
            (total, sponsor) => total + Number(sponsor.amount),
            0
          );
          const publicEstimate =
            project.projectEstimation * (project.publicShare / 100);
          project.sponsorAmount = sponsorAmount;
          project.disableAddSponsor = publicEstimate <= sponsorAmount;
        });
        this.totalRecords = data.totalElements;
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
            this.categories = [].concat.apply(
              this.categories,
              data[i].projects
            );
            // this.categories = [].concat.apply([], data[i].projects);
            // this.categories = data[i].projects;
            //  this.categories.concat(data[i].projects);
            console.log(this.categories);
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
        this.getProjects();
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
        this.getProjects();
      },
      (err) => {
        //Temp fix for Gopi
        this.villages = HardCodedInfo.villages;
      }
    );
  }

  vilageChange(event: any) {
    this.getProjects();
  }

  categoryChange(event: any) {
    this.getProjects();
  }

  StatusChange(event: any) {
    this.getProjects();
  }

  hideDialog() {
    this.showProjectDialog = false;
  }

  refresh(val: boolean) {
    if (val) {
      this.hideDialog();
      this.pageNumber = 0;
      this.rows = 10;
      this.getProjects();
    }
  }
  // pageChange(event, first) {
  //   this.getProjects(event.first, event.rows);
  // }
  onPageChange(event: PageEvent) {
    this.first = event.first;
    this.rows = event.rows;
    this.pageNumber = event.page;
    this.getProjects();
  }
  showDialog() {
    this.showProjectDialog = true;
  }

  onHideDialog() {
    this.addNewProject = false;
    this.updateExistingProject = false;
    this.showSponsorDialog = false;
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
    // this.first = 0;
    // this.rows = 10;
    this.getProjects();
  }

  // Method to open the sponsor dialog
  openSponsorDialog(project: any) {
    this.project = project; // Set the selected project
    this.showSponsorDialog = true;
    this.showDialog();
  }
}
