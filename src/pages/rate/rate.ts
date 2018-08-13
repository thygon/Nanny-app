import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { AppProvider } from '../../providers/app/app';

@IonicPage()
@Component({
  selector: 'page-rate',
  templateUrl: 'rate.html',
})
export class RatePage {
  
  private response: any =[];
  private isMama: boolean = false;
  private nani: any = {
   'clean':'','cooking':'','hardworking':'','respect':'','more':''
  };

  private mama: any ={
   'respect':'','timely':'','more':''
  };

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private app: AppProvider,
     private toaster:ToastController) {

    let role = this.navParams.get('role');
    if (role == 'mama'){
      this.isMama = true;
    }
    console.log(this.isMama);
  }

  presentToast(data){
    const t = this.toaster.create({
      message:data,
      duration:3000
    });
    t.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RatePage');
  }

  rateNani(){
    console.log(this.nani);
    this.app.post( 'mama/rate',this.nani).subscribe(res =>{
      this.response = res;
      if (this.response.status == 'success'){
        this.presentToast(this.response.message);
      }

    }, (error) =>{
      console.log(error)
    });
  }

  rateMama(){
    console.log(this.mama);
    this.app.post('nani/rate',this.mama).subscribe(res =>{
      this.response = res;
      if (this.response.status == 'success') {
        this.presentToast(this.response.message);
      }
    }, (error) => {
      console.log(error)
    });

  }

}
