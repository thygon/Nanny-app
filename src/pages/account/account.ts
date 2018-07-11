import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AppProvider } from '../../providers/app/app';

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

  private acc: any = {};
  private response: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, private app: AppProvider) {

    this.getMyAcc();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }

  getMyAcc(){
    this.app.get('mama/account/').then(res =>{
      this.response = res;
      this.acc = this.response.data;
      console.log(this.acc);
    });
  }

}
