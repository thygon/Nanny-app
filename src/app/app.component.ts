import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { LoginPage } from '../pages/login/login';
import { NaniPage } from '../pages/nani/nani';
import { MamaPage } from '../pages/mama/mama';
import { RegisterPage } from '../pages/register/register';
import { RequestsPage } from '../pages/requests/requests';
import { ProfilePage } from '../pages/profile/profile';
import { MyRequestsPage } from '../pages/my-requests/my-requests';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AuthProvider } from '../providers/auth/auth';
import { MamaProvider } from '../providers/mama/mama';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage:any;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public authService: AuthProvider,
    public storage: Storage

  ) {
    
          
    this.initializeApp();

    
    //set homepage
    this.storage.get('apitoken').then(token => {
      if (!token || this.authService.tokenExpiry(token) == true){
        this.rootPage = LoginPage;
      }else{

        let role: string;

        this.authService.getSession().then(res => {
          let user: any = [];
          let roles: any = [];
          user = res;
          console.log(user);
          roles = user.user.role;
          roles.forEach(val => {
            console.log(val.role);
            role = val.role;

            localStorage.setItem('myrole', role);

            if (token && this.authService.tokenExpiry(token) == false) {

              if (role == 'mama') {
                this.rootPage = MamaPage;
              } else if (role == 'nany') {
                this.rootPage = NaniPage;
              } else {
                this.rootPage = LoginPage;
              }

            } else {

              this.rootPage = LoginPage;

            }
          });

        });

      }
      
    });

    // set our app's pages
    this.pages = [
      { title: 'Home', component: this.myHomePage() },
      { title: 'Requests', component: this.MyRequestsPage() },
      { title: 'Profile', component: ProfilePage },
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }

  myHomePage(){
    var role = localStorage.getItem('myrole');
    
    if (role == 'nany' ){
      return NaniPage;
    } else if (role == 'mama'){
      return MamaPage;
    }
  }

  MyRequestsPage(){
    var role = localStorage.getItem('myrole');

    if (role == 'nany') {
      return MyRequestsPage;
    } else if (role == 'mama') {
      return RequestsPage;
    }
  }


}
