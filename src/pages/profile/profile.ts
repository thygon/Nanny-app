import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';
import { Storage } from '@ionic/storage';

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
     private imagePicker: ImagePicker,
     private base64: Base64, 
     public toastCtrl: ToastController,
    public store : Storage) {

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
    console.log(this.profile);
    let options = {
      maximumImagesCount: 1
    };
    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        this.imgPreview = results[i];
        this.base64.encodeFile(results[i]).then((base64File: string) => {
          this.profile.dpic = base64File;
        }, (err) => {
          console.log(err);
        });
      }
    }, (err) => { });
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

        this.store.remove('apitoken');
        this.navCtrl.setRoot(LoginPage);
      }
    });
  }

}
