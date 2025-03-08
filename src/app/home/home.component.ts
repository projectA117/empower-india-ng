import { Component, OnInit } from '@angular/core';
import { ProductService } from '@service/productservice';
import { CarouselModule } from 'primeng/carousel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [ProductService],
})
export class HomeComponent {
  products: any;
  category: any;

  responsiveOptions: any[] | undefined;

  // constructor(private productService: ProductService) {}
  constructor(private router: Router, private productService: ProductService) {}

  ngOnInit() {
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

    this.category = [
      {
        id: 23,
        description: 'Bus helter',
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
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 1,
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
}
