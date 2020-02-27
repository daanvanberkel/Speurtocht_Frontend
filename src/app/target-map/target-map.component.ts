/// <reference types="@types/googlemaps" />
import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TargetService} from '../services/target.service';
import {Target} from '../models/target';
import LatLngLiteral = google.maps.LatLngLiteral;
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';

@Component({
  selector: 'app-target-map',
  templateUrl: './target-map.component.html',
  styleUrls: ['./target-map.component.scss']
})
export class TargetMapComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('targetMap', {static: false}) targetMapEl: ElementRef;

  map: google.maps.Map;
  watcher: number;
  userMarker: google.maps.Marker;

  targets: Target[];
  markers: google.maps.Marker[];
  lastPosition: LatLngLiteral;

  constructor(
    private targetService: TargetService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.mapInitializer();
    this.followUser();
  }

  ngOnDestroy(): void {
    this.stopFollowingUser();
  }

  followUser() {
    if (navigator.geolocation) {
      this.watcher = navigator.geolocation.watchPosition(position => {
        if (!this.userMarker) {
          this.userMarker = new google.maps.Marker({
            map: this.map
          });
        }

        let latLng = {lat: position.coords.latitude, lng: position.coords.longitude};

        this.lastPosition = latLng;

        this.userMarker.setPosition(latLng);
        this.map.panTo(latLng);
        this.map.setZoom(15);
        this.loadTargets(latLng)
      }, err => {
        alert('Om deze app te kunnen gebruiken moet de app uw positie hebben');
      });
    }
  }

  stopFollowingUser() {
    if (this.userMarker) {
      this.userMarker.setMap(null);
      this.userMarker = undefined;
    }

    if (this.watcher) {
      navigator.geolocation.clearWatch(this.watcher);
    }
  }

  loadTargets(latLng: LatLngLiteral) {
    let bounds = this.map.getBounds();
    let center = this.map.getCenter();

    if (bounds && center) {
      this.targetService.getTargets({
        limit: 100,
        lat: latLng.lat,
        lng: latLng.lng,
        radius: google.maps.geometry.spherical.computeDistanceBetween(center, bounds.getNorthEast())
      }).subscribe(targets => {
        this.targets = targets.docs;
        this.placeMarkers();
      });
    }
  }

  clearMarkers() {
    if (this.markers) {
      for(let marker of this.markers) {
        marker.setMap(null);
      }
    }

    this.markers = [];
  }

  placeMarkers() {
    this.clearMarkers();

    for(let target of this.targets) {
      let marker = new google.maps.Marker({
        position: {lat: target.location.coordinates[1], lng: target.location.coordinates[0]},
        map: this.map,
        icon: {
          url: `${environment.api_base}/targets/${target._id}/photo`,
          scaledSize: new google.maps.Size(50, 50),
          anchor: new google.maps.Point(25, 25)
        }
      });

      marker.addListener('click', event => {
        this.router.navigate(['/targets', target._id]);
      });

      this.markers.push(marker);
    }
  }

  mapInitializer() {
    this.map = new google.maps.Map(this.targetMapEl.nativeElement, {
      center: {lat: 51.581612, lng: 5.194222},
      zoom: 8,
      backgroundColor: '#303030',
      fullscreenControl: false,
      mapTypeControl: false,
      streetViewControl: false,
      gestureHandling: 'greedy',
      styles: [
        {
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#242f3e"
            }
          ]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#746855"
            }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#242f3e"
            }
          ]
        },
        {
          "featureType": "administrative.locality",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#d59563"
            }
          ]
        },
        {
          "featureType": "poi",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#d59563"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#263c3f"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#6b9a76"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#38414e"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#212a37"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9ca5b3"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#746855"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#1f2835"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#f3d19c"
            }
          ]
        },
        {
          "featureType": "transit",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#2f3948"
            }
          ]
        },
        {
          "featureType": "transit.station",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#d59563"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#17263c"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#515c6d"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#17263c"
            }
          ]
        }
      ]
    });
  }
}
