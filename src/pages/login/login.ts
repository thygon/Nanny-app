import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,
  ToastController,Events} from 'ionic-angular';

import { AppProvider } from '../../providers/app/app';

import { HomePage } from '../../pages/home/home';
import { RegisterPage } from '../../pages/register/register';
import { ForgotpassPage } from '../../pages/forgotpass/forgotpass';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {


  private email: string;
  private password: string;
  private remember: boolean = true;
  private loader:any;
  res:any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private app: AppProvider,public loadingCtrl: LoadingController, public toastCtrl: ToastController,
    public event:Events) {
    
    
  }
  
  presentLoading(msg) {
    this.loader = this.loadingCtrl.create({
      content: msg+"...",
      duration: 3000
    });
    this.loader.present();
  }

  presentToast(data) {
    const toast = this.toastCtrl.create({
      message: data,
      duration: 3000
    });
    toast.present();
  }
  

  ionViewDidLoad() {
    
  }

  login():void{
    this.presentLoading("Please wait");
    this.app.login(
      {'email':this.email,
      'password':this.password,'remember': this.remember})
      .subscribe(data =>{
        this.res = data;
        console.log(this.res);
        this.loader.dismiss();
        if (this.res.response != "error" ){
           //store token
            this.app.store('apitoken',this.res.result.token);
            this.presentToast(this.res.result.message);

            this.event.publish('user-logged',this.res.result.user);
            this.navCtrl.setRoot(HomePage);
           
        }else{
            this.presentToast(this.res.message);
        }
        

      }, error =>{
        console.log(error);
      });
  }

  register(){
    this.navCtrl.push(RegisterPage);
  }

  forgotPassword(){
    event.preventDefault();
    this.navCtrl.push(ForgotpassPage);
  }

}
