import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
declare const VK: any;

@Injectable()
export class LoginService {

    public loggedIn = false;
    public user: any;
    public userGroups: any;

    constructor(private httpClient: HttpClient) { }

    async initVkAuth(): Promise<any> {

        VK.init({
            apiId: 6385293
        });

        const userId = await this.loginVk();
        const groups = await this.getGroupsVk(userId);
        const user = await this.getProfileVk();

        if (user.response && groups.response) {
            this.user = user.response[0];
            this.userGroups = groups.response;
        }

        this.loggedIn = true;
    }

    loginVk(): Promise<any> {
        return new Promise((resolve, reject) => {
            VK.Auth.login(resp => {

                if (resp.status === 'connected') {
                    const userId = resp.session.user.id;
                    resolve(userId);

                } else {
                    reject();
                }
            });
        });
    }

    getProfileVk(): Promise<any> {
        return new Promise((resolve, reject) => {
            VK.Api.call('users.get', {
                fields: 'sex, bdate, city, country, home_town, photo_50, photo_100, photo_200, contacts, education, universities, schools, followers_count, relation, personal, connections, exports, activities, interests, music, movies, tv, books, games, about, crop_photo, career, military', v: 5.73
            },
            resp => {
                resolve(resp);
                console.log(resp);
            });
        });
    }

    getGroupsVk(userId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            VK.Api.call('groups.get', { user_id: userId, extended: 1, v: 5.73 }, resp => {
                resolve(resp);
            });
        });
    }

    isLoggedIn(): boolean {
        return this.loggedIn;
    }

    logoutVk(): Promise<any> {
        return new Promise((resolve, reject) => {   
            VK.Auth.logout(() => {
                this.loggedIn = false;
            });
        });
    }
}
