import {Injectable} from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable()
export class GiphySavingService {

    constructor(private http: HttpClient) {}

    saveToDb(uId: number, gId: string){
        console.log("uid= " + uId)
        console.log("gid= " + gId)

        const param = new HttpParams()
        .set('userId', uId.toString())
        .set('giphyId', gId);

        const headers = new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded');

        this.http.post("http://localhost:8080/GiphyAppAPI/Save", param.toString(), {headers: headers})
        .toPromise()
        .then(() => {
        })
        .catch((err) => {
            console.log(err);
        });
    }
}