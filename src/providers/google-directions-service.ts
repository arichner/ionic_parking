import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the GoogleDirectionsService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class GoogleDirectionsService {

  constructor(public http: Http) {
    console.log('Hello GoogleDirectionsService Provider');
  }

  getTravelDuration(starLoc, endLoc, departTime){
    return this.http.get('https://maps.googleapis.com/maps/api/directions/json?origin='+starLoc.lat+','+starLoc.long+'&destination='+endLoc.lat+','+endLoc.long+'&key=AIzaSyCKhEcCmRcyYs_yL8wYxdgQ3yikSrA7yXs').map(res => res.json());
  }
}
