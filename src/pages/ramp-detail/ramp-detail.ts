import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RampDetailService } from '../../providers/ramp-detail-service';
import {
    GoogleMaps,
    GoogleMap,
    GoogleMapsEvent,
    LatLng,
    CameraPosition,
    MarkerOptions,
    Marker
} from '@ionic-native/google-maps';

/*
  Generated class for the RampDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-ramp-detail',
  templateUrl: 'ramp-detail.html',
  providers:[RampDetailService, GoogleMaps]
})
export class RampDetailPage {
  selectedRamp: any;
  map: GoogleMap;
  location: LatLng;
  position: CameraPosition;
  markerOptions: MarkerOptions;

  constructor(private googleMaps: GoogleMaps, public navCtrl: NavController, public navParams: NavParams, private rampDetailService: RampDetailService) {
    this.selectedRamp = navParams.get('ramp');
  }

  ionViewDidLoad() {
    this.loadMap();
  }


  loadMap() {

    // create a new map by passing HTMLElement
    let element: HTMLElement = document.getElementById('map');

    this.map = this.googleMaps.create(element);

    // listen to MAP_READY event
    // You must wait for this event to fire before adding something to the map or modifying it in anyway
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => console.log('Map is ready!'));
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => this.reloadMap());

    // create LatLng object
    this.location = new LatLng(this.selectedRamp.lattitude,this.selectedRamp.longitude);

    // create CameraPosition
    this.position = {
      target: this.location,
      zoom: 15,
      tilt: 80
    };

    // create new marker
    this.markerOptions = {
      position: this.location,
      title: this.selectedRamp.name
    };

  }

  reloadMap()
  {
    // move the map's camera to position
    this.map.moveCamera(this.position);

    this.map.addMarker(this.markerOptions)
      .then((marker: Marker) => {
        marker.showInfoWindow();
      });
  }
}
