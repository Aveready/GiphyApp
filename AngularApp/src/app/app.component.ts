import { Component, ViewChild } from '@angular/core';
import { GiphySavingService } from '../giphySaving.service';
import { NgForm } from '@angular/forms';
import { GiphyRetrievalService } from '../giphyRetrieval.service';
import { SearchService } from '../search.service';
import { HttpParams } from '@angular/common/http/src/params';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  

  saved: boolean = false;
  giphyId: string[] = [ 'ZRrbwYCGzpjoY' ];
  param: HttpParams = null;
  resultsArr: any[] = []

  constructor(private searchSvc: SearchService, private retrieveSvc: GiphyRetrievalService) { }
  
  ngOnInit() {
    this.searchSvc.searchEvent.subscribe(
      (searchString) => {
        this.saved = false;   //show save button along with giphys
        // this.param = new HttpParams()
        // .set('api_key', 'ncFswLvKX0DijHE7G1eVBKofyq6p44Ay')
        // .set('q', searchString)
        // .set('limit', '25')
        // .set('offset', '0')
        // .set('rating', 'G')
        // .set('lang', 'en');
        this.searchSvc.getPostObserve(this.param)
        .then((searchResults) =>{
          // this.resultsArr = searchResults
        })
      }
    )
  }

}
