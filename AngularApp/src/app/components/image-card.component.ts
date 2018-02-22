import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.css']
})
export class ImageCardComponent implements OnInit {

  constructor() { }
  
  @Input() saved: boolean = null;
  @Input() giphyId: string = "";

  ngOnInit() {
  }

}
