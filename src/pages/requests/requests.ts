import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { AppProvider } from '../../providers/app/app';
import { AuthProvider } from '../../providers/auth/auth';

import{ LoginPage } from '../login/login';
import { DetailPage } from '../detail/detail';
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
 
  private isMama: boolean = false;
  private myRequests: any = [];
  private response: any = {};
 

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private app : AppProvider,
              private auth: AuthProvider,
              private toastCtrl: ToastController,
              private alert : AlertController,
              private store : Storage) {

    this.checkIfMama();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestsPage');

  }

  presentToast(data) {
    const toast = this.toastCtrl.create({
      message: data,
      duration: 3000
    });
    toast.present();
  }

  //if mama
  checkIfMama() {
    this.auth.getSession().then(res => {
      this.response = res;
      let role = this.response.user.role;

      role.forEach(val => {
        role = val.role;
      });
      if (role == 'nany') {
        this.isMama = false;
      } else if (role == 'mama') {
        this.isMama = true;
      }
      console.log(this.isMama);

      if (this.isMama == true) {

        this.getRequests('mama/requests');

      } else if (this.isMama == false) {

        this.getRequests('nani/requests');
      }

    });
  }

  getRequests(url){
    this.app.get(url).then(res =>{
      this.response = res;
      this.myRequests = this.response.data;
      console.log(this.myRequests);
    });
  }

  abortRequest(id){
    this.app.patch(id, '', 'mama/abort/').then(res => {
      this.response = res;
      if (this.isMama == true) {

        this.getRequests('mama/requests');

      } else if (this.isMama == false) {

        this.getRequests('nani/requests');
      }
      this.presentToast(this.response.message);
    });
  }

  //nanis
  confirmRequest(id){
    this.app.patch(id,'','nani/confirm/').then(res =>{
      this.response = res;

      if (this.isMama == true) {

        this.getRequests('mama/requests');

      } else if (this.isMama == false) {

        this.getRequests('nani/requests');
      }

      this.presentToast(this.response.message);
    });
  }

  rejectRequest(id){
    this.app.patch(id, '', 'nani/confirm/').then(res => {
      this.response = res;
      
      if (this.isMama == true) {

        this.getRequests('mama/requests');

      } else if (this.isMama == false) {

        this.getRequests('nani/requests');
      }

      this.presentToast(this.response.message);
    });
  }

  detailRequest(id){

    if(this.isMama){
      //is mama check acc bal.
      this.app.patch(id, '', 'mama/details/').then(res => {
        this.response = res;
        
        if (this.response.status == 'success'){
            this.navCtrl.push(DetailPage,
              {'nani_id':this.response.data.nani_id,
               'payed': this.response.payed});
        }else{
          this.paymentPrompt(this.response.data.bal);
          this.presentToast(this.response.message);
        }
        
      });

    }else{

    }

  }

  //payment prompt
  paymentPrompt(total) {
    const prompt = this.alert.create({
      title: 'Payment',
      message: "A balance of:" +total+' via Mpesa',
      inputs: [
        {
          name: 't_id',
          placeholder: 'transaction id'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log('Saved clicked'+ JSON.stringify(data));
            this.app.post(JSON.stringify(data), 'mama/pay').then(res =>{
              this.response = res;
              this.presentToast(this.response.message);

            });

          }
        }
      ]
    });
    prompt.present();
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
