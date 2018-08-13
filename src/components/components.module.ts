import { NgModule } from '@angular/core';
import { ChatBubbleComponent } from './chat-bubble/chat-bubble';
import { RatingComponent } from './rating/rating';
@NgModule({
	declarations: [ChatBubbleComponent,
    RatingComponent],
	imports: [],
	exports: [ChatBubbleComponent,
    RatingComponent]
})
export class ComponentsModule {}
