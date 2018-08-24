import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ToastController, AlertController} from 'ionic-angular';
import { AppProvider } from '../../providers/app/app';

import { LoginPage } from '../login/login';

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

  private acc: any = null;
  private history: any =[]; 
  private response: any = [];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private app: AppProvider,
    private toast: ToastController,
    private alert:AlertController) {

    this.getMyAcc();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }

  presentToast(data) {
    const toast = this.toast.create({
      message: data,
      duration: 3000
    });
    toast.present();
  }


  getMyAcc(){
    this.app.get('mama/account/').subscribe(res =>{
      this.response = res;
      this.acc = this.response.data;
      if (this.acc != null){
        this.history = this.acc.history;
      }
      console.log(this.history);
    }, error =>{
      console.log(error);
    });
  }

  makeDeposit(){
    const prompt = this.alert.create({
      title: 'Payment',
      message: 'Deposit via Mpesa',
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
            this.app.post('mama/pay',JSON.stringify(data)).subscribe(res => {
              this.response = res;
              this.presentToast(this.response.message);
              this.getMyAcc();
            }, error =>{
              console.log(error);
            });

          }
        }
      ]
    });
    prompt.present();
  }

  logout() {
    this.app.logout().subscribe(res => {
      console.log(res);
      this.response = res;

      if (this.response.status == "success") {
        this.presentToast('LoggedOut successfully');

        this.app.deleteFromStore('apitoken');
        this.navCtrl.setRoot(LoginPage);
      }
    }, error =>{
      console.log(error);
    });
  }

}
