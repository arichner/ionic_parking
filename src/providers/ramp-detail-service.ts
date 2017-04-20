import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the RampDetailService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class RampDetailService {
  data: any;

  constructor(public http: Http) {
    console.log('Hello RampDetailService Provider');
  }

  getRampData(id){
      return this.http.get('/ramps/'+id).map(res => res.json());
  }

  getRampsList(){
    return this.http.get('/ramps').map(res => res.json());
  }
  getRampAvailability(id){
    return this.http.get('/ramps/'+id+'/availability').map(res => res.json());
  }
}
