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
