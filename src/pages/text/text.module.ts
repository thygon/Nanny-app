import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TextPage } from './text';
import { ChatBubbleComponent } from '../../components/chat-bubble/chat-bubble';

@NgModule({
  declarations: [
    TextPage,
    ChatBubbleComponent
  ],
  imports: [
    IonicPageModule.forChild(TextPage),
  ],
})
export class TextPageModule {}
