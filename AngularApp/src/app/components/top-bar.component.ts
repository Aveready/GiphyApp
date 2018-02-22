import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { SearchService } from '../../search.service';
import { GiphyRetrievalService } from '../../giphyRetrieval.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  @ViewChild('searchForm')
  searchForm: NgForm;

  private api_key = 'yWGwOlIijDWcGy5DH9QV5wWr5wGwDXd3';
  private query: string ;
  private limit = '25';
  private offset = '0';
  private ratings: string[] = ['Y', 'G', 'PG', 'PG-13', 'R'];
  private language = 'en';

  // httpParams: HttpParams = new HttpParams();
  // httpParams.set('api_key', this.api_key);
  // httpParams.set('q' , form.value.searchText);
  // httpParams.set('limit', this.limit);
  // httpParams.set('offset', this.offset);
  // httpParams.set('rating', this.ratings[0]);
  // httpParams.set('lang', this.language);

  constructor(private searchService: SearchService, private giphyRetrievalService: GiphyRetrievalService) { }

  ngOnInit() {
}
  getSearchTerm() {
  this.searchService.searchEvent.next(this.searchForm.value.searchText);
  }

}
