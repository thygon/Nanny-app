import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController, ToastController} from 'ionic-angular';
import{ AppProvider } from '../../providers/app/app';
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
     'role':'', 'name':'','email':'','password':'','confirmpassword':'','dob':'','terms':''
  };

  private loader;
  private roles = [];
  private response:any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private app: AppProvider, public loadingCtrl: LoadingController, 
    public toastCtrl: ToastController) {
      console.log('page is loading');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
    this.getRoles();
  }

  presentLoading(msg) {
    this.loader = this.loadingCtrl.create({
      content: msg + "...",
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
      
      this.app.signup(this.formData).subscribe(res =>{
        this.loader.dismiss();
             console.log(res);
             this.response = res;
             if (this.response.status == 'success' ){
               this.presentToast(this.response.message);
               this.app.store('apitoken',this.response.token);
               this.navCtrl.setRoot(HomePage);
             }else{
               this.presentToast(this.response.message);
             }
      }, (error) => {
        this.loader.dismiss();
        this.response = error.error;
        var errors = this.response.errors;
        var formerror: string = '';

        if (errors.hasOwnProperty('name')) {
          formerror += errors.name;
        } else if (errors.hasOwnProperty('email')) {
          formerror += errors.email;
        } else if (errors.hasOwnProperty('dob')) {
          formerror += errors.dob;
        } else if (errors.hasOwnProperty('password')) {
          formerror += errors.password;
        }

        this.presentToast(formerror);
        console.log(error);
      });
    }else{
      this.presentToast('passwords dont match');
    }

  }
  

  getRoles(){
    this.presentLoading('Please wait');
    this.app.get('role').subscribe(res =>{
      this.response = res;
      this.roles = this.response.data;
      this.loader.dismiss();
      console.log(this.roles);
    }, (error) => {
      console.log(error)
    });
  }

}
