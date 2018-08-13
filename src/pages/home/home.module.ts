import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { RatingComponent } from '../../components/rating/rating';

@NgModule({
  declarations: [
    HomePage,
    RatingComponent
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
  ],
})
export class HomePageModule {}
