import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
declare const VK: any;

@Injectable()
export class LoginService {

    public loggedIn = false;
    // public user: any;
    public user = {
        first_name: 'Владислав',
        last_name: 'Курочкин'
    };
    constructor(private httpClient: HttpClient) { }

    async initVkAuth(): Promise<any> {

        VK.init({
            apiId: 6385293
        });

        const user = await this.loginVk();
        if (user) {
            this.user = user;
            this.loggedIn = true;
        }
    }

    loginVk(): Promise<any> {
        return new Promise((resolve, reject) => {
            VK.Auth.login(resp => {
                console.log(resp);

                if (resp.status === 'connected') {
                    const user = resp.session.user;
                    resolve(user);

                } else {
                    reject();
                }
            });
        });
    }

    isLoggedIn(): boolean {
        return this.loggedIn;
    }
}
