import { Component, OnInit } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';
import { CommonModule } from '@angular/common';
import { CommonService } from '@service/common.service';
import { ImportsModule } from '../imports';
import { RoleDirective } from 'src/directives/role-access.directive';
import { GalleryImageUploadComponent } from '../gallery-image-upload/gallery-image-upload.component';

@Component({
  selector: 'app-sponsors',
  standalone: true,
  imports: [GalleriaModule, CommonModule,
    ImportsModule,
    RoleDirective,
    GalleryImageUploadComponent
  ],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
})
export class GalleryComponent implements OnInit {
  displayCustom: boolean | undefined;

  activeIndex: number = 0;

  images: any[] | undefined;

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
  project: any = null;
  addNewProject: boolean = false;
  updateExistingProject: boolean = false;
  showSponsorDialog: boolean = false;
  showImageUploadDialog: boolean = false;

  constructor(
    private commonService: CommonService
  ) { }

  ngOnInit() {
    //this.photoService.getImages().then((images) => (this.images = images));
    // this.images = [
    //   {
    //     itemImageSrc:
    //       'assets/images/gallery/01.jpg',
    //     thumbnailImageSrc:
    //       'assets/images/gallery/01.jpg',
    //     alt: 'Description for Image 1',
    //     title: 'Title 1',
    //   },
    //   {
    //     itemImageSrc:
    //       'assets/images/gallery/02.jpg',
    //     thumbnailImageSrc:
    //       'assets/images/gallery/02.jpg',
    //     alt: 'Description for Image 2',
    //     title: 'Title 2',
    //   },
    //   {
    //     itemImageSrc:
    //       'assets/images/gallery/03.jpg',
    //     thumbnailImageSrc:
    //       'assets/images/gallery/03.jpg',
    //     alt: 'Description for Image 3',
    //     title: 'Title 3',
    //   },
    //   {
    //     itemImageSrc:
    //       'assets/images/gallery/04.jpg',
    //     thumbnailImageSrc:
    //       'assets/images/gallery/04.jpg',
    //     alt: 'Description for Image 4',
    //     title: 'Title 4',
    //   },
    //   {
    //     itemImageSrc:
    //       'assets/images/gallery/05.jpg',
    //     thumbnailImageSrc:
    //       'assets/images/gallery/05.jpg',
    //     alt: 'Description for Image 5',
    //     title: 'Title 5',
    //   },
    //   {
    //     itemImageSrc:
    //       'assets/images/gallery/06.jpg',
    //     thumbnailImageSrc:
    //       'assets/images/gallery/06.jpg',
    //     alt: 'Description for Image 6',
    //     title: 'Title 6',
    //   },
    //   {
    //     itemImageSrc:
    //       'assets/images/gallery/07.jpg',
    //     thumbnailImageSrc:
    //       'assets/images/gallery/07.jpg',
    //     alt: 'Description for Image 7',
    //     title: 'Title 7',
    //   },
    //   {
    //     itemImageSrc:
    //       'assets/images/gallery/08.jpg',
    //     thumbnailImageSrc:
    //       'assets/images/gallery/08.jpg',
    //     alt: 'Description for Image 8',
    //     title: 'Title 8',
    //   },
    //   {
    //     itemImageSrc:
    //       'assets/images/gallery/09.jpg',
    //     thumbnailImageSrc:
    //       'assets/images/gallery/09.jpg',
    //     alt: 'Description for Image 9',
    //     title: 'Title 9',
    //   },
    //   {
    //     itemImageSrc:
    //       'assets/images/gallery/10.jpg',
    //     thumbnailImageSrc:
    //       'assets/images/gallery/10.jpg',
    //     alt: 'Description for Image 10',
    //     title: 'Title 10',
    //   },
    //   {
    //     itemImageSrc:
    //       'assets/images/gallery/11.jpg',
    //     thumbnailImageSrc:
    //       'assets/images/gallery/11.jpg',
    //     alt: 'Description for Image 11',
    //     title: 'Title 11',
    //   },
    //   {
    //     itemImageSrc:
    //       'assets/images/gallery/12.jpg',
    //     thumbnailImageSrc:
    //       'assets/images/gallery/12.jpg',
    //     alt: 'Description for Image 12',
    //     title: 'Title 12',
    //   },
    //   {
    //     itemImageSrc:
    //       'assets/images/gallery/13.jpg',
    //     thumbnailImageSrc:
    //       'assets/images/gallery/13.jpg',
    //     alt: 'Description for Image 13',
    //     title: 'Title 13',
    //   },
    //   {
    //     itemImageSrc:
    //       'assets/images/gallery/14.jpg',
    //     thumbnailImageSrc:
    //       'assets/images/gallery/14.jpg',
    //     alt: 'Description for Image 14',
    //     title: 'Title 14',
    //   },
    //   {
    //     itemImageSrc:
    //       'assets/images/gallery/15.jpg',
    //     thumbnailImageSrc:
    //       'assets/images/gallery/15.jpg',
    //     alt: 'Description for Image 15',
    //     title: 'Title 15',
    //   },
    // ];
    this.commonService.getGalleryImages().subscribe(res => {
      this.images = res;
      this.images = this.images.map(item => ({
        ...item,
        imgSrc: `data:image/png;base64,${item.image}`
      }))
    })
  }

  imageClick(index: number) {
    this.activeIndex = index;
    this.displayCustom = true;
  }

  createProject() {
    this.project = {};
    this.addNewProject = true;
    this.showDialog();
  }
  onHideDialog() {
    this.addNewProject = false;
    this.updateExistingProject = false;
    this.showSponsorDialog = false;
  }
  showDialog() {
    this.showImageUploadDialog = true;
  }

  hideDialog() {
    this.showImageUploadDialog = false;
  }
  refresh(val: boolean) {
    if (val) {
      this.hideDialog();
    }
  }
}
