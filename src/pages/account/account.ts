import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ToastController} from 'ionic-angular'; 
import { Storage } from '@ionic/storage';
import { AuthProvider } from '../../providers/auth/auth';
import { AppProvider } from '../../providers/app/app';

import { LoginPage } from '../login/login';

/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

  private acc: any = null;
  private history: any =[]; 
  private response: any = [];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private auth: AuthProvider,
    private app: AppProvider,
    private store: Storage,
    private toast: ToastController) {

    this.getMyAcc();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }

  presentToast(data) {
    const toast = this.toast.create({
      message: data,
      duration: 3000
    });
    toast.present();
  }


  getMyAcc(){
    this.app.get('mama/account/').then(res =>{
      this.response = res;
      this.acc = this.response.data;
      if (this.acc != null){
        this.history = this.acc.history;
      }
      console.log(this.history);
    });
  }

  makeDeposit(){
    this.presentToast('Depositing service comming soon!');
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
