import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import 'rxjs';

import { AuthProvider } from '../../providers/auth/auth';

import { LoginPage } from '../../pages/login/login';

/**
 * Generated class for the NaniPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-nani',
  templateUrl: 'nani.html',
})
export class NaniPage {

  user = [];
  response: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private auth: AuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NaniPage');
    this.getUser();
  }
  getUser(){

    this.auth.getSession().then(res =>{
      this.response = res;
      this.user = this.response.user;
         console.log(this.user);
    });
  }

  logout(){
    this.auth.signOut().then(res => {
          console.log(res);
          this.response = res;
          
          if (this.response.status == "success" ){
            localStorage.clear();
            this.navCtrl.push(LoginPage);
          }
      });
  }

}
