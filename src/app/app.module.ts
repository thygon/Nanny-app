import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule , Storage} from '@ionic/storage';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';

import { LoginPage } from '../pages/login/login';
import { NaniPage } from '../pages/nani/nani';
import { MamaPage } from '../pages/mama/mama';
import { RegisterPage } from '../pages/register/register';
import { RequestsPage } from '../pages/requests/requests';
import { ProfilePage }  from '../pages/profile/profile';
import { MyRequestsPage } from '../pages/my-requests/my-requests';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';
import { MamaProvider } from '../providers/mama/mama';
import { NaniProvider } from '../providers/nani/nani';



export function jwtOptionsFactory(storage: Storage) {
  return {
    tokenGetter: () => {
      return storage.get('apitoken');
    },
    whiteListedDomains:['localhost:8000']
  }
}

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    MamaPage,
    NaniPage,
    RegisterPage,
    RequestsPage,
    ProfilePage,
    MyRequestsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [Storage]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    MamaPage,
    NaniPage,
    RegisterPage,
    RequestsPage,
    ProfilePage,
    MyRequestsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    MamaProvider,
    NaniProvider,
    ImagePicker,
    Base64
  ]
})
export class AppModule {}
