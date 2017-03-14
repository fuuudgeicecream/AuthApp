import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';

declare var Auth0Lock: any;

@Injectable()
export class Auth {
    //configure Auth0
    lock = new Auth0Lock('evJRg01YBtV91jlZX9WEm4IFG4xpVB3O', 'joshoes.auth0.com', {});

    constructor() {
        // Add callback for lock `authenticated` event
        this.lock.on("authenticated", (authResult: any) => {
            this.lock.getProfile(authResult.idToken, function (error: any, profile: any) {
                if (error) {
                    throw new Error(error);
                }
                // Set Token
                localStorage.setItem('id_token', authResult.idToken);
                // Set Profile
                localStorage.setItem('profile', JSON.stringify(profile));
            });
        });
    }
    public login() {
        this.lock.show();
    }
    public authenticated() {
        return tokenNotExpired();
    };
    public logout() {
        // Remove token from localStorage
        localStorage.removeItem('id_token');
        localStorage.removeItem('profile');
    }
}
