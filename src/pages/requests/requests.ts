import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { MamaProvider } from '../../providers/mama/mama';

/**
 * Generated class for the RequestsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-requests',
  templateUrl: 'requests.html',
})
export class RequestsPage {

  private requests: any =[];
  private response: any =[];
  private nanis: any =[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private mama :MamaProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestsPage');

    this.myRequests();
  }

  myRequests(){
    this.nanis = [];
    this.mama.doGet('requests').then(res =>{
      this.response = res;
      this.requests = this.response.data;
      console.log(this.requests);
    this.requests.forEach(val => {
      this.nanis.push(val.nani);
    });
    });
  console.log(this.nanis);
  }

}
