import { Component } from '@angular/core';

/**
 * Generated class for the ChatBubbleComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'chat-bubble',
  inputs:['chat:text'],
  templateUrl: 'chat-bubble.html'
})
export class ChatBubbleComponent {

  chat: any;

  constructor() {
    console.log('Hello ChatBubbleComponent Component');
    this.chat = {
      content: 'Am I dreaming?',
      selfText: false,
      created_at: '12/3/2016'
    }
  }

}
