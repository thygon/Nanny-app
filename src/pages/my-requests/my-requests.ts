import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { NaniProvider } from '../../providers/nani/nani';

/**
 * Generated class for the MyRequestsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-requests',
  templateUrl: 'my-requests.html',
})
export class MyRequestsPage {

  private response: any = [];
  private requests: any = {};

  constructor(public navCtrl: NavController,
     public navParams: NavParams, public nani: NaniProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyRequestsPage');
    
    this.fetchRequests();
  }
  
  fetchRequests(){

    this.nani.doGet('requests').then(res => {
      this.response = res;
      this.requests = this.response.data;
      console.log(this.response);
    });
  }


}
