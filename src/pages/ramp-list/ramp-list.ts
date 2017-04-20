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




  	//return [
  	//	{"name":"Washington Ave Ramp", "address":"501 Washington Ave SE, Minneapolis, MN 55455"},
  	//	{"name":"Church Street Garage", "address":"80 Church St SE, Minneapolis, MN 55455"},
  	//	{"name":"East River Road Garage", "address":"385 East River Parkway, Minneapolis, MN 55455"}
  	//];
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
  // 	var watchOptions = {
  //   maximumAge : 1000,
  //   timeout : 3000,
  //   enableHighAccuracy: false // may cause errors if true
  // };
  	/*let watch = this.geolocation.watchPosition(watchOptions);
watch.subscribe((data: Geoposition) => {
	console.log(JSON.stringify(data));*/
	/*this.geolocation.watchPosition(watchOptions)
                              .filter((p) => p.coords !== undefined) //Filter Out Errors
                              .subscribe(position => {
  console.log(position.coords.longitude + ' ' + position.coords.latitude);*/
	//console.log(data.coords);
	//console.log(data.coords.longitude);
 // data can be a set of coordinates, or an error (if an error occurred).
 // data.coords.latitude
 // data.coords.longitude 
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
          this.rampDetailService.getRampAvailability(ramp.id).subscribe(
            availability => {
              ramp.availability = ramp.capacity - availability;
              ramp.percent = 100 - (availability / ramp.capacity * 100);
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
