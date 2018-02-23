import {Injectable} from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable()
export class UserAddingService {

    constructor(private http: HttpClient) {}

    addUser(): Promise<any>{
        return this.http.get("http://localhost:8080/GiphyAppAPI/AddUser")
        .take(1)
        .toPromise();
    }
}