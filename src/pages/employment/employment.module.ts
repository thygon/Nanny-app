import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmploymentPage } from './employment';

@NgModule({
  declarations: [
    EmploymentPage,
  ],
  imports: [
    IonicPageModule.forChild(EmploymentPage),
  ],
})
export class EmploymentPageModule {}
