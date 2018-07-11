import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { RequestsPage } from '../pages/requests/requests';
import { ProfilePage } from '../pages/profile/profile';
import { AccountPage } from '../pages/account/account';
import { MessagePage } from '../pages/message/message';
import { NotificationPage } from '../pages/notification/notification';



import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AuthProvider } from '../providers/auth/auth';

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

      } else if (token && this.authService.tokenExpiry(token) == false) {
        
        this.rootPage = HomePage;

      }else{

        this.rootPage = LoginPage;
      }
      
    });

    // set our app's pages
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Messages', component: MessagePage },
      { title: 'Notifications', component: NotificationPage },
      { title: 'Requests', component: RequestsPage },
      { title: 'Profile', component: ProfilePage },
      { title: 'Account', component: AccountPage },
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

}
