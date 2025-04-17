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
import { lastValueFrom, map } from 'rxjs';
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
  projectsProgressImages: any;
  images: any;
  displayCustom = false;
  activeIndex: number = 0;
  responsiveOptions: any[] = [
    {
      breakpoint: '1500px',
      numVisible: 5,
    },
    {
      breakpoint: '1024px',
      numVisible: 3,
    },
    {
      breakpoint: '768px',
      numVisible: 2,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];

  constructor(
    private commonService: CommonService,
    private router: Router,
    private productService: ProductService,
    private cdr: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    // this.getProjects(this.first, this.rows);

    this.images = [
      {
        itemImageSrc: 'assets/images/gallery/01.jpg',
        thumbnailImageSrc: 'assets/images/gallery/01.jpg',
        alt: 'Description for Image 1',
        title: 'Title 1',
      },
      {
        itemImageSrc: 'assets/images/gallery/02.jpg',
        thumbnailImageSrc: 'assets/images/gallery/02.jpg',
        alt: 'Description for Image 2',
        title: 'Title 2',
      },
      {
        itemImageSrc: 'assets/images/gallery/03.jpg',
        thumbnailImageSrc: 'assets/images/gallery/03.jpg',
        alt: 'Description for Image 3',
        title: 'Title 3',
      },
      {
        itemImageSrc: 'assets/images/gallery/04.jpg',
        thumbnailImageSrc: 'assets/images/gallery/04.jpg',
        alt: 'Description for Image 4',
        title: 'Title 4',
      },
      {
        itemImageSrc: 'assets/images/gallery/05.jpg',
        thumbnailImageSrc: 'assets/images/gallery/05.jpg',
        alt: 'Description for Image 5',
        title: 'Title 5',
      },
      {
        itemImageSrc: 'assets/images/gallery/06.jpg',
        thumbnailImageSrc: 'assets/images/gallery/06.jpg',
        alt: 'Description for Image 6',
        title: 'Title 6',
      },
      {
        itemImageSrc: 'assets/images/gallery/07.jpg',
        thumbnailImageSrc: 'assets/images/gallery/07.jpg',
        alt: 'Description for Image 7',
        title: 'Title 7',
      },
      {
        itemImageSrc: 'assets/images/gallery/08.jpg',
        thumbnailImageSrc: 'assets/images/gallery/08.jpg',
        alt: 'Description for Image 8',
        title: 'Title 8',
      },
      {
        itemImageSrc: 'assets/images/gallery/09.jpg',
        thumbnailImageSrc: 'assets/images/gallery/09.jpg',
        alt: 'Description for Image 9',
        title: 'Title 9',
      },
      {
        itemImageSrc: 'assets/images/gallery/10.jpg',
        thumbnailImageSrc: 'assets/images/gallery/10.jpg',
        alt: 'Description for Image 10',
        title: 'Title 10',
      },
      {
        itemImageSrc: 'assets/images/gallery/11.jpg',
        thumbnailImageSrc: 'assets/images/gallery/11.jpg',
        alt: 'Description for Image 11',
        title: 'Title 11',
      },
      {
        itemImageSrc: 'assets/images/gallery/12.jpg',
        thumbnailImageSrc: 'assets/images/gallery/12.jpg',
        alt: 'Description for Image 12',
        title: 'Title 12',
      },
      {
        itemImageSrc: 'assets/images/gallery/13.jpg',
        thumbnailImageSrc: 'assets/images/gallery/13.jpg',
        alt: 'Description for Image 13',
        title: 'Title 13',
      },
      {
        itemImageSrc: 'assets/images/gallery/14.jpg',
        thumbnailImageSrc: 'assets/images/gallery/14.jpg',
        alt: 'Description for Image 14',
        title: 'Title 14',
      },
      {
        itemImageSrc: 'assets/images/gallery/15.jpg',
        thumbnailImageSrc: 'assets/images/gallery/15.jpg',
        alt: 'Description for Image 15',
        title: 'Title 15',
      },
    ];

    this.getCategories();
    this.getDistricts();
    this.getStatusFilter();
    this.status = [
      {
        id: 7,
        name: 'DRAFT',
        status: 'DRAFT',
      },
      {
        id: 3,
        name: 'REJECTED',
        status: 'REJECTED',
      },
      {
        id: 4,
        name: 'WORK IN PROGRESS',
        status: 'WIP',
      },
      {
        id: 5,
        name: 'WAITING FOR SPONSORS',
        status: 'WFD',
      },

      {
        id: 6,
        name: 'COMPLETED',
        status: 'COMPLETED',
      },
    ];

    const localStorageuser = JSON.parse(localStorage.getItem('user'));

    if (localStorageuser?.roles[0].id == 3) {
      this.status.push({
        id: 1,
        name: 'NEW',
        status: 'NEW',
      });
    } else {
      this.status = this.status.filter((status) => status.id != 1);
    }

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

        const localStorageuser = JSON.parse(localStorage.getItem('user'));

        if (localStorageuser?.roles[0].id == 3) {
          this.projects = data.content;
        } else {
          this.projects = data.content.filter(
            (item: any) => item.statusCode != 'NEW'
          );
        }

        this.serverError = false;
        this.projects.forEach((project: any) => {
          const sponsorAmount = project?.sponsersList?.reduce(
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

  getStatusFilter() {
    this.commonService.getStatusFilter().subscribe(
      (data) => {
        if (data.length > 0) {
          this.status = data;
          this.status = this.status.filter(
            (status) => status.isDeleted != true
          );
          const localStorageuser = JSON.parse(localStorage.getItem('user'));

          if (localStorageuser?.roles[0].id == 3) {
          } else {
            this.status = this.status.filter(
              (status) => status.statusCode != 'WFA'
            );
            this.status = this.status.filter(
              (status) => status.statusCode != 'DRAFT'
            );
            console.log(this.status);
          }
        }
      },
      (err) => {
        //Temp fix for Gopi
        this.districts = HardCodedInfo.districts;
      }
    );
  }
  getDistricts() {
    this.commonService.getDistricts().subscribe(
      async (data) => {
        if (data.length > 0) {
          this.districts = data;
          if (
            this.commonService.selectedProjectFilters.mandal &&
            Object.keys(this.commonService.selectedProjectFilters.mandal)
              .length > 0
          ) {
            this.mandals = await lastValueFrom(
              this.commonService.getMandals(
                this.commonService.selectedProjectFilters.district?.['id']
              )
            );
            this.selectedMandal = this.mandals.find(
              (d) =>
                d.id == this.commonService.selectedProjectFilters.mandal?.['id']
            );
          }

          if (
            this.commonService.selectedProjectFilters.vilage &&
            Object.keys(this.commonService.selectedProjectFilters.vilage)
              .length > 0
          ) {
            this.villages = await lastValueFrom(
              this.commonService.getVillages(
                this.commonService.selectedProjectFilters.mandal?.['id']
              )
            );
            this.selectedVilage = this.villages.find(
              (d) =>
                d.id == this.commonService.selectedProjectFilters.vilage?.['id']
            );
          }

          this.selectedStatus =
            this.commonService.selectedProjectFilters.status;
          this.selectedcategory =
            this.commonService.selectedProjectFilters.category;
          //  this.selectedVilage =
          //  this.commonService.selectedProjectFilters.vilage;
          // this.selectedMandal = this.commonService.selectedProjectFilters.mandal;
          this.selectedDistrict =
            this.commonService.selectedProjectFilters.district;

          if (this.selectedDistrict && this.selectedDistrict.id) {
            // this.projectDMVSearch();
            this.getProjects();
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
    this.commonService.selectedProjectFilters = {
      category: this.selectedcategory,
      district: this.selectedDistrict,
      mandal: this.selectedMandal,
      vilage: this.selectedVilage,
      status: this.selectedStatus,
    };
    this.router.navigate(['project-details'], {
      queryParams: { projectId: project.id },
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
    this.selectedStatus = null;
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
  getProjectProgressImages(data: any, statusImage) {
    if (statusImage) {
      this.commonService.getProjectProgressImages(data.id).subscribe(
        (data: any) => {
          this.projectsProgressImages = data?.filter(
            (item) => item.statusImage != null
          );
          this.activeIndex = 1;
          this.displayCustom = true;
          this.images = this.projectsProgressImages.map((item) => {
            return {
              itemImageSrc: `data:image/jpeg;base64,${item.statusImage}`,
              thumbnailImageSrc: `data:image/jpeg;base64,${item.statusImage}`,
              alt: item.status,
              title: item.status,
            };
          });
        },
        (err) => {
          //Temp fix for Gopi
          this.projectsProgressImages = '';
        }
      );
    }
  }

  deleteProject(id: number) {
    this.commonService.deleteProject(id).subscribe((data) => {
      this.getProjects();
    });
  }
  changeProjectStatus(project: any, status: string) {
    const payload = { ...project, statusCode: status };
    const formData = new FormData();

    // formData.append('user', this.testpayload);
    formData.append(
      'project',
      new Blob([JSON.stringify(payload)], { type: 'application/json' })
    );
    this.commonService.updateProject(formData).subscribe((data) => {
      if (!data.error) {
        this.getProjects();
      }
    });
  }
}
