import { Component, OnInit } from '@angular/core';
import { ProductService } from '@service/productservice';
import { CarouselModule } from 'primeng/carousel';
import { Router, RouterLink } from '@angular/router';
import { CommonService } from '@service/common.service';
import { TableModule } from 'primeng/table';
import { MapViewComponent } from '../map/map-view/map-view.component';
import { ProgressBarModule } from 'primeng/progressbar';
import { CardModule } from 'primeng/card';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CarouselModule,
    TableModule,
    MapViewComponent,
    ProgressBarModule,
    CardModule,
    RouterModule,
    RouterLink,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [ProductService],
})
export class HomeComponent {
  products: any;
  category: any;
  topSponsers: any[] = [];
  responsiveOptions: any[] | undefined;
  responsiveOptionss: any[] | undefined;
  districtProjects: any[] = [];
  totalProjects: any = {};
  dashBoardData: any = {};

  // constructor(private productService: ProductService) {}
  constructor(
    private router: Router,
    private productService: ProductService,
    private commonService: CommonService
  ) {}

  ngOnInit() {
    this.getTopSponsers();
    this.getProjectsCountByDistrict();

    this.getDashboardData();

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
  showSponsorDetails(sponsor: any) {
    this.router.navigate(['sponsors-details', sponsor.id]);
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
          this.topSponsers = data.content;
          this.topSponsers = this.topSponsers.filter(
            (project) => project.image != null
          );
          this.topSponsers = this.topSponsers.map((item) => ({
            ...item,
            imgSrc: `data:image/png;base64,${item.image}`,
          }));
        }

        console.log(data);
      },
      error: (err) => console.error('An error occurred :', err),
    });
  }

  getProjectsCountByDistrict() {
    this.commonService.getProjectsCountByDistrict().subscribe({
      next: (data) => {
        if (data && data.length) {
          this.districtProjects = data;
          this.districtProjects = this.districtProjects.map((item) => ({
            ...item,
            totalCount:
              item.completed + item.inprogress + item.waitingForSponsor,
          }));
          this.totalProjects = {
            districtName: 'Total',
            totalCount: data.reduce(
              (acc, project) => acc + project.totalCount,
              0
            ),
            completed: data.reduce(
              (acc, project) => acc + project.completed,
              0
            ),
            inprogress: data.reduce(
              (acc, project) => acc + project.inprogress,
              0
            ),
            waitingForSponsor: data.reduce(
              (acc, project) => acc + project.waitingForSponsor,
              0
            ),
          };
        }
      },
      error: (err) => console.error('An error occurred :', err),
    });
  }

  getDashboardData() {
    this.commonService.getDashBoardData().subscribe({
      next: (data) => {
        console.log('Dashboard data:', data);
        this.dashBoardData = data;
        this.dashBoardData.villageProjectDonorAmount =
          this.dashBoardData.villageProjectDonorAmount
            .toString()
            .substring(0, 3) * 1;
      },
      error: (err) => console.error('An error occurred :', err),
    });
  }
}
