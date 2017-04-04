import { Component } from '@angular/core';

import { NavController, AlertController, ToastController, ActionSheetController, Platform } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import {GooglePlus, BLE} from 'ionic-native';
import {RampListPage} from '../ramp-list/ramp-list';
//import firebase from 'firebase';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  songs: FirebaseListObservable<any>;
  user: any = {};
  winobj: any = null; // maybe better understand injectables... see chrome tabs
  rampListPage = RampListPage;
  constructor(private toastCtrl: ToastController, public navCtrl: NavController, public alertCtrl: AlertController,
              public af: AngularFire, public actionSheetCtrl: ActionSheetController, private platform: Platform)
  {
    this.winobj=window;

     //suscription equivalent to onAuthStateChanged
    //this.af.auth.subscribe(user => {
    //  if(user) {
    //    alert('fire user logged in');
    //    this.user = user;
    //    this.songs = af.database.list('/songs');
    //  }else {
    //    alert('fire user logged out');
    //    this.user = {};
    //  }
    //});

// BLE test stuff

    BLE.scan([], 5).subscribe(device => {
      this.presentToast(JSON.stringify(device));
      console.log(JSON.stringify(device));
    }, error => {
      console.log(error);
    });


  }



  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      position: 'middle',
      showCloseButton: true,
      closeButtonText: "ok"
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  is_local()
  {
    if( /^file:\/{3}[^\/]/i.test(this.winobj.location.href) ){
      return true;
    }
    return false;
  }

  login()
  {
    if(this.is_local()){
      GooglePlus.login({
        'webClientId': '782451742975-78h0btvj1lvone99mrfv20je5nuir6p7.apps.googleusercontent.com',
        'offline': true
      }).then((obj) => {
        if (!firebase.auth().currentUser) {
          firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(obj.idToken))
              .then((success) => {
                this.displayAlert(JSON.stringify(success),"signInWithCredential successful");
              })
              .catch((gplusErr) => {
                this.displayAlert(JSON.stringify(gplusErr),"GooglePlus failed")
              });
        }
      }).catch( (msg) => {
        this.displayAlert(msg,"Gplus signin failed2")
      });
    }else{
      console.log("no device");
      this.af.auth.login();
    }
  }




  displayAlert(value,title)
  {
    let coolAlert = this.alertCtrl.create({
      title: title,
      message: JSON.stringify(value),
      buttons: [
        {
          text: "Ok"
        }
      ]
    });
    coolAlert.present();
  }

  logout()
  {
    if(!this.is_local()){
      this.af.auth.logout();
    }else{
      GooglePlus.logout().then(
          (msg) => {
            alert('logout ok');
            if(firebase.auth().currentUser){
              firebase.auth().signOut();
            }
          }).catch(
          (msg) => {
            alert('logout error: '+msg);
          })
      ;
    }
  }
}

