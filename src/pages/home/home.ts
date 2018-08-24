import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ToastController,LoadingController,Events} from 'ionic-angular';
import {Geolocation } from '@ionic-native/geolocation';
import { AppProvider } from '../../providers/app/app';

import { LoginPage } from '../login/login';
import { NotificationPage } from '../notification/notification';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  private isMama: boolean = false;
  private response: any = {};
  private nanis: any = [];
  private employers: any = [];
  public notifycount;
  public loader:any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public app: AppProvider,
              public toastCtrl: ToastController,
              public loaderCtrl: LoadingController,
              public event: Events,
             public geolocation:Geolocation) 
  {
    console.log(this.isMama);
    
  }
  
  ionViewDidLoad() {

    this.app.get('user/user').subscribe((data) => {
      this.response = data;
      this.event.publish('reload', this.response.user);
    });
    
    this.checkIfMama();
    this.app.get('noticount').subscribe(res =>{
      this.response = res;
      this.notifycount = this.response.data;
    }, error =>{
      console.log(error);
    } );
  }
  
  presentLoading(msg) {
    this.loader = this.loaderCtrl.create({
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

  //get nanis for the mama
  getMamas() {
    this.app.get('nani/mamas').subscribe(res => {
      this.response = res;
      this.employers = this.response.data;
      console.log(this.employers);
      this.loader.dismiss();
    }, e =>{
      console.log(e);
    });
  }

  //get nanis for the mama
  getNanis(){
    this.app.get('mama/nanis').subscribe(res =>{
      this.response = res;
      this.nanis = this.response.data;
      console.log(this.nanis);
      this.loader.dismiss();
    }, e =>{
      console.log(e);
    });
  }

  //request nani
  naniRequest(id) {
    let data = {
      'id': id
    }
    this.app.post('mama/request',data).subscribe(res => {
      this.response = res;
      this.presentToast(this.response.message);
      this.getNanis();
    }, e =>{
      console.log(e);
    });
  }

  //if mama
  checkIfMama(){
    this.presentLoading('Loading');
    this.app.get('user/user').subscribe(res =>{
      this.response = res;
      let role = this.response.user.role;

      role.forEach(val => {
        role = val.role;
      });
      if (role == 'nany'){
        this.isMama = false;
        this.getMamas();
      } else if (role == 'mama'){
        this.isMama = true;
        this.getNanis();
      }
    }, e =>{
      console.log(e);
    });
  }


  notify(){
    this.navCtrl.setRoot(NotificationPage);
  }

  distress() {
    let location = {};
    this.geolocation.getCurrentPosition().then(
      (res) =>{
        location = res.coords;
      }).catch((err) =>{ console.log(err)});
    this.app.post( 'distress',{location}).subscribe(res => {
      console.log('call send');
    }, e =>{ console.log(e)});
  }


  logout() {
    this.app.logout().subscribe(res => {
      this.response = res;

      if (this.response.status == "success") {
        this.presentToast('LoggedOut successfully');

        this.app.deleteFromStore('apitoken');
        this.navCtrl.setRoot(LoginPage);
      }
    }, e =>{
      console.log(e);
    });
  }

}
