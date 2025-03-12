import { Component, OnInit } from '@angular/core';
import { ProductService } from '@service/productservice';
import { CarouselModule } from 'primeng/carousel';
import { Router } from '@angular/router';
import { CommonService } from '@service/common.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [ProductService, CommonService],
})
export class HomeComponent {
  products: any;
  category: any;
  topSponsers: any[] = [];
  responsiveOptions: any[] | undefined;
  responsiveOptionss: any[] | undefined;

  // constructor(private productService: ProductService) {}
  constructor(
    private router: Router,
    private productService: ProductService,
    private commonService: CommonService
  ) {}

  ngOnInit() {
    this.getTopSponsers();

    this.topSponsers = [
      {
        id: null,
        firstName: 'Srini ',
        lastName: 'Nannapaneni',
        phoneNumber: '1234567890',
        email: '2343242@gmai.com',
        address: '234324',
        amount: '15,00,000',
        category: null,
        villageId: null,
        villageName: 'Kakarla',
        mandalId: null,
        mandalName: 'Tiruvuru',
        districtId: null,
        districtName: 'NTR',
        memoryOf: null,
        modeOfPayment: null,
        image: '01.png',
      },
      {
        id: null,
        firstName: 'Madhusudhan',
        lastName: '',
        phoneNumber: '1234567890',
        email: '2343242@gmai.com',
        address: '234324',
        amount: '12,00,000',
        category: null,
        villageId: null,
        villageName: 'Kavali',
        mandalId: null,
        mandalName: 'Kavali',
        districtId: null,
        districtName: 'Nellore',
        memoryOf: null,
        modeOfPayment: null,
        image: '05.png',
      },
      {
        id: null,
        firstName: 'Suhasini',
        lastName: '',
        phoneNumber: '1234567890',
        email: '2343242@gmai.com',
        address: '234324',
        amount: '9,00,000',
        category: null,
        villageId: null,
        villageName: 'Samalkota',
        mandalId: null,
        mandalName: 'Samalkot',
        districtId: null,
        districtName: 'East Godavari',
        memoryOf: null,
        modeOfPayment: null,
        image: '09.png',
      },
      {
        id: null,
        firstName: 'Rajani',
        lastName: 'Gandham',
        phoneNumber: '1234567890',
        email: '2343242@gmai.com',
        address: '234324',
        amount: '9,00,000',
        category: null,
        villageId: null,
        villageName: 'Amalapuram',
        mandalId: null,
        mandalName: 'Amalapuram',
        districtId: null,
        districtName: 'East Godavari',
        memoryOf: null,
        modeOfPayment: null,
        image: '16.png',
      },
      {
        id: null,
        firstName: 'Somesh',
        lastName: 'Veera',
        phoneNumber: '1234567890',
        email: '2343242@gmai.com',
        address: '234324',
        amount: '8,50,000',
        category: null,
        villageId: null,
        villageName: 'Avulanatham',
        mandalId: null,
        mandalName: 'Kuppam',
        districtId: null,
        districtName: 'Chittore',
        memoryOf: null,
        modeOfPayment: null,
        image: '18.png',
      },
    ];

    this.products = [
      {
        id: '1',
        name: 'Vijayawada',
        image: 'vijayawada.jpg',
      },
      {
        id: '2',
        name: 'Nellore',
        image: 'nellore.jpg',
      },
      {
        id: '3',
        name: 'Guntur',
        image: 'guntur.jpg',
      },
      {
        id: '4',
        name: 'Machilipatnam',
        image: 'machilipatnam.jpg',
      },
      
    ];
    this.responsiveOptionss = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '991px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1,
      },
    ];

    this.category = [
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
        image: 'music.png',
      },
      {
        id: 17,
        description: 'Computers',
        image: 'computer.png',
      },
      {
        id: 16,
        description: 'Sanitary Pads',
        image: 'sanitary.png',
      },
      {
        id: 15,
        description: 'Dustbins',
        image: 'dustbin.png',
      },
      {
        id: 14,
        description: 'Sports Kits',
        image: 'sports.png',
      },
    ];

    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 4,
        numScroll: 1,
      },
      {
        breakpoint: '991px',
        numVisible: 3,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1,
      },
    ];
    
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
  showSponsorDetails() {
    this.router.navigate(['sponsors-details'], {});
  }

  showprojectcategoryDetails(selectedCategory: any) {
    this.router.navigate(['projects'], {
      queryParams: { category: selectedCategory.id },
    });
  }

  getTopSponsers() {
    this.commonService.getTopSponsers().subscribe({
      next: (data) => {
        if (!data.error) {
          // this.topSponsers = data;
        }
        console.log(data);
      },
      error: (err) => console.error('An error occurred :', err),
    });
  }
}
