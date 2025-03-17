import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '@service/common.service';
import { ProductService } from '@service/productservice';

@Component({
  selector: 'app-sponsors',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sponsors.component.html',
  styleUrl: './sponsors.component.scss',
  providers: [ProductService, CommonService],
})
export class SponsorsComponent implements OnInit {
  allSponsers: any = [];
  constructor(
    private router: Router,
    private productService: ProductService,
    private commonService: CommonService
  ) {}

  ngOnInit() {
    this.getAllSponsers();
  }

  showSponsorDetails() {
    this.router.navigate(['sponsors-details'], {});
  }

  getAllSponsers() {
    this.commonService.getAllSponsers().subscribe({
      next: (data) => {
        if (!data.error) {
          this.allSponsers = data;
        }
        console.log(data);
      },
      error: (err) => console.error('An error occurred :', err),
    });
  }
}
