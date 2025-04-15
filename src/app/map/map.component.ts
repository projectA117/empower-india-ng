import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';

declare const google: any;

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild('map', { static: true }) mapElement!: ElementRef;

  @Input() villageName: string = '';
  @Input() mandalName: string = '';

  map: any;
  marker: any;

  ngOnInit(): void {
    this.initializeMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['villageName'] ||
      changes['mandalName']
    ) {
      if (this.villageName && this.mandalName && this.map) {
        this.zoomToLocation();
      }
    }
  }

  ngOnDestroy(): void {
    if (this.map) {
      google.maps.event.clearInstanceListeners(this.map);
    }
    if (this.marker) {
      this.marker.setMap(null);
    }
  }

  initializeMap(): void {
    const defaultLatLng = new google.maps.LatLng(16.5062, 80.6480); // Vijayawada
    const mapProperties = {
      center: defaultLatLng,
      zoom: 8,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);

    if (this.villageName && this.mandalName) {
      this.zoomToLocation();
    }
  }

  zoomToLocation(): void {
    const address = `${this.villageName}, ${this.mandalName}, Andhra Pradesh, India`;
    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({ address }, (results: any, status: string) => {
      if (status === 'OK' && results[0]) {
        const location = results[0].geometry.location;
        this.map.setCenter(location);
        this.map.setZoom(11);

        if (this.marker) {
          this.marker.setPosition(location);
        } else {
          this.marker = new google.maps.Marker({
            map: this.map,
            position: location,
            title: address
          });
        }
      } else {
        console.error('Geocode failed: ', status);
      }
    });
  }
}
