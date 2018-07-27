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
    this.checkIfMama();
  }

  presentToast(data) {
    const toast = this.toast.create({
      message: data,
      duration: 3000
    });
    toast.present();
  }

  getEmp(role){
    this.app.get('employment').then(
      res =>{
        this.response = res;
        this.emp = this.response.data;
        if (role != null && role == 'mama' && this.emp != null){
          this.employer = null;
          this.employee = this.emp.nani;
        } else if (role != null && role == 'nany' && this.emp != null){
          this.employer = this.emp.mama;
          this.employee = null;
        }else{
          this.employer = null;
          this.employee = null;
        }
        
        console.log(this.emp);
      }
    );
  }

  checkIfMama() {
    this.auth.getSession().then(res => {
      this.response = res;
      let role = this.response.user.role;

      role.forEach(val => {
        role = val.role;
      });
      this.getEmp(role);
      
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
