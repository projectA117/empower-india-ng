import { Component, OnInit } from '@angular/core';
import {
  FormsModule,
  FormControl,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Product } from '@domain/product';
import { ProductService } from '@service/productservice';
import { ImportsModule } from '../imports';
import { CommonService } from '../../service/common.service';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  standalone: true,
  imports: [ImportsModule, FormsModule, DropdownModule, ReactiveFormsModule],
  providers: [
    MessageService,
    ConfirmationService,
    ProductService,
    CommonService,
  ],
  styleUrl: './projects.component.scss',
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
  productDialog: boolean = false;

  products!: Product[];

  product!: Product;

  selectedProducts!: Product[] | null;

  submitted: boolean = false;

  statuses!: any[];

  selectedDistrict: any = {};
  selectMandals: any = {};
  selectVilage: any = {};
  DistrictDetails: any = [
    {
      id: 1,
      code: '745',
      name: 'ALLURI SITARAMARAJU',
      stateId: 1,
    },
    {
      id: 2,
      code: '744',
      name: 'ANAKAPALLI',
      stateId: 1,
    },
    {
      id: 26,
      code: '502',
      name: 'ANANTAPURAMU',
      stateId: 1,
    },
    {
      id: 3,
      code: '753',
      name: 'ANNAMAYYA',
      stateId: 1,
    },
    {
      id: 4,
      code: '750',
      name: 'BAPATLA',
      stateId: 1,
    },
    {
      id: 5,
      code: '503',
      name: 'CHITTOOR',
      stateId: 1,
    },
    {
      id: 6,
      code: '505',
      name: 'EAST GODAVARI',
      stateId: 1,
    },
    {
      id: 7,
      code: '748',
      name: 'ELURU',
      stateId: 1,
    },
    {
      id: 8,
      code: '506',
      name: 'GUNTUR',
      stateId: 1,
    },
    {
      id: 9,
      code: '746',
      name: 'KAKINADA',
      stateId: 1,
    },
    {
      id: 10,
      code: '747',
      name: 'KONASEEMA',
      stateId: 1,
    },
    {
      id: 11,
      code: '510',
      name: 'KRISHNA',
      stateId: 1,
    },
    {
      id: 12,
      code: '511',
      name: 'KURNOOL',
      stateId: 1,
    },
    {
      id: 13,
      code: '755',
      name: 'NANDYAL',
      stateId: 1,
    },
    {
      id: 14,
      code: '749',
      name: 'NTR',
      stateId: 1,
    },
    {
      id: 15,
      code: '751',
      name: 'PALNADU',
      stateId: 1,
    },
    {
      id: 16,
      code: '743',
      name: 'PARVATHIPURAM MANYAM',
      stateId: 1,
    },
    {
      id: 17,
      code: '517',
      name: 'PRAKASAM',
      stateId: 1,
    },
    {
      id: 18,
      code: '515',
      name: 'SPR NELLORE',
      stateId: 1,
    },
    {
      id: 20,
      code: '754',
      name: 'SRI SATYA SAI',
      stateId: 1,
    },
    {
      id: 19,
      code: '519',
      name: 'SRIKAKULAM',
      stateId: 1,
    },
    {
      id: 21,
      code: '752',
      name: 'TIRUPATI',
      stateId: 1,
    },
    {
      id: 22,
      code: '520',
      name: 'VISAKHAPATNAM',
      stateId: 1,
    },
    {
      id: 23,
      code: '521',
      name: 'VIZIANAGARAM',
      stateId: 1,
    },
    {
      id: 24,
      code: '523',
      name: 'WEST GODAVARI',
      stateId: 1,
    },
    {
      id: 25,
      code: '504',
      name: 'YSR KADAPA',
      stateId: 1,
    },
  ];

  MandalsDetails: any = [
    {
      id: 1,
      code: '4887',
      name: 'Addateegala (అడ్డతీగల)',
      districtId: 1,
    },
    {
      id: 2,
      code: '4845',
      name: 'Ananthagiri (అనంతగిరి)',
      districtId: 1,
    },
    {
      id: 3,
      code: '4844',
      name: 'Araku Valley (అరుకువేలీ)',
      districtId: 1,
    },
    {
      id: 4,
      code: '4849',
      name: 'Chintapalle (చింతపల్లి)',
      districtId: 1,
    },
    {
      id: 5,
      code: '4732',
      name: 'Chintur (చింతూరు)',
      districtId: 1,
    },
    {
      id: 6,
      code: '4885',
      name: 'Devipatnam (దేవీపట్నం)',
      districtId: 1,
    },
    {
      id: 7,
      code: '4843',
      name: 'Dumbriguda (డుంబ్రిగుడ)',
      districtId: 1,
    },
    {
      id: 8,
      code: '4848',
      name: 'Gangaraju Madugula (జి.మాడుగుల)',
      districtId: 1,
    },
    {
      id: 9,
      code: '4894',
      name: 'Gangavaram (గంగవరం)',
      districtId: 1,
    },
    {
      id: 10,
      code: '4850',
      name: 'Gudem Kothaveedhi (జి.కె.వీది)',
      districtId: 1,
    },
    {
      id: 11,
      code: '4846',
      name: 'Hukumpeta (హుక్కుంపేట)',
      districtId: 1,
    },
    {
      id: 12,
      code: '4851',
      name: 'Koyyuru ( కొయ్యూరు)',
      districtId: 1,
    },
    {
      id: 13,
      code: '4731',
      name: 'Kunavaram (కూనవరం)',
      districtId: 1,
    },
    {
      id: 14,
      code: '4884',
      name: 'Maredumilli (మారేడుమిల్లి)',
      districtId: 1,
    },
    {
      id: 15,
      code: '4841',
      name: 'Munchingput (ముంచంగిపుట్టు)',
      districtId: 1,
    },
    {
      id: 16,
      code: '6063',
      name: 'Nellipaka (నెల్లిపాక)',
      districtId: 1,
    },
    {
      id: 17,
      code: '4847',
      name: 'Paderu (పాడేరు)',
      districtId: 1,
    },
    {
      id: 18,
      code: '4842',
      name: 'Pedabayalu (పెదబయలు)',
      districtId: 1,
    },
    {
      id: 19,
      code: '4888',
      name: 'Rajavommangi (రాజఒమ్మంగి)',
      districtId: 1,
    },
    {
      id: 20,
      code: '4895',
      name: 'Rampachodavaram (రంపచోడవరం)',
      districtId: 1,
    },
    {
      id: 21,
      code: '4733',
      name: 'Vararamachandrapuram (వి ఆర్ పురం)',
      districtId: 1,
    },
    {
      id: 22,
      code: '4886',
      name: 'Y Ramavaram (వై. రామవరం)',
      districtId: 1,
    },
  ];

  VilageDetais: any = [
    { id: 1, code: '586842', name: 'ADDATEEGALA', mandalId: 1 },
  ];
  mandals = [];
  vilage = [];
  newProjectDetails: any;
  newProjectListNames: any;
  newProjectForm: FormGroup = new FormGroup({});
  constructor(
    private productService: ProductService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private commonService: CommonService
  ) {}

  getDistrict(event: any) {
    // console.log(event.value.DistrictCode);
    // const districtCode = event.value.DistrictCode;
    // this.mandals = this.MandalsDetails.find(
    //   (d: any) => d.DistrictCode === districtCode
    // )?.Get_mandals;
  }

  getMandals(event: any) {
    this.mandals = this.MandalsDetails;
    // this.mandals = data;
    // const districtCode = event.value.id;
    // this.commonService.getMandals(districtCode).subscribe((data) => {
    //   this.mandals = data;
    // });
  }

  getvilages(event: any) {
    this.vilage = this.VilageDetais;
    // const mandalCode = event.value.id;
    // this.commonService.getVillages(mandalCode).subscribe((data) => {
    //   this.vilage = data;
    // });
  }

  getProjectNames(event: any) {
    const projectCategoryCode = event.value.projects;
    this.newProjectListNames = projectCategoryCode;
  }

  ngOnInit() {
    this.productService.getProducts().then((data) => (this.products = data));

    this.statuses = [
      { label: 'New', value: 'New' },
      { label: 'Existing', value: 'Existing' },
      { label: 'Inprogress', value: 'Inprogress' },
    ];

    // this.commonService.getProjects().subscribe((data) => {
    //   // this.products = data;
    //   console.log('commonService' + data);
    // });

    // this.commonService.getDistricts().subscribe((data) => {
    //   this.DistrictDetails = data;
    // });

    // this.commonService.getNewProjectDetails().subscribe((data) => {
    //   this.newProjectDetails = data;
    // });
    this.newProjectDetails = [
      {
        id: 1,
        name: 'School',
        projects: [
          {
            id: 23,
            description: 'Preventive Health Checkup',
          },
          {
            id: 22,
            description: 'Dental',
          },
          {
            id: 21,
            description: 'Eye Camp',
          },
          {
            id: 20,
            description: 'Health Camp',
          },
          {
            id: 19,
            description: 'Compound Walls/ Gate',
          },
          {
            id: 18,
            description: 'Audio System',
          },
          {
            id: 17,
            description: 'Computers',
          },
          {
            id: 16,
            description: 'Sanitary Pad',
          },
          {
            id: 15,
            description: 'Dustbins',
          },
          {
            id: 14,
            description: 'Sports Kits',
          },
          {
            id: 13,
            description: 'Paints',
          },
          {
            id: 12,
            description: 'Cycles',
          },
          {
            id: 11,
            description: 'Library',
          },
          {
            id: 10,
            description: 'Toilets',
          },
          {
            id: 9,
            description: 'RO Plant',
          },
          {
            id: 8,
            description: 'Benches',
          },
          {
            id: 7,
            description: 'Digital Boards',
          },
          {
            id: 6,
            description: 'Solar Fencing',
          },
          {
            id: 5,
            description: 'CC Cameras',
          },
          {
            id: 4,
            description: 'Racks',
          },
          {
            id: 3,
            description: 'Ceiling Fans',
          },
          {
            id: 2,
            description: 'Class Rooms',
          },
          {
            id: 1,
            description: 'Library Books',
          },
        ],
      },
    ];
    this.newProjectForm = new FormGroup({
      newProjectdistrict: new FormControl(''),
      newProjectName: new FormControl(''),
      newProjectmandal: new FormControl(''),
      newProjectvillage: new FormControl(''),
      newProjectCategory: new FormControl(''),
      newProjectListNames: new FormControl(''),
      newProjectDescription: new FormControl(''),
      newProjectLatitude: new FormControl(''),
      newProjectLongitude: new FormControl(''),
      newProjectAddress: new FormControl(''),
      newProjectEstimation: new FormControl(''),
      newProjectGovtShare: new FormControl(''),
      newProjectPublicShare: new FormControl(''),
      newProjectType: new FormControl(''),
      newProjectCommitee: new FormControl(''),
    });
  }

  openNew() {
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter(
          (val) => !this.selectedProducts?.includes(val)
        );
        this.selectedProducts = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Products Deleted',
          life: 3000,
        });
      },
    });
  }

  editProduct(product: Product) {
    this.product = { ...product };
    this.productDialog = true;
  }

  deleteProduct(product: Product) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter((val) => val.id !== product.id);
        this.product = {};
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Deleted',
          life: 3000,
        });
      },
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  savenewProjectForm() {
    console.log(this.newProjectForm.value);
  }

  saveProduct() {
    this.submitted = true;

    if (this.product.name?.trim()) {
      if (this.product.id) {
        this.products[this.findIndexById(this.product.id)] = this.product;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Updated',
          life: 3000,
        });
      } else {
        this.product.id = this.createId();
        this.product.image = 'product-placeholder.svg';
        this.products.push(this.product);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Created',
          life: 3000,
        });
      }

      this.products = [...this.products];
      this.productDialog = false;
      this.product = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    var chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
    }
  }
}
