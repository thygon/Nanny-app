import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { AuthProvider } from '../../providers/auth/auth';
import { AppProvider } from '../../providers/app/app';

import { LoginPage } from '../login/login';

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  
  private response: any = [];
  public nani: any = {};
  private nani_id:number;
  public payed: boolean = false;
  public profile: any =[]; 
  public rate: any = []; 

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, public auth: AuthProvider,
    public app: AppProvider,
    public toastCtrl: ToastController,
    public store: Storage,) {

    this.nani_id = this.navParams.get('nani_id');
    this.payed = this.navParams.get('payed');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
    console.log(this.payed);

    this.getDetails(this.nani_id);
  }

  presentToast(data) {
    const toast = this.toastCtrl.create({
      message: data,
      duration: 3000
    });
    toast.present();
  }

  getDetails(id){
    this.app.getWithId(id, 'mama/nani').then(res =>{
      this.response = res;
      this.nani = this.response.data; 
      this.profile = this.response.data.profile;
      this.rate = this.response.data.rate;
      console.log(this.nani);
    });
  }

  employ(id){
    this.app.patch(id,{},'mama/employ/').then(res =>{
    console.log(res);
    this.response = res;
    this.presentToast(this.response.data.message);
    });
  }

  message(id){
    console.log('Message');
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
