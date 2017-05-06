import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { RampDetailPage } from '../ramp-detail/ramp-detail';
import { RampDetailService } from '../../providers/ramp-detail-service';
import { Geolocation } from '@ionic-native/geolocation';
/*
  Generated class for the RampList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-ramp-list',
  templateUrl: 'ramp-list.html',
  providers:[RampDetailService, Geolocation]
})
export class RampListPage {
  ramps: Array<any>;
  rampDetails: any;
  constructor(private geolocation: Geolocation, public navCtrl: NavController, public navParams: NavParams, private rampDetailService: RampDetailService) {
  	this.getRamps();

  }

  getRamps(){
    this.rampDetailService.getRampsList().subscribe(
      data => {
        this.ramps = data;
        this.populateRampData(this.ramps);
      }
    ); 

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RampListPage');
      this.getLocation();
  }

  view_details(ramp) {
      this.navCtrl.push(RampDetailPage, {
          ramp: ramp
      });
  }
  getLocation(){
  this.geolocation
    .getCurrentPosition()
    .then(function (position) {
      var lat  = position.coords.latitude;
      var long = position.coords.longitude;
      console.log(lat + ' ' + long);
    }, function(err) {
      // error
  console.log("error getting position data.");
  console.log(JSON.stringify(err));
});
}


  populateRampData(ramps)
  {

    this.rampDetails = [];
    for (let ramp of ramps) {
      this.rampDetailService.getRampData(ramp).subscribe(
        ramp => {
            // ramp.availability = ramp.capacity - 445;
            // ramp.percent = 100 - (ramp.availability / ramp.capacity * 100);
            // this.rampDetails.push(ramp);
          this.rampDetailService.getRampAvailability(ramp.id, null).subscribe(
            availability => {
              ramp.spaces_used = ramp.capacity - availability;
              ramp.percent_full = (ramp.spaces_used / ramp.capacity) * 100;
              this.rampDetails.push(ramp);
            }
          )
        },
        err => {
          console.log("error in retrieving ramp data!");
        }
      );
    }
  }
}
