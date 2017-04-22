import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { GoogleDirectionsService } from '../../providers/google-directions-service';
import { Geolocation } from '@ionic-native/geolocation';



/*
  Generated class for the Predictive page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-predictive',
  templateUrl: 'predictive.html',
  providers:[GoogleDirectionsService, Geolocation]
})
export class PredictivePage {
  travelDuration:any;
  startLoc = {lat: 90, long: 90};
  endLoc = {lat: 90, long: 90};
  depart_time = new Date();
  selectedRamp: any;

  constructor(private geolocation:Geolocation, public navCtrl:NavController, public navParams:NavParams, private googleDirectionsService:GoogleDirectionsService)
  {
    this.selectedRamp = navParams.get('ramp');
    this.endLoc.lat = this.selectedRamp.lattitude;
    this.endLoc.long = this.selectedRamp.longitude;
    this.getLocation();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PredictivePage');
  }


  getTravelDuration(startLoc, endLoc, depart_time) {
    this.googleDirectionsService.getTravelDuration(startLoc, endLoc, depart_time).subscribe(
      data => {
        this.travelDuration = data;
        console.log(data);
      }
    );

  }

  getLocation(){
    var self = this;
    this.geolocation
      .getCurrentPosition()
      .then(function (position) {
        var lat  = position.coords.latitude;
        var long = position.coords.longitude;
        self.startLoc.lat = lat;
        self.startLoc.long = long;
        self.getTravelDuration(self.startLoc, self.endLoc, self.depart_time);
      }, function(err) {
        // error
        console.log("error getting position data.");
        console.log(JSON.stringify(err));
      });
  }

}