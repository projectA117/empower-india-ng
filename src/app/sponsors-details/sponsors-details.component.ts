import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '@service/common.service';

@Component({
  selector: 'app-sponsors-details',
  standalone: true,
  imports: [],
  templateUrl: './sponsors-details.component.html',
  styleUrl: './sponsors-details.component.scss',
})
export class SponsorsDetailsComponent implements OnInit {
  selectedSponsor: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private commonService: CommonService
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.selectedSponsor = JSON.parse(params['sponsorID']);
      console.log(this.selectedSponsor);

      if (!this.selectedSponsor) return;
      const payload = {
        // firstName: this.selectedSponsor.firstName,
        // lastName: this.selectedSponsor.lastName,
        // phoneNumber: this.selectedSponsor.phoneNumber,
        // email: this.selectedSponsor.email,
        // address: null,

        firstName: 'sadasd',
        lastName: 'sadasd',
        phoneNumber: '1234567890',
        email: '2343242@gmai.com',
        address: null,
      };
      this.commonService.getSelectedSponsors(payload).subscribe(
        (data) => {
          console.log(data);
        },
        (err) => {
          //Temp fix for Gopi
        }
      );
    });
  }
}
