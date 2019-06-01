import {Component} from '@angular/core';
import {Platform, ToastController} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {TabsPage} from '../pages/tabs/tabs';
import {NotificationsService} from "../services/notifications.service";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;

  constructor(private statusBar: StatusBar,
              private splashScreen: SplashScreen,
              private platform: Platform,
              private notificationsService: NotificationsService,
              private toastController: ToastController) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      this.notificationSetup();
    });
  }

  private async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  private notificationSetup() {
    this.notificationsService.getToken();
    this.notificationsService.onNotifications().subscribe(
      (msg) => {
        this.presentToast(msg.body);
      });
  }

}
