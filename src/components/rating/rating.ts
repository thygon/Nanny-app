import { Component } from '@angular/core';

/**
 * Generated class for the RatingComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'rating',
  inputs: ['rate:rate'],
  templateUrl: 'rating.html'
})
export class RatingComponent {

  rate:any;

  constructor() {
    console.log('Hello RatingComponent Component');
    console.log(this.rate);
  }

  name(i,rate){

    if(rate > 5){
      rate = rate/2;
    }

    var element = (rate >= i)? 'star':'star-outline';

    return element;
  }

}
