import {Injectable} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class GiphyRetrievalService {

    constructor(private http: HttpClient) {}

    retrieveGiphys(userId: number): Promise<any> {
        let param = new HttpParams()
        .set('userId', userId.toString());

        return (
            this.http.get('http://localhost:8080/GiphyAppAPI/Retrieval', { params: param })
            .take(1)
            .toPromise()
        );
    }
}