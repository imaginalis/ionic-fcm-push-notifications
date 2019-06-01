import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {Platform} from 'ionic-angular';
import {Firebase} from '@ionic-native/firebase';

@Injectable()
export class NotificationsService {

  constructor(private firebase: Firebase,
              private angularFirestore: AngularFirestore,
              private platform: Platform) {
  }

  async getToken() {
    let token;
    if (this.platform.is('android')) {
      token = await this.firebase.getToken();
    }
    this.saveToken(token);
  }

  private saveToken(token) {
    if (!token) return;
    const devicesDatabaseReference = this.angularFirestore.collection('device-tokens');
    const data = {
      token,
      userId: 'user-' + new Date().toISOString(),
    };
    return devicesDatabaseReference.doc(token).set(data);
  }

  topicSubscription(topic) {
    this.firebase.subscribe(topic).then((res: any) => {
      console.log('Subscribed to topic: ' + topic, res);
    });
  }

  topicUnsubscription(topic) {
    this.firebase.unsubscribe(topic).then((res: any) => {
      console.log('Unsubscribed from topic: ' + topic, res)
    });
  }

  onNotifications() {
    return this.firebase.onNotificationOpen();
  }
}
