import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent implements OnChanges {
  public starWidth : number = 0;
  @Input()
  public rating : number = 2;
  @Output()
  public startRatingClicked : EventEmitter <string>  = 
  new EventEmitter<string>()
  constructor() { }
   
  ngOnChanges(){
    this.starWidth = this.rating * 125 / 5;  
  }
 public sendRating() : void {
  this.startRatingClicked.emit(`la note est ${this.rating}`);
 }
}
