import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
// import 'rxjs/add/operator/map';

@Injectable()
export class SearchService {

    searchEvent = new EventEmitter<string>();

    private apiURL = 'https://api.giphy.com/v1/gifs/search?';
    constructor(private http: HttpClient) { }
    getPostObserve(httpParams: HttpParams) {
        // returns observable
        return this.http.get(this.apiURL, {params: httpParams}).take(1).toPromise();
    }
}
