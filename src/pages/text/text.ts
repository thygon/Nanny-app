import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ToastController} from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { AppProvider } from '../../providers/app/app';
import { AuthProvider } from '../../providers/auth/auth';

import { LoginPage } from '../login/login';

/**
 * Generated class for the TextPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-text',
  templateUrl: 'text.html',
})
export class TextPage {
  
  private message_id:number;
  private texts: any =[];
  private response: any = [];
  public mytext: string = '';
  public sender:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public auth: AuthProvider, public app: AppProvider,
    public store: Storage, public toast:ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TextPage');
    this.message_id = this.navParams.get('message_id');
    this.sender = this.navParams.get('sender');
    this.getTexts();
  }
  presentToast(data) {
    const toast = this.toast.create({
      message: data,
      duration: 3000
    });
    toast.present();
  }

  getTexts(){
    let id = this.message_id;
    this.app.getWithId(id, 'msg/texts').then(res =>{
      this.response = res;
      this.texts = this.response.data;
    });
  }

  sendText(){
    let id = this.message_id;
    if (this.mytext != ''){
    this.app.patch(id, { 'message': this.mytext }, 'msg/send/text/').then(res =>{
      this.response = res;
      this.mytext = '';
      this.presentToast(this.response.msg);
      this.getTexts();
    }); 
  }else{
      this.presentToast('Enter message!');
    }
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
