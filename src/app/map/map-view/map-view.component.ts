import {
  Component,
  OnInit,
  ViewChild,
  ElementRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonService } from '@service/common.service';
import { map, Observable, forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MarkerClusterer, SuperClusterAlgorithm } from '@googlemaps/markerclusterer';

declare const google: any;

@Component({
  selector: 'app-map-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent implements OnInit {
  @ViewChild('fullMap', { static: true }) fullMapElement!: ElementRef;

  private apiKey = 'AIzaSyD76jhu0z9_Jw6amx3SQ8MZ-z68QdFSwGI';
  map: any;
  infoWindow: any;
  projects: any[] = [];
  totalRecords: any;
  geoJsonData: any;
  markers: google.maps.Marker[] = [];

  constructor(
    private commonService: CommonService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.initializeMap();
    this.getProjects();
  }

  initializeMap(): void {
    const mapOptions = {
      center: { lat: 15.9129, lng: 79.7400 },
      zoom: 7,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: false,
      zoomControl: true,
      mapTypeControl: true,
      scaleControl: true,
      streetViewControl: true,
      rotateControl: true,
      fullscreenControl: true,
      scrollwheel: true,
      draggable: true
    };

    this.map = new google.maps.Map(this.fullMapElement.nativeElement, mapOptions);
    this.infoWindow = new google.maps.InfoWindow();

    this.map.data.loadGeoJson('assets/andhra-pradesh.geojson', null, (features) => {
      console.log('GeoJSON data loaded:', features);
      if (features.length === 0) {
        console.error('No features loaded from GeoJSON.');
      }
    });

    this.map.data.setStyle((feature: any) => {
      return {
        strokeColor: '#666666',
        strokeWeight: 1,
        strokeOpacity: 1
      };
    });

    this.map.data.addListener('addfeature', () => {
      const bounds = new google.maps.LatLngBounds();
      this.map.data.forEach((feature: any) => {
        feature.getGeometry().forEachLatLng((latlng: any) => {
          bounds.extend(latlng);
        });
      });
      this.map.fitBounds(bounds);
    });
  }

  getProjects(): void {
    const payload = 'page=0&size=10000';
    this.commonService.getProjects(payload).subscribe(
      (data: any) => {
        if (!data.content) {
          this.projects = [];
          return;
        }
        this.projects = data.content;
        this.totalRecords = data.totalElements;
        console.log('project info', this.projects, this.totalRecords);
        this.convertToGeoJson(this.projects).subscribe(geoJsonData => {
          this.geoJsonData = geoJsonData;
          console.log('GeoJSON Data:', this.geoJsonData);
          this.addMarkersWithClustering();
        }, err => {
          console.error('Error converting to GeoJSON:', err);
        });
      },
      (err) => {
        console.error('Error fetching projects:', err);
        this.projects = [];
      }
    );
  }

  getCoordinates(address: string): Observable<{ lat: number, lng: number }> {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${this.apiKey}`;
    return this.http.get<any>(url).pipe(
      map(response => {
        if (response.results && response.results.length > 0) {
          const location = response.results[0].geometry.location;
          return { lat: location.lat, lng: location.lng };
        } else {
          throw new Error('Unable to geocode address');
        }
      })
    );
  }

  convertToGeoJson(projects: any[]): Observable<any> {
    const addressRequests = projects.map(project => {
      const address = `${project.villageName}, ${project.mandalName}, ${project.districtName}, Andhra Pradesh,India`;
      return this.getCoordinates(address);
    });

    return forkJoin(addressRequests).pipe(
      map(coordinates => {
        const features = projects.map((project, index) => {
          const coord = coordinates[index];
          return {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [coord.lng, coord.lat]
            },
            properties: {
              id: project.id,
              projectCategory: project.projectCategory,
              projectType: project.projectType,
              status: project.status,
              location: project.location,
              projectEstimation: project.projectEstimation,
              governmentShare: project.governmentShare,
              publicShare: project.publicShare,
              description: project.description,
              createdBy: project.createdBy,
              lastUpdatedBy: project.lastUpdatedBy,
              villageName: project.villageName,
              mandalName: project.mandalName,
              districtName: project.districtName,
            }
          };
        });

        return {
          type: 'FeatureCollection',
          features: features
        };
      })
    );
  }

  addMarkersWithClustering(): void {
    const coordMap = new Map<string, any[]>();
    const markers: google.maps.Marker[] = [];
  
    this.geoJsonData.features.forEach((feature: any) => {
      const coords = feature.geometry.coordinates;
      const key = `${coords[1]},${coords[0]}`; // lat,lng as key
  
      if (!coordMap.has(key)) {
        coordMap.set(key, []);
      }
  
      coordMap.get(key)!.push(feature);
    });
  
    coordMap.forEach((featuresAtLocation, coordKey) => {
      const [lat, lng] = coordKey.split(',').map(Number);
      const latLng = new google.maps.LatLng(lat, lng);
  
      const marker = new google.maps.Marker({
        position: latLng,
        // 🚫 DO NOT SET `map: this.map` here
        title: `Projects at this location`
      });
  
      marker.addListener('click', () => {
        let content = '';
  
        if (featuresAtLocation.length === 1) {
          const f = featuresAtLocation[0];
          content = `
            <div>
              <strong>${f.properties.projectType}</strong><br>
              ${f.properties.villageName}, ${f.properties.mandalName}, ${f.properties.districtName}
            </div>
          `;
        } else {
          content = `
            <div>
              <strong>${featuresAtLocation.length} projects at this location</strong><br>
              <ul style="max-height: 150px; overflow-y: auto; padding-left: 1rem;">
                ${featuresAtLocation.map(f => `
                  <li>
                    <b>${f.properties.projectType}</b> - ${f.properties.villageName}<br>
                    ${f.properties.status}, ₹${f.properties.projectEstimation}
                  </li>
                `).join('')}
              </ul>
            </div>
          `;
        }
  
        this.infoWindow.setContent(content);
        this.infoWindow.open(this.map, marker);
      });
  
      markers.push(marker);
    });
  
    new MarkerClusterer({
      markers,
      map: this.map,
      algorithm: new SuperClusterAlgorithm({
        radius: 100,
        maxZoom: 14
      })
    });
  }
  
}
