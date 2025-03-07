import { Component } from '@angular/core';
import { ProductService } from '@service/productservice';
import { CarouselModule } from 'primeng/carousel';

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

  constructor(private productService: ProductService) {}

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
        description: 'Preventive Health Checkup',
        image: 'project-1.jpg',
      },
      {
        id: 22,
        description: 'Dental',
        image: 'project-1.jpg',
      },
      {
        id: 21,
        description: 'Eye Camp',
        image: 'project-1.jpg',
      },
      {
        id: 20,
        description: 'Health Camp',
        image: 'project-1.jpg',
      },
      {
        id: 19,
        description: 'Compound Walls/ Gate',
        image: 'project-1.jpg',
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
}
