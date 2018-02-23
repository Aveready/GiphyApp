import {Injectable, EventEmitter} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class GiphyRetrievalService {
    retrieveEvent = new EventEmitter<any>();
    constructor(private http: HttpClient) {}

    retrieveGiphys(userId: string): Promise<any> {
        let param = new HttpParams()
        .set('userId', userId);

        return (
            this.http.get('http://localhost:8080/GiphyAppAPI/Retrieval', { params: param })
            .take(1)
            .toPromise()
        );
    }
}