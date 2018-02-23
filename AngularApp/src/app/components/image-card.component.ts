import { Component, OnInit, Input } from '@angular/core';
import { GiphySavingService } from '../../giphySaving.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.css']
})
export class ImageCardComponent implements OnInit {

  constructor( private savingService: GiphySavingService, private cookieService: CookieService) { }
  
  @Input() saved: boolean = null;
  @Input() giphyId: string = "";

  ngOnInit() {
  }

  saveGiphy(){
    this.savingService.saveToDb(this.cookieService.get('userID'), this.giphyId);
  }
}
