import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { AppProvider } from '../../providers/app/app';

import { LoginPage } from '../login/login';
import { RatePage } from '../rate/rate';

/**
 * Generated class for the EmploymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-employment',
  templateUrl: 'employment.html',
})
export class EmploymentPage {

  response: any = [];
  emp: any = [];
  unemp: any = {};
  employer: any = [];
  employee: any = [];
  role:string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private app:AppProvider,
              private toast:ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmploymentPage');
    this.checkIfMama();
  }

  presentToast(data) {
    const toast = this.toast.create({
      message: data,
      duration: 3000
    });
    toast.present();
  }

  getEmp(role){
    this.app.get('employment').subscribe(
      res =>{
        this.response = res;
        this.emp = this.response.data;
        this.unemp = this.response.confirm;
        
        if (role != null && role == 'mama' && this.emp != null){
          this.employer = null;
          this.employee = this.emp.nani;
        } else if (role != null && role == 'nany' && this.emp != null){
          this.employer = this.emp.mama;
          this.employee = null;
        }
        else{
          this.employer = null;
          this.employee = null;
        }
        
        console.log(this.unemp);
      }
    );
  }

  checkIfMama() {
    this.app.get('user/user').subscribe(res => {
      this.response = res;
      let role = this.response.user.role;
      

      role.forEach(val => {
        role = val.role;
        this.role = role;
      });
      this.getEmp(role);
      
    });
  }

  rateEmployee(){
    this.navCtrl.push(RatePage, {'role': this.role});
  }

  fire(){
    this.app.post('mama/fire',{}).subscribe(res =>{
      this.response = res;
      if (this.response.status == 'success'){
        this.presentToast(this.response.message);
        this.getEmp(this.role);
      }
    } );
  }

  rateEmployer(){
    this.navCtrl.push(RatePage, { 'role': this.role });
  }

  quit(){
    this.app.post('nani/quit',{}).subscribe(res => {
      this.response = res;
      if (this.response.status == 'success') {
        this.presentToast(this.response.message);
        this.getEmp(this.role);
      }
    });
  }
 

  confirm(id){
    this.app.postid('nani/confirm/employ',{},id).subscribe(
      (res) =>{
        this.response = res;
        if (this.response.status == 'success') {
          this.presentToast(this.response.message);
          this.getEmp(this.role);
        }
      }
    );
  }

  reject(id){
    this.app.postid('nani/reject/employ', {}, id).subscribe(
      (res) => {
        this.response = res;
        if (this.response.status == 'success') {
          this.presentToast(this.response.message);
          this.getEmp(this.role);
        }
      }
    );
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
