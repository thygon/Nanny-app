import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import 'rxjs/add/operator/catch';
/*
  Generated class for the AppProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AppProvider {

  //private API_URL  = "http://192.168.137.1:8000/api/";
  private API_URL = 'http://localhost:8000/api/';
  private LOGIN_URL = this.API_URL + 'user/login';
  private SIGNUP_URL = this.API_URL + 'user/register';
  private LOGOUT_URL = this.API_URL + 'user/logout';

  private httpOptions = {};

  constructor(public http: HttpClient,
              public jwtHelper:JwtHelperService) {
                console.log('AppProvider loaded');
            this.myheaders();
  }

  myheaders() {
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
  }

  checkExpiry(token) {
    let expiry: boolean = true;
    if (token) {
      expiry = this.jwtHelper.isTokenExpired(token);
    }
    return expiry;
  }

  deleteFromStore(key) {
    return localStorage.removeItem(key);
  }

  geFromStore(key) {
    return localStorage.getItem(key);
  }

  store(key, value) {
    return localStorage.setItem(key,value);
  }

  get(url, id = null) {
    if (id == null) {
      return this.http.get(this.API_URL + url, this.httpOptions);
    } else {
      console.log(this.httpOptions);
      return this.http.get(this.API_URL + url + '/' + id, this.httpOptions);
    }
  }

  post(url, data) {
    return this.http.post(this.API_URL + url, data, this.httpOptions);
  }

  postid(url, data, id) {
    return this.http.post(this.API_URL + url + '/' + id, data, this.httpOptions);
  }

  delete(url, id) {
    return this.http.delete(this.API_URL + url + '/' + id, this.httpOptions);
  }
  signup(data: any) {
    return this.http.post(this.SIGNUP_URL, data, this.httpOptions);
  }
  login(credentials: any) {
    return this.http.post(this.LOGIN_URL, credentials, this.httpOptions);
  }

  logout() {
    return this.http.post(this.LOGOUT_URL, {}, this.httpOptions);
  }
  

}