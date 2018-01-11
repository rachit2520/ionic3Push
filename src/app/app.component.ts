import { Component } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, 
    splashScreen: SplashScreen,
    public push: Push, 
    public alertCtrl: AlertController,
    private nativeStorage: NativeStorage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.pushsetup();

      if ((<any>window).plugins)
        (<any>window).plugins.intentShim.getIntent((intent) => {
          if (intent) {
            alert("intent : " + JSON.stringify(intent));
          }
        }, (err) => alert("intent error : " + JSON.stringify(err)));

    });
  }
  pushsetup() {
    const options: PushOptions = {
     android: {
         senderID: '181460117121',
         forceShow: 'false'
     },
     ios: {
         alert: 'true',
         badge: true,
         sound: 'false'
     },
     windows: {}
  };
 
  const pushObject: PushObject = this.push.init(options);
 
  pushObject.on('notification').subscribe((notification: any) => {
    if (notification.additionalData.foreground) {
      let youralert = this.alertCtrl.create({
        title: notification.title,
        message: notification.message
      });
      youralert.present();
    }else if(notification.additionalData.coldstart) {
      alert(JSON.stringify(notification));
    }else {
      alert(JSON.stringify(notification));
    }
  });
 
  pushObject.on('registration').subscribe((registration: any) => {
    console.log(registration.registrationId);
    this.nativeStorage.setItem('registrationID', registration.registrationId).then(
    (_) => console.log('Stored item!'),
    error => console.error('Error storing item', error)
  );
  });

  pushObject.on('error').subscribe(error => console.log('Error with Push plugin' , error));


  }
}

