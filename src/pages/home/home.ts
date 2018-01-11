import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Badge } from '@ionic-native/badge';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public toggles;
  constructor(public navCtrl: NavController,
    private nativeStorage: NativeStorage,
    private badge: Badge) {

    
  }

  getRegistrationID(){
    this.nativeStorage.getItem('registrationID').then(
      (data) => {
        this.toggles = data
        console.log(data)
        alert(this.toggles);
      },
      (error) => {
        console.error(error)
    });
  }

  clearStorage(){
    this.nativeStorage.clear();
  }

  increaseBadge() {
    this.badge.increase(1);
  }

  clearBadge() {
    this.badge.clear();
  }

}
