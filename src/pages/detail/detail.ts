import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController ,AlertController} from 'ionic-angular';

import { AppProvider } from '../../providers/app/app';

import { LoginPage } from '../login/login';

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  
  private response: any = [];
  public nani: any = {};
  private nani_id:number;
  public payed: boolean = false;
  public profile: any =[]; 
  public rate: any = []; 

  private prompt:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public app: AppProvider,
    public toastCtrl: ToastController,
    public alertCtrl:AlertController) {

    this.nani_id = this.navParams.get('nani_id');
    this.payed = this.navParams.get('payed');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
    console.log(this.payed);

    this.getDetails(this.nani_id);
  }

  presentToast(data) {
    const toast = this.toastCtrl.create({
      message: data,
      duration: 3000
    });
    toast.present();
  }

  getDetails(id){
    this.app.get('mama/nani',id).subscribe(res =>{
      this.response = res;
      this.nani = this.response.data; 
      this.profile = this.response.data.profile;
      this.rate = this.response.data.rate;
      console.log(this.nani);
    });
  }

  employ(id){
    this.app.postid('mama/employ',{},id).subscribe(res =>{
    console.log(res);
    this.response = res;
    this.presentToast(this.response.message);
    }, (e) =>{
      console.log(e);
    });
  }

  message(id){
    this.showPrompt(id);
  }


  showPrompt(id) {
    this.prompt = this.alertCtrl.create({
      title: 'Compose Message',
      message: "body",
      inputs: [
        {
          name: 'message',
          placeholder: 'Message Content...'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role:'cancel',
          handler: data => {
            
          }
        },
        {
          text: 'Send',
          handler: data => {
            console.log('sending...');
            this.app.postid('msg/send',data,id).subscribe(
              res =>{
                this.response = res;
                this.presentToast(this.response.msg);
              }, (error) =>{
                this.response = error.error;
                var formerror: string = this.response.message;
                var error422 = this.response.errors
                if (error422.hasOwnProperty('message')) {
                  formerror += error422.message;
                }
                this.presentToast(formerror);
                console.log(error);
              }
            );
          }
        }
      ]
    });
    this.prompt.present();
  }

  cancel(){
   this.prompt.dismiss();
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
    }, (e) =>{
      console.log(e);
    });
  }



}
