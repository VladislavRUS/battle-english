import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable()
export class LoginService {

    public loggedIn = true;

    constructor(private httpClient: HttpClient) { }
    
    isLoggedIn(): boolean {
        return this.loggedIn;
    }
}