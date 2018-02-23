import { Component, OnInit, ViewChild, Input } from '@angular/core';
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

  // private api_key = 'yWGwOlIijDWcGy5DH9QV5wWr5wGwDXd3';
  private api_key = 'ncFswLvKX0DijHE7G1eVBKofyq6p44Ay';
  private query: string;
  private limit = 25;
  private offset = '0';
  private ratings: string[] = ['Y', 'G', 'PG', 'PG-13', 'R'];
  private language = 'en';

  constructor(private searchService: SearchService, private giphyRetrievalService: GiphyRetrievalService) { }

  ngOnInit() { }
  getSearchTerm() {
    const httpParams = new HttpParams()
    .set('api_key', this.api_key)
    .set('q', this.searchForm.value.searchText)
    .set('limit', this.searchForm.value.returnSize)
    .set('offset', this.offset)
    .set('rating', this.ratings[2])
    .set('lang', this.language);
    return this.searchService.searchEvent.emit(httpParams);
  }
  retrieveSaved(){
    console.log('retrieve button');
    this.giphyRetrievalService.retrieveEvent.emit();
  }
  }