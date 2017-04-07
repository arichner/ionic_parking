import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { RampDetailPage } from '../ramp-detail/ramp-detail';
import { RampDetailService } from '../../providers/ramp-detail-service';


/*
  Generated class for the RampList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-ramp-list',
  templateUrl: 'ramp-list.html',
  providers:[RampDetailService]
})
export class RampListPage {
  ramps: Array<any>;
  rampDetails: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private rampDetailService: RampDetailService) {
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
  }

  view_details(ramp) {
      this.navCtrl.push(RampDetailPage, {
          ramp: ramp
      });
  }

  populateRampData(ramps)
  {
    this.rampDetails = [];
    for (let ramp of ramps) {
      this.rampDetailService.getRampData(ramp).subscribe(
        ramp => this.rampDetails.push(ramp),
        err => {
          console.log("error in retrieving ramp data!");
        }
      );
    }
  }
}
