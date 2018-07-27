import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController, ToastController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import{ AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../../pages/home/home';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  private formData: any = {
     'role':'', 'name':'','email':'','password':'','confirmpassword':'','dob':'',
  };

  private loader;
  private roles = [];
  private response:any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private authService: AuthProvider, public loadingCtrl: LoadingController, 
    public toastCtrl: ToastController,private store:Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
    this.getRoles();
  }

  presentLoading(msg) {
    this.loader = this.loadingCtrl.create({
      content: msg + "...",
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


  registerUser(){
    
    if (this.formData.confirmpassword == this.formData.password ){
      this.presentLoading('Please wait');
      
      this.authService.signUp(this.formData).then(res =>{
        this.loader.dismiss();
             console.log(res);
             this.response = res;
             if (this.response.status == 'success' ){
               this.presentToast(this.response.message);
               this.store.set('apitoken',this.response.token);
               this.navCtrl.setRoot(HomePage);
             }else{
               this.presentToast(this.response.message);
             }
      });
    }else{
      this.presentToast('passwords dont match');
    }

  }

  getRoles(){
    this.authService.getReq('role').then(res =>{
      this.response = res;
      this.roles = this.response.data;
      console.log(this.roles);
    });
  }

}
