import { ChangeDetectorRef, Component, effect, OnInit } from '@angular/core';
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
  constructor(
    private commonService: CommonService,
    private router: Router,
    private productService: ProductService,
    private cdr: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.timeZone = this.getTimeZone();
    this.getDistricts();
    this.villagelookups();
    //this.getVillagesDemography();
  }

  reFreshVilageData(event: boolean) {
    if (event) {
      // this.getVillagesDemography();
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
    // this.projectDMVSearch();
    this.getVillagesDemography(event.value.id);
  }
  villagelookups() {
    this.commonService.villagelookups().subscribe((data: any) => {
      this.villagelookupsData = data;
      this.CommunityOptions = data.community;
    });
  }
  projectDMVSearch() {}
  reset() {}

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

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.Latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
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
      latitude: this.Latitude,
      longitude: this.longitude,
      pinCode: this.villageForm.value.pinCode,
    };
    // console.log(payload);
    if (this.vilagEditMode) {
      this.commonService.saveVilageData(payload).subscribe((data) => {
        if (data) {
          this.villageForm.reset();
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
}
