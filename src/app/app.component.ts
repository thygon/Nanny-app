import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav,Events } from 'ionic-angular';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { RequestsPage } from '../pages/requests/requests';
import { ProfilePage } from '../pages/profile/profile';
import { AccountPage } from '../pages/account/account';
import { MessagePage } from '../pages/message/message';
import { NotificationPage } from '../pages/notification/notification';
import { EmploymentPage } from '../pages/employment/employment';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AppProvider } from '../providers/app/app';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage:any;
  pages: Array<{title: string, component: any}>;
  user: any ={'name':'Username','email':'example@gmail.com',
    'pic':'../assets/imgs/menubg.jpg'
  };
  myrole: any = [];
  role: string ='';
  response: any = [];


  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public app:AppProvider,
    public event:Events

  ) {
    
          
    this.initializeApp();
    
    this.event.subscribe('user-logged', (data,role) =>{
      this.user = data;
      this.myrole = role;
      this.role = this.myrole.role;
      console.log(this.role);
    });
    this.event.subscribe('reload', (data) => {
      this.user = data;
      this.myrole = this.user.role;
       this.myrole.forEach(e => {
         this.role = e.role;
       });
      
    });
    this.setHome();
    

    // set our app's pages
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Messages', component: MessagePage },
      { title: 'Notifications', component: NotificationPage },
      { title: 'Requests', component: RequestsPage },
      { title: 'Profile', component: ProfilePage },
      { title: 'Employment', component: EmploymentPage },
      { title: 'Make Payment', component: AccountPage },
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

  setHome(){
    //set homepage
    let token = this.app.geFromStore('apitoken');
    
      if (!token || this.app.checkExpiry(token) == true) {

        this.rootPage = LoginPage;

      } else if (token && this.app.checkExpiry(token) == false) {

        this.rootPage = HomePage;

      } else {

        this.rootPage = LoginPage;
      }
  }

  

}
