import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '@service/common.service';
import { ProductService } from '@service/productservice';

@Component({
  selector: 'app-sponsors',
  standalone: true,
  imports: [],
  templateUrl: './sponsors.component.html',
  styleUrl: './sponsors.component.scss',
  providers: [ProductService, CommonService],
})
export class SponsorsComponent implements OnInit {
  constructor(private router: Router, private productService: ProductService) {}

  ngOnInit() {}

  showSponsorDetails() {
    this.router.navigate(['sponsors-details'], {});
  }
}
