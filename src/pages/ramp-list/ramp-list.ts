import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { RampDetailPage } from '../ramp-detail/ramp-detail';

/*
  Generated class for the RampList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-ramp-list',
  templateUrl: 'ramp-list.html'
})
export class RampListPage {
  ramps: Array<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.ramps = this.getRamps();
  }
  getRamps(){
  	return [
  		{"name":"Washington Ave Ramp", "address":"501 Washington Ave SE, Minneapolis, MN 55455"},
  		{"name":"Church Street Garage", "address":"80 Church St SE, Minneapolis, MN 55455"},
  		{"name":"East River Road Garage", "address":"385 East River Parkway, Minneapolis, MN 55455"}
  	];
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RampListPage');
  }

    view_details(ramp) {
        this.navCtrl.push(RampDetailPage, {
            ramp: ramp
        });
    }

}
