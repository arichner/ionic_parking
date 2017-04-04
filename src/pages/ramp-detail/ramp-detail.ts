import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { RampDetailService } from '../../providers/ramp-detail-service';


/*
  Generated class for the RampDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-ramp-detail',
  templateUrl: 'ramp-detail.html',
  providers:[RampDetailService]
})
export class RampDetailPage {
  selectedRamp: any;
  rampData: any;
  hoursKeys: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private rampDetailService: RampDetailService) {
    this.selectedRamp = navParams.get('ramp');
    this.loadRampDetails();

  }

  loadRampDetails()
  {
    this.rampDetailService.getRampData().subscribe(
      data => {
        this.rampData = data;
        this.transformHours();
        console.log(this.rampData);
      },
      err => {
        console.log("error in retrieving ramp data!");
      }
    );
  }

  transformHours()
  {
    this.hoursKeys = Object.keys(this.rampData.hours);
  }



}
