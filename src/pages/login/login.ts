import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,
  ToastController
 } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { AuthProvider } from '../../providers/auth/auth';

import { HomePage } from '../../pages/home/home';
import { RegisterPage } from '../../pages/register/register';

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
  private loader;
  res:any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private authService: AuthProvider, public store: Storage,
    public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
    
    
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
    console.log('ionViewDidLoad LoginPage');
  }

  login():void{
    this.presentLoading("Please wait");
    this.authService.signIn(
      {'email':this.email,
      'password':this.password,'remember': this.remember},'user')
      .then(data =>{
        this.loader.dismiss();
        console.log(data);
        this.res = data;
        console.log(this.res);

        if (this.res.response != "error" ){
           //store token
            this.store.set('apitoken',this.res.result.token);
            this.presentToast(this.res.result.message);
            
            this.navCtrl.setRoot(HomePage);
           
        }else{
            this.presentToast(this.res.message);
        }
        

      });
  }

  register(){
    this.navCtrl.push(RegisterPage);
  }

  forgotPassword(){
    event.preventDefault();
    console.log('hello');
  }

}
