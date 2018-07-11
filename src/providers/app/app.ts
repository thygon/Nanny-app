import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';


/*
  Generated class for the AppProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AppProvider {

  private API = "http://192.168.137.1:8000/api/";
  //private API = "http://127.0.0.1:8000/api/";

  constructor(public http: HttpClient,
              public store: Storage
  ) {
    console.log('Hello AppProvider Provider');
  }
 
  //get

  get(url){
    return this.store.get('apitoken').then(token =>{
      return new Promise(resolve => {
        this.http.get(this.API + url +'?token='+token)
          .subscribe(res => {
            resolve(res);
          }, e => {
            console.log(e);
          });
      });
    });

  }
  getWithId(id,url) {
    return this.store.get('apitoken').then(token => {
      return new Promise(resolve => {
        this.http.get(this.API + url +'/'+id+ '?token=' + token)
          .subscribe(res => {
            resolve(res);
          }, e => {
            console.log(e);
          });
      });
    });

  }

  post(data,url) {
    return this.store.get('apitoken').then(token => {
      return new Promise(resolve => {
        this.http.post(this.API + url + '?token=' + token,data)
          .subscribe(res => {
            resolve(res);
          }, e => {
            console.log(e);
          });
      });
    });

  }
//updates
  patch(id,data,url) {
    return this.store.get('apitoken').then(token => {
      return new Promise(resolve => {
        this.http.post(this.API + url+id+'?token=' + token ,data)
          .subscribe(res => {
            resolve(res);
          }, e => {
            console.log(e);
          });
      });
    });

  }

  //delete
  delete(id,url) {
    return this.store.get('apitoken').then(token => {
      return new Promise(resolve => {
        this.http.delete(this.API + url + '?token=' + token + '?id=' + id)
          .subscribe(res => {
            resolve(res);
          }, e => {
            console.log(e);
          });
      });
    });

  }



}
