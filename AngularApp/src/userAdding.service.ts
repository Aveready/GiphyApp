import {Injectable} from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable()
export class UserAddingService {

    constructor(private http: HttpClient) {}

    addUser(uId: number){
        console.log("uid= " + uId)

        const param = new HttpParams()
        .set('userId', uId.toString())

        const headers = new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded');

        this.http.post("http://localhost:8080/GiphyAppAPI/AddUser", param.toString(), {headers: headers})
        .toPromise()
        .then(() => {
        })
        .catch((err) => {
            console.log(err);
        });
    }
}