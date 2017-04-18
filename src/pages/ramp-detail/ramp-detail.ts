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

  constructor(private googleMaps: GoogleMaps, public navCtrl: NavController, public navParams: NavParams, private rampDetailService: RampDetailService) {
    this.selectedRamp = navParams.get('ramp');
  }

  ionViewDidLoad() {
    this.loadMap();
  }


  loadMap() {
    // make sure to create following structure in your view.html file
    // and add a height (for example 100%) to it, else the map won't be visible
    // <ion-content>
    //  <div #map id="map" style="height:100%;"></div>
    // </ion-content>

    // create a new map by passing HTMLElement
    let element: HTMLElement = document.getElementById('map');

    let map: GoogleMap = this.googleMaps.create(element);

    // listen to MAP_READY event
    // You must wait for this event to fire before adding something to the map or modifying it in anyway
    map.one(GoogleMapsEvent.MAP_READY).then(() => console.log('Map is ready!'));

    // create LatLng object
    let ionic: LatLng = new LatLng(this.selectedRamp.lattitude,this.selectedRamp.longitude);

    // create CameraPosition
    let position: CameraPosition = {
      target: ionic,
      zoom: 15,
      tilt: 80
    };

    // move the map's camera to position
    map.moveCamera(position);

    // create new marker
    let markerOptions: MarkerOptions = {
      position: ionic,
      title: this.selectedRamp.name
    };

    map.addMarker(markerOptions)
        .then((marker: Marker) => {
          marker.showInfoWindow();
        });
  }
}
