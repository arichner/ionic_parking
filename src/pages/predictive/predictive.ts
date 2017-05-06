import { Component, ViewChild, ElementRef} from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { GoogleDirectionsService } from '../../providers/google-directions-service';
import { RampDetailService } from '../../providers/ramp-detail-service';
import { Geolocation } from '@ionic-native/geolocation';
import * as moment from 'moment';

declare var google;

/*
  Generated class for the Predictive page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-predictive',
  templateUrl: 'predictive.html',
  providers:[GoogleDirectionsService, Geolocation, RampDetailService]
})
export class PredictivePage {
  travelDuration:any;
  startLoc = {lat: 90, lng: 90};
  endLoc = {lat: 90, lng: 90};
  depart_time = moment().format();
  selectedRamp: any;
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  arriveTime = moment();


  constructor(private geolocation:Geolocation, public navCtrl:NavController, public navParams:NavParams, private googleDirectionsService:GoogleDirectionsService, private rampDetailService: RampDetailService)
  {
    console.log(this.depart_time);
    this.selectedRamp = navParams.get('ramp');
    this.endLoc.lat = parseFloat(this.selectedRamp.lattitude);
    this.endLoc.lng = parseFloat(this.selectedRamp.longitude);
    this.getLocation();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PredictivePage');
  }


  getTravelDuration(startLoc, endLoc, depart_time) {
    this.googleDirectionsService.getTravelDuration(startLoc, endLoc, depart_time).subscribe(
      data => {
        this.travelDuration = data.routes[0].legs[0].duration.value;
            // JSON.stringify(data);
        console.log(data);
        this.setArriveTime();
      }
    );
  }

  setArriveTime()
  {
      this.arriveTime = moment(this.depart_time).add(this.travelDuration, 's');
      this.getAvailability(this.arriveTime.format());
  }

  getAvailability(arrive_time)
  {
      this.rampDetailService.getRampAvailability(this.selectedRamp.id, arrive_time).subscribe(
          availability => {
              this.selectedRamp.availability = this.selectedRamp.capacity - availability;
              this.selectedRamp.percent = 100 - (availability / this.selectedRamp.capacity * 100);
          }
      );
  }


  loadMap(){

      console.log(this.endLoc);

      this.map = new google.maps.Map(document.getElementById('map'), {
        center: this.startLoc,
        scrollwheel: false,
        zoom: 15
      });

      var directionsDisplay = new google.maps.DirectionsRenderer({
        map: this.map
      });

      // Set destination, origin and travel mode.
      var request = {
        destination: this.endLoc,
        origin: this.startLoc,
        travelMode: 'DRIVING'
      };

      // Pass the directions request to the directions service.
      var directionsService = new google.maps.DirectionsService();
      directionsService.route(request, function(response, status) {
        if (status == 'OK') {
          // Display the route on the map.
          directionsDisplay.setDirections(response);
        }
      });


    // let latLng = new google.maps.LatLng(lat, long);
    //
    // let mapOptions = {
    //   center: latLng,
    //   zoom: 15,
    //   mapTypeId: google.maps.MapTypeId.ROADMAP
    // }
    //
    // this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    //
    // let marker = new google.maps.Marker({
    //   map: this.map,
    //   animation: google.maps.Animation.DROP,
    //   position: latLng
    // });

  }

  getLocation(){
    var self = this;
    this.geolocation
      .getCurrentPosition()
      .then(function (position) {
        var lat  = position.coords.latitude;
        var long = position.coords.longitude;

        lat = "44.981154";
        long = "-93.276147";

        self.startLoc.lat = lat;
        self.startLoc.lng = long;
        self.getTravelDuration(self.startLoc, self.endLoc, self.depart_time);
        self.loadMap();
      }, function(err) {
        // error
        console.log("error getting position data.");
        console.log(JSON.stringify(err));
      });
  }

}