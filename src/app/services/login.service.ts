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
                console.log(resp);

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
                console.log(resp);
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

    getFriends(userId: number): void {
        VK.Api.call('friends.get', {user_id: userId, fields: 'photo_50', v: 5.73}, resp => {
            console.log(JSON.stringify(resp.response.items.slice(0, 50)));
        });
    }

    async getGroups(): Promise<any> {
        const users = [2288719,3049013,3578985,5226017,5379002,5647269,5684846,6237309,6535322,7437737,8160990,8573331,8639769,9342460,9695600,9872504,10681483,11043031,11081968,11304792,11555607,11893164,11992329,12285679,12950410,14376791,14387802,14420915,14655903,14883401,15061775,15524553,16047045,17525607,17658936,17950889,18005637,18017071,18124605,18504032,19016481,19354037,19502519,19553090,19604387,20852135,21274057,21592251,21764502,21779009];
        const result = [];

        for (let user of users) {
            const groups = await this.getUserGroups(user);

            const object = {
                user: user,
                groups: groups
            }
            console.log(`User ${user} processed`)
            result.push(object);
        }

        console.log(JSON.stringify(result));
    }

    getUserGroups(userId: number): Promise<any> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                VK.Api.call('friends.get', {user_id: userId, v: 5.73}, resp => {
                    resolve(resp.response.items);
                });
            }, 500)
        });
    }
}
