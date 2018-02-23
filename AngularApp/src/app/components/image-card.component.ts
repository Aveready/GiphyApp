import { Component, OnInit, Input } from '@angular/core';
import { GiphySavingService } from '../../giphySaving.service'

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.css']
})
export class ImageCardComponent implements OnInit {

  constructor( private savingService: GiphySavingService ) { }
  
  @Input() saved: boolean = null;
  @Input() giphyId: string = "";

  ngOnInit() {
  }

}
