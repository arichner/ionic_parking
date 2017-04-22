import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RampListPage } from '../pages/ramp-list/ramp-list';
import { RampDetailPage } from '../pages/ramp-detail/ramp-detail';
import { PredictivePage } from '../pages/predictive/predictive';

// Import the AF2 Module
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';


// AF2 Settings
export const firebaseConfig = {
  apiKey: "AIzaSyDbfdcslqsK58OWpHEwUDanyKglzXeJt14",
  authDomain: "ionic-parking.firebaseapp.com",
  databaseURL: "https://ionic-parking.firebaseio.com",
  storageBucket: "ionic-parking.appspot.com",
  messagingSenderId: "782451742975"
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Redirect,
  scope: ['email','id','name','picture'],
  offline: true
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RampListPage,
    RampDetailPage,
    PredictivePage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RampListPage,
    RampDetailPage,
    PredictivePage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}