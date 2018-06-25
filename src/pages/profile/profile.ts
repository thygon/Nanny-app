import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';

import { AuthProvider } from '../../providers/auth/auth';

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
  regData = { dpic:'',level:''};
  imgPreview = 'assets/imgs/logo.png';
  response: any =[];
  profile: any =[];

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private authService: AuthProvider,
     private imagePicker: ImagePicker,
     private base64: Base64) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');

    this.getProfile();
  }

  getPhoto() {
    let options = {
      maximumImagesCount: 1
    };
    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        this.imgPreview = results[i];
        this.base64.encodeFile(results[i]).then((base64File: string) => {
          this.regData.dpic = base64File;
        }, (err) => {
          console.log(err);
        });
      }
    }, (err) => { });
  }

  getProfile(){
    this.authService.doGet('profile').then(res =>{
      this.response = res;
      this.profile = this.response.data;
      console.log(this.profile);
    }, (e) =>{
      console.log(e);
    });
  }

}
