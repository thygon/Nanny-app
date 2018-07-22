import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AuthProvider } from '../../providers/auth/auth';
import { AppProvider } from '../../providers/app/app';

import { LoginPage } from '../login/login';

/**
 * Generated class for the EmploymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-employment',
  templateUrl: 'employment.html',
})
export class EmploymentPage {

  response: any = [];
  emp: any = [];
  employer: any = [];
  employee: any = [];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private auth:AuthProvider,
              private app:AppProvider,
              private store:Storage,
              private toast:ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmploymentPage');
    this.getEmp();
  }

  presentToast(data) {
    const toast = this.toast.create({
      message: data,
      duration: 3000
    });
    toast.present();
  }

  getEmp(){
    this.app.get('employment').then(
      res =>{
        this.response = res;
        this.emp = this.response.data;
        this.employer = this.emp.mama;
        this.employee = this.emp.nani;
        console.log(this.emp);
      }
    );
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
