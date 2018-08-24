import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { FileChooser } from '@ionic-native/file-chooser';
import { AppProvider } from '../../providers/app/app';

import { LoginPage } from '../login/login';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  imgPreview = 'assets/imgs/logo.png';
  response: any =[];
  profile: any = {
    'id':'','dob':'','age':'','shortmsg':'','level':'','dpic':''
    , 'goodconduct': '', 'postal': '', 'city': '', 'code': '',
  };
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private app: AppProvider,
     private fc: FileChooser,
     public toastCtrl: ToastController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');

    this.getProfile();
  }

  presentToast(data) {
    const toast = this.toastCtrl.create({
      message: data,
      duration: 3000
    });
    toast.present();
  }

  getPhoto() {
    this.profile.dpic = this.imgPreview;

    this.fc.open().then((imageurl) =>{
      console.log(imageurl);
      
    }).catch((err) =>{
      console.log(err);
    });
    
  }

  getProfile(){
    this.app.get('profile').subscribe(res =>{
      this.response = res;
      this.profile = this.response.data;
      console.log(this.profile);
      this.profile.postal = this.profile.address.postal;
      console.log(this.profile.postal);
      this.profile.city = this.profile.address.city;
      this.profile.code = this.profile.address.code;
    }, (e) =>{
      console.log(e);
    });
  }

  updateProfile(){
  this.app.post('update/profile',this.profile)
    .subscribe(res =>{
      this.response = res; 
      this.presentToast(this.response.message);
     console.log(res);
    }, (e) =>{
      this.presentToast(e);
      console.log(e);
    });
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
    });
  }

}
