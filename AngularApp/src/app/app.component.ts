import { Component, ViewChild } from '@angular/core';
import { GiphySavingService } from '../giphySaving.service';
import { NgForm } from '@angular/forms';
import { GiphyRetrievalService } from '../giphyRetrieval.service';
import { SearchService } from '../search.service';
import { HttpParams } from '@angular/common/http/src/params';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  cookieValue = 'UNKNOWN';
  saved: boolean = false;
  giphyId: string[] = [];
  resultsArr: any[] = [];
  userId: string;

  constructor(private searchSvc: SearchService, private retrieveSvc: GiphyRetrievalService, private cookieService: CookieService) { }

  ngOnInit() {

    if (!this.cookieService.check('userID')) {
      this.cookieService.set('userID', 'Hello2', 1);
    }
    this.userId = this.cookieService.get('userID');
    console.log(this.userId);

    // subscribe to search
    this.searchSvc.searchEvent.subscribe(
      (param) => {
        this.giphyId = [];
        this.saved = false;
        // show save button along with giphys
        this.searchSvc.getPostObserve(param)
          .then((searchResults) => {
            this.resultsArr = searchResults.data;
            console.log(searchResults);
            this.resultsArr.forEach(giphy => {
              this.giphyId.push(giphy.id);
            })
          })
          .catch((err) => {
            console.log(err);
          })
      }
    )

    this.retrieveSvc.retrieveEvent.subscribe(
      () => {
        this.giphyId = [];
        this.saved = true;
        this.retrieveSvc.retrieveGiphys(this.cookieService.get('userId'))
          .then((results) => {
            this.resultsArr = results;
            console.log(results);
            this.resultsArr.forEach(giphy => {
              this.giphyId.push(giphy.giphyId);
            })
            console.log(this.giphyId);
          })
          .catch((err) => {
            console.log(err);
          })
      }
    )
  }

}
