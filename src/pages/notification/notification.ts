import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ToastController} from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { AppProvider } from '../../providers/app/app';

import { LoginPage } from '../login/login';
import { RequestsPage } from '../requests/requests';
import { MessagePage } from '../message/message';
import { EmploymentPage } from '../employment/employment';

/**
 * Generated class for the NotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {


  public response: any = [];
  public notifications: any = []; 


  constructor(public navCtrl: NavController, 
          public navParams: NavParams, 
          private app: AppProvider,
          public store: Storage,
          public toastCtrl:ToastController
        ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationPage');
    this.getNotifications();
  }

  presentToast(data) {
    const toast = this.toastCtrl.create({
      message: data,
      duration: 3000
    });
    toast.present();
  }


  getNotifications(){
    this.app.get('all/notifications').subscribe(res =>{
      this.response = res;
      this.notifications = this.response.data;
      console.log(this.response.data);
    });
  }

  openRequest(noti_id,req_id,who){
    this.app.postid('notification/read', {},noti_id).subscribe(res =>{
        console.log(res);
    });
    var page;
    if (who == 'Requests'){
      page = RequestsPage;
    }

    if (who == 'Messages') {
      page = MessagePage;
    }

    if (who == 'Employment') {
      page = EmploymentPage;
    }
    
    this.navCtrl.push(page, {'id': req_id});

  }


  logout() {
    this.app.logout().subscribe(res => {
      console.log(res);
      this.response = res;

      if (this.response.status == "success") {
        this.presentToast('LoggedOut successfully');

        this.store.remove('apitoken');
        this.navCtrl.setRoot(LoginPage);
      }
    });
  }

}
