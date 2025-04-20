import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '@service/common.service';
import { ImportsModule } from '../imports';
import { RoleDirective } from 'src/directives/role-access.directive';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-sponsors',
  standalone: true,
  imports: [CommonModule, ImportsModule, RoleDirective],
  templateUrl: './sponsors.component.html',
  styleUrl: './sponsors.component.scss',
})
export class SponsorsComponent implements OnInit {
  allSponsers: any = [];
  selectedDistrict: any = {};
  selectedMandal: any = {};
  selectedVilage: any = {};
  totalRecords: number = 0;
  first: number = 0;
  rows: number = 30;
  pageNumber: number = 0;
  serverError: boolean;
  mandals: any[];
  villages: any[];
  districts: any[];
  noRecords: boolean = false;
  constructor(private router: Router, private commonService: CommonService) {}

  ngOnInit() {
    this.getAllSponsers();
    this.getDistricts();
  }

  showSponsorDetails(sponser: any) {
    this.router.navigate(['sponsors-details', sponser.id]);
  }

  getDistricts() {
    this.commonService.getDistricts().subscribe(
      (data) => {
        if (data.length > 0) {
          this.districts = data;
          if (this.selectedDistrict && this.selectedDistrict.id) {
            this.getAllSponsers();
          }
        }
      },
      (err) => {
        console.log('Error:', err);
      }
    );
  }

  getMandals(event: any) {
    const districtCode = event.value.id;
    this.selectedDistrict = event.value;
    this.mandals = [];
    this.villages = [];
    this.selectedMandal = null;
    this.selectedVilage = null;
    this.commonService.getMandals(districtCode).subscribe(
      (data) => {
        this.mandals = data;
        this.getAllSponsers();
      },
      (err) => {
        console.log('Error:', err);
      }
    );
  }

  getvilages(event: any) {
    const mandalCode = event.value.id;
    this.selectedMandal = event.value;
    this.villages = [];
    this.selectedVilage = null;
    this.commonService.getVillages(mandalCode).subscribe(
      (data) => {
        this.villages = data;
        this.getAllSponsers();
      },
      (err) => {
        console.log('Error:', err);
      }
    );
  }

  vilageChange(event: any) {
    this.selectedVilage = event.value;
    this.getAllSponsers();
  }

  getAllSponsers() {
    let params = '';

    if (this.selectedDistrict && this.selectedDistrict.id) {
      params = 'districtId=' + this.selectedDistrict.id;
    }
    if (this.selectedMandal && this.selectedMandal.id) {
      params += '&mandalId=' + this.selectedMandal.id;
    }
    if (this.selectedVilage && this.selectedVilage.id) {
      params += '&villageId=' + this.selectedVilage.id;
    }

    params += '&page=' + this.pageNumber;
    params += '&size=' + this.rows;

    this.commonService.getAllSponsers(params).subscribe(
      (data: any) => {
        this.noRecords = false;
        if (!data.content) {
          this.allSponsers = [];
          this.totalRecords = 0;
          return;
        }
        this.allSponsers = data.content.slice(0, 10);
        this.allSponsers = this.allSponsers.map((item) => ({
          ...item,
          imgSrc: `data:image/png;base64,${item.image}`,
        }));
        this.totalRecords = 10;
      },
      (err) => {
        this.noRecords = true;
        //Temp fix for Gopi
        console.log('Error:', err);
      }
    );
  }

  reset() {
    this.selectedDistrict = null;
    this.selectedMandal = null;
    this.selectedVilage = null;
    // this.first = 0;
    // this.rows = 10;
    this.getAllSponsers();
  }

  onPageChange(event: PageEvent) {
    this.first = event.first;
    this.rows = event.rows;
    this.pageNumber = event.page;
    this.getAllSponsers();
  }
}
