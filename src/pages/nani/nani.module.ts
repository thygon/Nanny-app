import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NaniPage } from './nani';

@NgModule({
  declarations: [
    NaniPage,
  ],
  imports: [
    IonicPageModule.forChild(NaniPage),
  ],
})
export class NaniPageModule {}
