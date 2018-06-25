import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MamaPage } from './mama';

@NgModule({
  declarations: [
    MamaPage,
  ],
  imports: [
    IonicPageModule.forChild(MamaPage),
  ],
})
export class MamaPageModule {}
