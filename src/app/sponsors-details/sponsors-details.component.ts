import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '@service/common.service';

@Component({
  selector: 'app-sponsors-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sponsors-details.component.html',
  styleUrl: './sponsors-details.component.scss',
})
export class SponsorsDetailsComponent implements OnInit {
  selectedSponsor: any;
  selectedSponsorInformation: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private commonService: CommonService
  ) { }

  ngOnInit() {
    const cardId = this.activatedRoute.snapshot.paramMap.get('id');
    this.commonService.getSelectedSponsors(cardId).subscribe(
      (data) => {
        console.log(data);
        this.selectedSponsorInformation = data;
        this.selectedSponsorInformation = {
          ...this.selectedSponsorInformation,
          imgSrc: `data:image/png;base64,${this.selectedSponsorInformation.donarInfo.image}`
        };
      },
      (err) => {
        //Temp fix for Gopi
      }
    );

  }
}
