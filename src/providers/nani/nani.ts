import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

/*
  Generated class for the NaniProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NaniProvider {

  private url: string = 'http://127.0.0.1:8000/api/nani/';


  constructor(public http: HttpClient, private jwtHelper: JwtHelperService,
    private storage: Storage ) {
    console.log('Hello NaniProvider Provider');
  }

  //post
  doPost(data, source) {

    return this.storage.get('apitoken').then(token => {

      return new Promise(resolve => {
        this.http.post(this.url + source + '?token=' + token, data)
          .subscribe(res => {
            resolve(res);
          }, e => {
            console.log(e);
          });
      });

    });
  }


  //get
  doGet(source) {

    return this.storage.get('apitoken').then(token => {
      let header = new HttpHeaders();
      header.append('Authorization', 'Bearer' + token);

      return new Promise(resolve => {
        this.http.get(this.url + source + '?token=' + token, { headers: header })
          .subscribe(res => {
            resolve(res);
          }, e => {
            console.log(e);
          });
      });

    });
  }




}
