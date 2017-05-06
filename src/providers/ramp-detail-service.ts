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
      return this.http.get('http://35.184.103.50:8080/ramps/'+id).map(res => res.json());
    // return this.http.get('/ramps/'+id).map(res => res.json());
  }

  getRampsList(){
    return this.http.get('http://35.184.103.50:8080/ramps').map(res => res.json());
    // return this.http.get('/ramps').map(res => res.json());
  }
  getRampAvailability(id, arrive_time){
    console.log(arrive_time);
    if(arrive_time)
    {
      return this.http.get('http://35.184.103.50:8080/ramps/'+id+'/availability?time='+arrive_time).map(res => res.json());
      // return this.http.get('/ramps/'+id+'/availability').map(res => res.json());
    }
    else
    {
      return this.http.get('http://35.184.103.50:8080/ramps/'+id+'/availability').map(res => res.json());
      // return this.http.get('/ramps/'+id+'/availability').map(res => res.json());
    }

  }
}
