import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule , Storage} from '@ionic/storage';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';
import { Geolocation } from '@ionic-native/geolocation';
import {InterceptorModule} from './interceptor.module';


import { AccountPageModule  } from '../pages/account/account.module';
import { DetailPageModule } from '../pages/detail/detail.module';
import { HomePageModule } from '../pages/home/home.module';
import { LoginPageModule } from '../pages/login/login.module';
import { MessagePageModule } from '../pages/message/message.module';
import { NotificationPageModule } from '../pages/notification/notification.module';
import { ProfilePageModule } from '../pages/profile/profile.module';
import { RegisterPageModule } from '../pages/register/register.module';
import { RequestsPageModule } from '../pages/requests/requests.module';
import { TextPageModule } from '../pages/text/text.module';
import { EmploymentPageModule } from '../pages/employment/employment.module';
import { RatePageModule } from '../pages/rate/rate.module';
import { ForgotpassPageModule } from '../pages/forgotpass/forgotpass.module';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AppProvider } from '../providers/app/app';



export function tokenGetter() {
  return localStorage.getItem('apitoken');
}

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    InterceptorModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:8000','192.168.137.1:8000'],
      }
    }),
    AccountPageModule,
    DetailPageModule,
    HomePageModule,
    LoginPageModule,
    MessagePageModule,
    NotificationPageModule,
    ProfilePageModule,
    RegisterPageModule,
    RequestsPageModule,
    TextPageModule,
    EmploymentPageModule,
    RatePageModule,
    ForgotpassPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ImagePicker,
    Base64,
    AppProvider
  ]
})
export class AppModule {}
