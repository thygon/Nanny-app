import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ToastController,LoadingController } from 'ionic-angular';

import { AppProvider } from '../../providers/app/app';
/**
 * Generated class for the ForgotpassPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgotpass',
  templateUrl: 'forgotpass.html',
})
export class ForgotpassPage {
  private email:string;
  response: any = [];
  private loader:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
     public app:AppProvider,private toast:ToastController,private loading: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotpassPage');
  }
  presentLoader(){
    this.loader = this.loading.create({
      content:'Please wait...',
      duration:3000
    });
    this.loader.present();
  }

  presentToast(data, time = 3000){
    this.toast.create({
      message:data,
      duration:time
    }).present();
  }

  resetpass(){
    this.presentLoader();
    this.app.post({ 'email': this.email }, 'user/reset/password').subscribe(res =>{
      this.loader.dismiss();
      this.response = res;
      if (this.response.status =='success'){
          this.presentToast(this.response.message);
          this.navCtrl.getPrevious();
      }else{
        this.presentToast(this.response.message,6000);
      }
    }, (e) =>{
      console.log(e);
    });
  }

}
