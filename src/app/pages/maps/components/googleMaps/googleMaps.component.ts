import {
  AfterContentChecked, AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output,
  ViewChild
} from '@angular/core';
import * as GoogleMapsLoader from 'google-maps';
import {AgmMap, AgmMarker, MapsAPILoader, LatLng} from '@agm/core';

declare var google: any;

@Component({
  selector: 'google-maps',
  styleUrls: ['./googleMaps.scss'],
  templateUrl: './googleMaps.html',
})
export class GoogleMaps implements AfterContentChecked, AfterViewInit {
  @Output() coordinates = new EventEmitter();
  @Output() mapEvent= new EventEmitter();
  @ViewChild('map') map: AgmMap;
  marker: AgmMarker = new AgmMarker(<any>'');
  lat: number = 47.003670;
  lng: number = 28.907089;
  latLng: LatLng;
  geocoder;

  constructor(private loader: MapsAPILoader) {
    this.loader.load().then(() => {
      console.log('google script loaded');
      this.geocoder = new google.maps.Geocoder();
      console.log(this.geocoder);
    })
  }

  ngAfterViewInit() {

  }

  ngAfterContentChecked() {
    this.map.zoom = 11;
    this.map.triggerResize();
  }

  mapClicked($event: any, address: any) {
    this.marker.latitude = $event.coords.lat;
    this.marker.longitude = $event.coords.lng;
    this.geocoder.geocode({"location": {lat: this.marker.latitude, lng: this.marker.longitude}}, (results, status) => {
       this.mapEvent.emit(results);
       this.coordinates.emit({lat: this.marker.latitude, lng: this.marker.longitude})
    })
  }

  markerDragEnd(m, $event){
    this.geocoder.geocode({"location": {lat: $event.coords.lat, lng: $event.coords.lng}}, (results, status) => {
      this.mapEvent.emit(results);
      this.coordinates.emit({lat: $event.coords.lat, lng: $event.coords.lng});
    })
  }
}
