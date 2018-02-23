import { Component, ViewChild } from '@angular/core';
import { GiphySavingService } from '../giphySaving.service';
import { NgForm } from '@angular/forms';
import { GiphyRetrievalService } from '../giphyRetrieval.service';
import { SearchService } from '../search.service';
import { UserAddingService } from '../userAdding.service';
import { HttpParams } from '@angular/common/http/src/params';
import { CookieService } from 'ngx-cookie-service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { Pagination } from '../model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  cookieValue = 'UNKNOWN';
  saved: boolean = false;
  showPagination: boolean = false;
  giphyId: string[] = [];
  resultsArr: any[] = [];
  userId: string;
  page = 1;
  pageSize: number;
  pagination: Pagination;
  httpParams: HttpParams;
  collectionSize: number;

  constructor(private searchSvc: SearchService,
    private retrieveSvc: GiphyRetrievalService,
    private cookieService: CookieService,
    private userService: UserAddingService,
    private ngbPageConfig: NgbPaginationConfig) { }

  ngOnInit() {
    this.collectionSize = 4999;
    this.pagination = {
      count: 0,
      offset: 0,
  }

    if (!this.cookieService.check('userID')) {
      this.userService.addUser()
        .then((newId) => {
          console.log(newId);
          this.userId = newId.userId;
          this.cookieService.set('userID', this.userId, 1);
          console.log(this.userId);
        })
        .catch((err) => {
          console.log(err);
        })
    }
    else {
      this.userId = this.cookieService.get('userID');
      console.log(this.userId);
    }

    // subscribe to search
    this.searchSvc.searchEvent.subscribe(
      (param) => {
        this.giphyId = [];
        this.saved = false;
        this.httpParams = param;
        this.page = 1;
        this.ngbPageConfig.pageSize = param.get('limit');
        console.log(this.ngbPageConfig.pageSize);
        // show save button along with giphys
        this.searchSvc.getPostObserve(param)
          .then((searchResults) => {
            this.resultsArr = searchResults.data;
            this.pagination = {
              count: searchResults.pagination.count,
              offset: searchResults.pagination.offset
            };
            console.log(searchResults);
            this.resultsArr.forEach(giphy => {
              this.giphyId.push(giphy.id);
            })
            this.showPagination = true;
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
        this.retrieveSvc.retrieveGiphys(this.cookieService.get('userID'))
          .then((results) => {
            this.resultsArr = results;
            console.log(results);
            this.resultsArr.forEach(giphy => {
              this.giphyId.push(giphy.giphyId);
            })
            console.log(this.giphyId);
            this.showPagination = false;
          })
          .catch((err) => {
            console.log(err);
          })
      }
    )
  }
  pageChange(page: any) {
    console.log(page);
    this.giphyId = [];
    this.saved = false;
    this.pagination.offset = (page - 1) *  Number(this.httpParams.get('limit'));
    this.httpParams = this.httpParams.set('offset', this.pagination.offset.toString());
    this.searchSvc.getPostObserve(this.httpParams)
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
    )
  }
}
