import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { AuthProvider } from '../../providers/auth/auth';
import { MamaProvider } from '../../providers/mama/mama';

import { LoginPage } from '../login/login';

/**
 * Generated class for the MamaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mama',
  templateUrl: 'mama.html',
})
export class MamaPage {
  response: any = [];
  user = {};
  nanis: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams 
    ,private auth:AuthProvider, private mama: MamaProvider,
    public toastCtrl: ToastController, public store: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MamaPage');

    this.getUser();
    this.getNanis();
  }

  presentToast(data) {
    const toast = this.toastCtrl.create({
      message: data,
      duration: 3000
    });
    toast.present();
  }

  naniRequest(id){
    let data = {
      'id': id
    }
    this.mama.doPost(data,'request').then(res =>{
      this.response = res;
      this.presentToast(this.response.message);
    });
  }


  getUser() {

    this.auth.getSession().then(res => {
      this.response = res;
      this.user = this.response.user;
      console.log(this.user);
    });
  }

  getNanis(){
    this.mama.doGet('nanis').then(res =>{
      this.response = res;
      console.log(this.response.data);

      this.nanis = this.response.data;
    });
  }


  logout() {
    this.auth.signOut().then(res => {
      console.log(res);
      this.response = res;

      if (this.response.status == "success") {
        this.presentToast('LoggedOut successfully');
        //localStorage.clear();
        this.store.remove('apitoken');
        this.navCtrl.setRoot(LoginPage);
      }
    });
  }

}
