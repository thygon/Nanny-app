import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ToastController,LoadingController} from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { AuthProvider } from '../../providers/auth/auth';
import { AppProvider } from '../../providers/app/app';

import { LoginPage } from '../login/login';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  private isMama: boolean = false;
  private response: any = {};
  private nanis: any = [];
  private employers: any = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public auth: AuthProvider,
              public app: AppProvider,
              public toastCtrl: ToastController,
              public store: Storage,
              public loader: LoadingController) 
  {

    
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.checkIfMama();
  }

  presentToast(data) {
    const toast = this.toastCtrl.create({
      message: data,
      duration: 3000
    });
    toast.present();
  }

  //get nanis for the mama
  getMamas() {
    this.app.get('nani/mamas').then(res => {
      this.response = res;
      this.employers = this.response.data;
      console.log(this.employers);
    });
  }

  //get nanis for the mama
  getNanis(){
    this.app.get('mama/nanis').then(res =>{
      this.response = res;
      this.nanis = this.response.data;
      console.log(this.nanis);
    });
  }

  //request nani
  naniRequest(id) {
    let data = {
      'id': id
    }
    this.app.post(data, 'mama/request').then(res => {
      this.response = res;
      this.presentToast(this.response.message);
      this.getNanis();
    });
  }

  //if mama
  checkIfMama(){
    this.auth.getSession().then(res =>{
      this.response = res;
      let role = this.response.user.role;

      role.forEach(val => {
        role = val.role;
      });
      if (role == 'nany'){
        this.isMama = false;
        this.getMamas();
      } else if (role == 'mama'){
        this.isMama = true;
        this.getNanis();
      }
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
