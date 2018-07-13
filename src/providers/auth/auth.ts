import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';


/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  //private apiUrl = 'http://192.168.137.1:8000/api/';
  private apiUrl = "http://127.0.0.1:8000/api/";

  constructor(public http: HttpClient, private jwtHelper : JwtHelperService, public storage :Storage) {
    console.log('Hello AuthProvider Provider');
  }


  signIn(credentials,url){

    return new Promise(resolve =>{
      this.http.post(this.apiUrl + url +'/login' , credentials)
      .subscribe(data =>{
            resolve(data);
      }, error =>{
            //reject(error);
            console.log(error);
      });
    });

  }

  signOut(){

    return this.storage.get('apitoken').then(token => {
      return new Promise(resolve => {
        this.http.post(this.apiUrl + 'user/logout?token=' + token, '')
          .subscribe(data => {
            resolve(data);
          }, error => {
            //reject(error);
            console.log(error);
          });
      });
    });

    
  }

  signUp(formdata){
    return new Promise(resolve => {
      this.http.post(this.apiUrl + 'user/signup',formdata)
        .subscribe(data => {
          resolve(data);
        }, error => {
          //reject(error);
          console.log(error);
        });
    });
  }
  getSession(){
    return this.storage.get('apitoken').then(token =>{
    
      return new Promise(resolve =>{
        this.http.get(this.apiUrl + 'user/user?token=' + token)
          .subscribe(data => {
            resolve(data);
          }, error => {
            //reject(error);
            console.log(error);
          });
      });
    });
  }

  getReq(url) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl +url)
        .subscribe(data => {
          resolve(data);
        }, error => {
          //reject(error);
          console.log(error);
        });
    });
  }
  //get
  doGet(source) {

    return this.storage.get('apitoken').then(token => {
      
      return new Promise(resolve => {
        this.http.get(this.apiUrl + source + '?token=' + token)
          .subscribe(res => {
            resolve(res);
          }, e => {
            console.log(e);
          });
      });

    });
  }

  //get
  doPost(data, source) {

    return this.storage.get('apitoken').then(token => {

      return new Promise(resolve => {
        this.http.post(this.apiUrl + source + '?token=' + token,data)
          .subscribe(res => {
            resolve(res);
          }, e => {
            console.log(e);
          });
      });

    });
  }

  getToken(){
    this.storage.get('apitoken').then(token => {
      let tokenn:string = token;
      return tokenn;
    });
  }


  tokenExpiry(token){
    return this.jwtHelper.isTokenExpired(token);
  }

  tokenExpDate(token){
    return this.jwtHelper.getTokenExpirationDate(token);
  }

}
