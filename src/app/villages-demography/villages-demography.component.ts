import { ChangeDetectorRef, Component, effect, OnInit } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmationService, MessageService, SortEvent } from 'primeng/api';
import { ProductService } from '@service/productservice';
import { ImportsModule } from '../imports';
import { CommonService } from '../../service/common.service';
import { ProjectComponent } from '../project/project.component';
import { Project } from 'src/models/Project';

import { HardCodedInfo } from 'src/constants/HardCodedInfo';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from '@service/loader.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { CommunityWisePopulationComponent } from './community-wise-population/community-wise-population.component';
import { CultivationCropsComponent } from './cultivation-crops/cultivation-crops.component';
import { EmployedyouthComponent } from './employedyouth/employedyouth.component';
import { InstitutionsComponent } from './institutions/institutions.component';
import { LandUtilizationComponent } from './land-utilization/land-utilization.component';
import { MainOccupationComponent } from './main-occupation/main-occupation.component';
import { UnemployedYouthComponent } from './unemployed-youth/unemployed-youth.component';
import { RoleDirective } from 'src/directives/role-access.directive';
import { lastValueFrom } from 'rxjs';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-villages-demography',
  standalone: true,
  imports: [
    ImportsModule,
    ProjectComponent,
    ImportsModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    TableModule,
    CommonModule,
    CommunityWisePopulationComponent,
    CultivationCropsComponent,
    EmployedyouthComponent,
    InstitutionsComponent,
    LandUtilizationComponent,
    MainOccupationComponent,
    UnemployedYouthComponent,
    RoleDirective,
  ],
  providers: [MessageService, ConfirmationService, ProductService],
  templateUrl: './villages-demography.component.html',
  styleUrl: './villages-demography.component.scss',
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
export class VillagesDemographyComponent implements OnInit {
  getVillagesDemographyData: any = [];
  getVillagesDemographyDataList: any = [];
  unEmployedYouthVillage: any = [];
  employedYouthVillage: any = [];
  villagelookupsData: any = [];
  occupationsData: any = [];
  landUtilizationData: any = [];
  cultivationCropsData: any = [];
  institutionsData: any = [];
  CommunityPopulationData: any = [];
  CommunityOptions: any = [];
  selectedCommunity: any = {};
  vilagEditMode: boolean = false;
  selectedDistrict: any = {};
  selectedMandal: any = {};
  selectedVilage: any = {};
  religionData: any = [
    {
      id: 1,
      name: 'Hindus',
    },
    {
      id: 2,
      name: 'Christians',
    },
    {
      id: 3,
      name: 'Muslims',
    },
    {
      id: 4,
      name: 'Buddhists',
    },
    {
      id: 5,
      name: 'Jains',
    },
    {
      id: 6,
      name: 'Sikhs',
    },
  ];
  languageData: any = [
    {
      id: 1,
      name: 'Telugu',
    },
    {
      id: 2,
      name: 'Hindi',
    },
    {
      id: 3,
      name: 'Urdu',
    },
    {
      id: 4,
      name: 'English',
    },
  ];
  project: any = null;
  districts: any = [];
  mandals: any = [];
  villages: any = [];
  villageFormVisible: boolean = false;
  communityWisePopulationVisible: boolean = false;
  villageForm: FormGroup = new FormGroup({});
  GeolocationError = '';
  timeZone: string = '';
  Latitude: number;
  longitude: number;
  categories: any = [];
  status: any = [];
  selectedStatus: any = '';
  selectedcategory: any = '';
  totalRecords: number = 0;
  first: number = 0;
  rows: number = 10;
  pageNumber: number = 0;
  datastatus: any;
  serverError: boolean = false;
  isSelectedVilage: boolean = false;
  constructor(
    private commonService: CommonService,
    private router: Router,
    private productService: ProductService,
    private cdr: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getCategories();
    this.timeZone = this.getTimeZone();
    //  this.getDistricts();
    this.villagelookups();
    const localStorageuserData = JSON.parse(localStorage.getItem('user'));

    if (localStorageuserData && localStorageuserData.districtId) {
      this.defaultDistricts();
    } else {
      this.getDistricts();
      this.getFilterVillagesDemographyData();
    }

    this.status = [
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

    this.getVillagesDemographyData = [
      {
        Dist: 'NTR',
        Mandal: 'Tiruvuru',
        Village: 'Kokilampadu',
        Population: '2415',
        progress: '2',
        Completed: '1',
        WFS: '4',
        approved: '2',
        Pincode: '517501',
        Actions: 'Actions',
      },
      {
        Dist: 'Chittoor',
        Mandal: 'Kuppam',
        Village: 'Kuppam',
        Population: '21,963',
        progress: '4',
        Completed: '2',
        WFS: '5',
        approved: '1',
        Pincode: '517425',
        Actions: 'Actions',
      },
    ];
  }

  async defaultDistricts() {
    this.districts = await lastValueFrom(this.commonService.getDistricts());
    const localStorageuserData = JSON.parse(localStorage.getItem('user'));
    this.selectedDistrict = this.districts.find(
      (d) => d.id == localStorageuserData.districtId
    );
    this.getFilterVillagesDemographyData();
    this.mandals = await lastValueFrom(
      this.commonService.getMandals(this.selectedDistrict.id)
    );
  }

  customSort(event: SortEvent) {
    console.log(event);
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

  categoryChange(event: any) {
    this.getFilterVillagesDemographyData();
  }

  StatusChange(event: any) {
    this.getFilterVillagesDemographyData();
  }

  reFreshVilageData(event: boolean) {
    if (event) {
      this.getVillagesDemography(this.selectedVilage.id);
    }
  }

  ShowVilage() {
    if (this.selectedVilage?.id) {
      return true;
    } else {
      return false;
    }
  }

  getVillagesDemography(id: any) {
    this.commonService.getVillagesDemography(id).subscribe((data: any) => {
      this.getVillagesDemographyData = data;
      this.unEmployedYouthVillage =
        this.getVillagesDemographyData.unEmployedYouthVillage;

      this.employedYouthVillage =
        this.getVillagesDemographyData.employedYouthVillage;
      this.occupationsData = this.getVillagesDemographyData.occupations;
      this.landUtilizationData =
        this.getVillagesDemographyData.landUtilizationVillage;
      this.cultivationCropsData =
        this.getVillagesDemographyData.cultivationCropsVillage;
      this.institutionsData =
        this.getVillagesDemographyData.institutionsVillages;
      this.CommunityPopulationData = this.getVillagesDemographyData.populations;
    });
  }
  createVillageForm() {
    this.villageForm = new FormGroup({
      // Village: new FormControl('', [Validators.required]),
      // Panchayat: new FormControl('', [Validators.required]),
      // District: new FormControl('', [Validators.required]),
      // Mandal: new FormControl('', [Validators.required]),
      area: new FormControl('', [Validators.required]),
      Religion: new FormControl('', [Validators.required]),
      Language: new FormControl('', [Validators.required]),
      pinCode: new FormControl('', [Validators.required]),
      Boundaries: new FormControl('', [Validators.required]),
      Geographical: new FormControl('', [Validators.required]),
      totalHouse: new FormControl('', [Validators.required]),
      Population: new FormControl('', [Validators.required]),
      PopulationMale: new FormControl('', [Validators.required]),
      PopulationFemale: new FormControl('', [Validators.required]),
      PopulationAboveEighteenMale: new FormControl('', [Validators.required]),
      PopulationAboveEighteenFeMale: new FormControl('', [Validators.required]),
      PopulationAbove60Male: new FormControl('', [Validators.required]),
      PopulationAbove60FeMale: new FormControl('', [Validators.required]),
    });

    this.villageForm.patchValue({
      TimeZone: this.timeZone,
    });
  }

  getDistricts() {
    this.commonService.getDistricts().subscribe(
      (data) => {
        if (data.length > 0) {
          this.districts = data;
        }
      },
      (err) => {
        //Temp fix for Gopi
        this.districts = HardCodedInfo.districts;
      }
    );
  }

  getMandals(event: any) {
    const districtCode = event?.value?.id ? event.value.id : null;
    this.first = 0;
    this.pageNumber = 0;
    this.mandals = [];
    this.villages = [];
    this.selectedMandal = null;
    this.selectedVilage = null;
    if (districtCode) {
      this.commonService.getMandals(districtCode).subscribe(
        (data) => {
          this.mandals = data;
          // this.projectDMVSearch();
          this.getFilterVillagesDemographyData();
        },
        (err) => {
          //Temp fix for Gopi
          this.mandals = HardCodedInfo.mandals;
        }
      );
    } else {
      this.getFilterVillagesDemographyData();
    }
  }

  getvilages(event: any) {
    const mandalCode = event.value.id;
    this.first = 0;
    this.pageNumber = 0;
    this.villages = [];
    this.selectedVilage = null;
    this.commonService.getVillages(mandalCode).subscribe(
      (data) => {
        this.villages = data;
        this.getFilterVillagesDemographyData();
      },
      (err) => {
        //Temp fix for Gopi
        this.villages = HardCodedInfo.villages;
      }
    );
  }

  vilageChange(event: any) {
    // this.projectDMVSearch();
    this.isSelectedVilage = true;
    this.getVillagesDemography(event.value.id);
  }
  villagelookups() {
    this.commonService.villagelookups().subscribe((data: any) => {
      this.villagelookupsData = data;
      this.CommunityOptions = data.community;
    });
  }
  projectDMVSearch() {}
  reset() {
    this.selectedVilage = null;
    this.isSelectedVilage = false;
    this.pageNumber = 0;
    this.first = 0;
    this.selectedDistrict = null;
    this.selectedMandal = null;
    this.selectedcategory = null;
    this.selectedStatus = null;
    this.getFilterVillagesDemographyData();
  }

  editVillage() {
    this.createVillageForm();
    this.villageFormVisible = true;
    this.vilagEditMode = true;
    this.villageForm.patchValue({
      area: this.getVillagesDemographyData.area,
      Religion: this.religionData[0].id,
      Language: this.languageData[0].id,
      pinCode: this.getVillagesDemographyData.pinCode,
      Boundaries: this.getVillagesDemographyData.boundariesVillage,
      Geographical: this.getVillagesDemographyData.geographicalArea,
      totalHouse: this.getVillagesDemographyData.noOfHouses,
      Population: this.getVillagesDemographyData.totalPopulation,
      PopulationMale: this.getVillagesDemographyData.adultMalePopulation,
      PopulationFemale: this.getVillagesDemographyData.adultFemalePopulation,
      PopulationAboveEighteenMale:
        this.getVillagesDemographyData.childMalePopulation,
      PopulationAboveEighteenFeMale:
        this.getVillagesDemographyData.childFemalePopulation,
      PopulationAbove60Male: this.getVillagesDemographyData.area,
      PopulationAbove60FeMale: this.getVillagesDemographyData.area,
    });
  }

  getLocation(getVillagesDemographyData: any) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          getVillagesDemographyData.latitude = position.coords.latitude;
          getVillagesDemographyData.longitude = position.coords.longitude;
        },
        (error) => {
          alert('Sorry, no position available.');
        }
      );
    } else {
      this.GeolocationError = 'Geolocation is not supported by this browser.';
    }
  }

  getTimeZone() {
    var offset = new Date().getTimezoneOffset(),
      o = Math.abs(offset);
    return (
      (offset < 0 ? '+' : '-') +
      ('00' + Math.floor(o / 60)).slice(-2) +
      ':' +
      ('00' + (o % 60)).slice(-2)
    );
  }

  updateVillageDataForm() {
    this.villageFormVisible = false;
    const payload = {
      id: this.getVillagesDemographyData.id,
      villageId:
        this.getVillagesDemographyData.villageId ?? this.selectedVilage.id,
      noOfHouses: this.villageForm.value.totalHouse,
      totalPopulation: this.villageForm.value.Population,
      boundariesVillage: this.villageForm.value.Boundaries,
      geographicalArea: this.villageForm.value.Geographical,
      adultMalePopulation: this.villageForm.value.PopulationMale,
      adultFemalePopulation: this.villageForm.value.PopulationFemale,
      childMalePopulation: this.villageForm.value.PopulationAboveEighteenMale,
      childFemalePopulation:
        this.villageForm.value.PopulationAboveEighteenFeMale,
      above60Male: this.villageForm.value.PopulationAbove60Male,
      above60Female: this.villageForm.value.PopulationAbove60FeMale,
      area: this.villageForm.value.area,
      latitude: this.getVillagesDemographyData.latitude,
      longitude: this.getVillagesDemographyData.longitude,
      pinCode: this.villageForm.value.pinCode,
    };
    // console.log(payload);
    if (this.vilagEditMode) {
      this.commonService.saveVilageData(payload).subscribe((data) => {
        if (data) {
          this.villageForm.reset();
          this.getVillagesDemography(this.selectedVilage.id);
        }
      });
    } else {
      this.commonService
        .updateCommunityVilageData(payload)
        .subscribe((data) => {
          if (data) {
            this.villageForm.reset();
          }
        });
    }
  }

  async showSelectedVillage(data: any) {
    this.selectedDistrict = this.districts.find((d) => d.id == data.districtId);

    this.mandals = await lastValueFrom(
      this.commonService.getMandals(this.selectedDistrict.id)
    );
    this.selectedMandal = this.mandals.find((d) => d.id == data.mandalId);

    this.villages = await lastValueFrom(
      this.commonService.getVillages(this.selectedMandal.id)
    );
    this.selectedVilage = this.villages.find((d) => d.id == data.villageId);
    this.isSelectedVilage = true;
    this.getVillagesDemography(data.villageId);
  }

  hideSelectedVillage(data: any) {
    this.isSelectedVilage = false;
    this.selectedVilage = null;
    this.pageNumber = 0;
    this.first = 0;
    this.getFilterVillagesDemographyData();
    //this.reset();
  }

  getFilterVillagesDemographyData() {
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

    this.commonService.villageslookupProjects(params).subscribe(
      (data: any) => {
        if (!data.content) {
          this.getVillagesDemographyDataList = [];
          this.totalRecords = 0;
          this.datastatus = data.status;
          this.serverError = true;
          return;
        }

        const localStorageuser = JSON.parse(localStorage.getItem('user'));

        if (localStorageuser?.roles[0].id == 3) {
          this.getVillagesDemographyDataList = data.content;
        } else {
          this.getVillagesDemographyDataList = data.content.filter(
            (item: any) => item.statusCode != 'NEW'
          );
        }

        this.serverError = false;

        this.totalRecords = data.totalElements;
      },
      (err) => {
        //Temp fix for Gopi
        // this.projects = HardCodedInfo.projects;
      }
    );
  }

  onPageChange(event: PageEvent) {
    this.first = event.first;
    this.rows = event.rows;
    this.pageNumber = event.page;
    this.getFilterVillagesDemographyData();
  }
}
