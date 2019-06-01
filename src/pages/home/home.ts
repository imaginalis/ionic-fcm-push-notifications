import {Component} from '@angular/core';
import {NavController, ToastController} from 'ionic-angular';
import {NotificationsService} from '../../services/notifications.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public notifications: any;
  public isSubscribed: boolean;
  private TOPIC_NAME = 'homeTopic';

  constructor(public navCtrl: NavController,
              private notificationsService: NotificationsService,
              private toastController: ToastController) {
    this.isSubscribed = false;
  }

  ionViewDidEnter() {
    this.notifications = this.notificationsService.onNotifications().subscribe(
      (msg) => {
        this.presentToast(msg.body);
      });
  }

  ionViewDidLeave() {
    this.notifications.unsubscribe();
  }

  public handleSubscription(subscribed) {
    if (subscribed) {
      this.notificationsService.topicSubscription(this.TOPIC_NAME);
    } else {
      this.notificationsService.topicUnsubscription(this.TOPIC_NAME);
    }
  }

  private async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'middle'
    });
    toast.present();
  }


}
