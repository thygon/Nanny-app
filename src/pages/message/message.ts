import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ToastController} from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { AuthProvider } from '../../providers/auth/auth';
import { AppProvider } from '../../providers/app/app';

import { LoginPage } from '../login/login';
import { TextPage } from '../text/text';

/**
 * Generated class for the MessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage {

  private response: any = [];
  private messages: any = [];
  private user: any =[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public toastCtrl:ToastController,public auth:AuthProvider, public app:AppProvider,
  public store:Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagePage');
    this.getMessages();
  }
  presentToast(data) {
    const toast = this.toastCtrl.create({
      message: data,
      duration: 3000
    });
    toast.present();
  }

  getMessages(){
    this.app.get('msg/all').then(
      res =>{
        this.response = res;
        this.messages = this.response.data;
        this.user = this.response.user;
        console.log(this.user);
        console.log(this.messages);
      }
    );
  }

  openTexts(id,sender){
    this.navCtrl.push(TextPage,{'message_id':id,'sender':sender});
    this.app.patch(id,{}, 'msg/read/').then(res =>{
      console.log(res);
    });
  }

  

  logout() {
    this.auth.signOut().then(res => {
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
