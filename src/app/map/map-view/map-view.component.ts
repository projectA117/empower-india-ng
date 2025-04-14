import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  private defaultZoom = 8;
  private defaultCenter = { lat: 16.5062, lng: 80.6480 };
  private readonly DISTRICT_ZOOM = 7;
  private readonly CLUSTER_ZOOM = 10;
  private readonly MARKER_ZOOM = 13;

  map: google.maps.Map | undefined;
  infoWindow: google.maps.InfoWindow | undefined;
  projects: any[] = [];
  totalRecords: any;
  geoJsonData: any;
  markers: google.maps.Marker[] = [];
  circles: google.maps.Circle[] = [];
  isDetailView = false;
  markerClusterer: MarkerClusterer | null = null;
  allMarkers: google.maps.Marker[] = [];

  constructor(
    private commonService: CommonService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.initializeMap();
    this.getProjects();
  }

  initializeMap(): void {
    const mapOptions: google.maps.MapOptions = {
      center: this.defaultCenter,
      zoom: this.defaultZoom,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: false,
      zoomControl: true,
      mapTypeControl: true,
      scaleControl: true,
      streetViewControl: true,
      rotateControl: true,
      fullscreenControl: true,
      scrollwheel: true,
      draggable: true,
      minZoom: 7
    };

    this.map = new google.maps.Map(this.fullMapElement.nativeElement, mapOptions);
    this.infoWindow = new google.maps.InfoWindow({ maxWidth: 320, disableAutoPan: true });

    this.map.data.loadGeoJson('assets/andhra-pradesh.geojson', null, (features) => {
      if (features.length === 0) {
        console.error('No features loaded from GeoJSON.');
      }
    });

    this.map.data.setStyle(() => ({
      strokeColor: '#000000',
      strokeWeight: 2,
      strokeOpacity: 0.75,
      fillColor: '#d1eafa',
      fillOpacity: 0.5
    }));

    this.map.data.addListener('addfeature', () => {
      const bounds = new google.maps.LatLngBounds();
      this.map!.data.forEach((feature: any) => {
        feature.getGeometry().forEachLatLng((latlng: any) => bounds.extend(latlng));
      });
      this.map!.fitBounds(bounds);
    });

    this.map.addListener('zoom_changed', () => {
      const currentZoom = this.map!.getZoom();
      this.handleZoomChange(currentZoom);
    });
  }

  handleZoomChange(currentZoom: number): void {
    if (!this.geoJsonData) return;

    this.clearOverlays();

    if (currentZoom <= this.DISTRICT_ZOOM) {
      this.addDistrictCircles();
    } else if (currentZoom <= this.CLUSTER_ZOOM) {
      this.showClusteredMarkers();
    } else {
      this.showIndividualMarkers();
    }
  }

  showClusteredMarkers(): void {
    if (!this.allMarkers.length) {
      this.createAllMarkers();
    }

    this.markerClusterer = new MarkerClusterer({
      markers: this.allMarkers,
      map: this.map,
      algorithm: new SuperClusterAlgorithm({
        radius: 60,
        maxZoom: this.MARKER_ZOOM
      }),
      renderer: {
        render: ({ count, position, markers }) => {
          const marker = new google.maps.Marker({
            position,
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: Math.max(20, Math.min(count * 3, 35)),
              fillColor: "#ff4444",
              fillOpacity: 0.7,
              strokeWeight: 2,
              strokeColor: "#ff0000"
            },
            label: {
              text: String(count),
              color: "white",
              fontSize: "12px"
            },
            zIndex: Number(google.maps.Marker.MAX_ZINDEX) + count
          });

          let hoverTimeout: number;

          marker.addListener('mouseover', () => {
            hoverTimeout = window.setTimeout(() => {
              const content = `
                <div class="cluster-info-window">
                  <div class="cluster-info-title">${count} Projects in this area</div>
                  <div class="cluster-info-list">
                  ${markers.slice(0, 5).map(m => {
                const projectType = (m as any)['projectType'] ?? '';
                const location = (m as any)['location'] ?? '';
                return `
                      <div class="cluster-info-item">
                        <strong>${projectType}</strong><br>
                        ${location}
                      </div>
                    `;
              }).join('')}                  
                    ${markers.length > 5 ? `
                      <div class="cluster-info-item">
                        And ${markers.length - 5} more projects...
                      </div>
                    ` : ''}
                  </div>
                </div>
              `;
              this.infoWindow!.setContent(content);
              this.infoWindow!.open(this.map, marker);
            }, 200);
          });

          marker.addListener('mouseout', () => {
            clearTimeout(hoverTimeout);
            setTimeout(() => this.infoWindow?.close(), 100);
          });

          return marker;
        }
      }
    });
  }

  showIndividualMarkers(): void {
    if (!this.allMarkers.length) {
      this.createAllMarkers();
    }
    this.allMarkers.forEach(marker => marker.setMap(this.map));
  }

  createAllMarkers(): void {
    this.allMarkers = this.geoJsonData.features.map((feature: any) => {
      const position = new google.maps.LatLng(
        feature.geometry.coordinates[1],
        feature.geometry.coordinates[0]
      );

      const marker = new google.maps.Marker({
        position,
        title: feature.properties.projectType,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: "#4285F4",
          fillOpacity: 0.7,
          strokeWeight: 1,
          strokeColor: "#ffffff"
        }
      });

      marker.set('projectType', feature.properties.projectType);
      marker.set('location', `${feature.properties.villageName}, ${feature.properties.mandalName}`);

      const content = `
        <div class="info-window-content">
          <div class="info-window-title">${feature.properties.projectType} - ${feature.properties.projectCategory}</div> 
          <div class="info-window-details">
            <strong>Location:</strong> ${feature.properties.villageName}, ${feature.properties.mandalName}<br>
            <strong>Status:</strong> ${feature.properties.status}<br>
            <strong>Budget:</strong> ₹${feature.properties.projectEstimation}
          </div>
        </div>
      `;

      let mouseOverTimeout: number;

      marker.addListener('mouseover', () => {
        mouseOverTimeout = window.setTimeout(() => {
          this.infoWindow!.setContent(content);
          this.infoWindow!.open(this.map, marker);
        }, 200);
      });

      marker.addListener('mouseout', () => {
        clearTimeout(mouseOverTimeout);
        setTimeout(() => this.infoWindow?.close(), 100);
      });

      return marker;
    });
  }

  clearOverlays(): void {
    this.markerClusterer?.clearMarkers();
    this.markerClusterer = null;

    this.circles.forEach(c => c.setMap(null));
    this.circles = [];

    this.allMarkers.forEach(m => m.setMap(null));
    this.infoWindow?.close();
  }

  addDistrictCircles(): void {
    const districtMap = new Map<string, any[]>();

    this.geoJsonData.features.forEach((feature: any) => {
      const districtName = feature.properties.districtName;
      if (!districtMap.has(districtName)) {
        districtMap.set(districtName, []);
      }
      districtMap.get(districtName)!.push(feature);
    });

    districtMap.forEach((featuresInDistrict, districtName) => {
      const avgLat = featuresInDistrict.reduce((sum, feature) => sum + feature.geometry.coordinates[1], 0) / featuresInDistrict.length;
      const avgLng = featuresInDistrict.reduce((sum, feature) => sum + feature.geometry.coordinates[0], 0) / featuresInDistrict.length;

      const center = new google.maps.LatLng(avgLat, avgLng);

      const circle = new google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        map: this.map,
        center,
        radius: 15000,
        clickable: true
      });

      const label = new google.maps.Marker({
        position: center,
        map: this.map,
        label: {
          text: featuresInDistrict.length.toString(),
          color: 'white'
        },
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 0
        }
      });

      const content = `
        <div class="info-window-content">
          <div class="info-window-title">${districtName} District</div>
          <div class="info-window-details">
            <strong>Total Projects:</strong> ${featuresInDistrict.length}<br>
            <div style="margin-top: 8px;">Click to view projects in this district</div>
          </div>
        </div>
      `;

      let mouseOverTimeout: number;

      circle.addListener('mouseover', () => {
        mouseOverTimeout = window.setTimeout(() => {
          this.infoWindow!.setContent(content);
          this.infoWindow!.open(this.map, label);
        }, 200);
      });

      circle.addListener('mouseout', () => {
        clearTimeout(mouseOverTimeout);
        setTimeout(() => this.infoWindow?.close(), 100);
      });

      circle.addListener('click', () => {
        this.map!.setZoom(this.CLUSTER_ZOOM);
        this.map!.setCenter(center);
      });

      this.circles.push(circle);
    });
  }

  getProjects(): void {
    const payload = 'page=0&size=10000000';
    this.commonService.getProjects(payload).subscribe(
      (data: any) => {
        if (!data.content) {
          this.projects = [];
          return;
        }
        this.projects = data.content;
        this.totalRecords = data.totalElements;
        this.convertToGeoJson(this.projects).subscribe(geoJsonData => {
          this.geoJsonData = geoJsonData;
          this.addDistrictCircles();
        }, err => {
          console.error('Error converting to GeoJSON:', err);
        });
      },
      err => {
        console.error('Error fetching projects:', err);
        this.projects = [];
      }
    );
  }

  getCoordinates(address: string): Observable<{ lat: number; lng: number }> {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${this.apiKey}`;
    return this.http.get<any>(url).pipe(
      map(response => {
        if (response.results?.length > 0) {
          return response.results[0].geometry.location;
        }
        throw new Error('Unable to geocode address');
      })
    );
  }

  convertToGeoJson(projects: any[]): Observable<any> {
    const addressRequests = projects.map(project => {
      const address = `${project.villageName}, ${project.mandalName}, ${project.districtName}, Andhra Pradesh, India`;
      return this.getCoordinates(address);
    });

    return forkJoin(addressRequests).pipe(
      map(coordinates => ({
        type: 'FeatureCollection',
        features: projects.map((project, index) => ({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [coordinates[index].lng, coordinates[index].lat]
          },
          properties: {
            ...project
          }
        }))
      }))
    );
  }
}
