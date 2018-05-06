import { Injectable }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';
import { AuthHttp } from 'angular2-jwt';
import Auth0Lock from "auth0-lock";

import { GetBYTUser } from './dashboard/byt-dashboard-overview.service';

@Injectable()
export class Auth {
  //Store profile object in auth class
  user: any;

  // Configure Auth0
  lock = new Auth0Lock('EscYrnfdxcDUs3WJeJL1edHhLVrlFQtB', 'buildyourtomorrow.auth0.com', {
    theme: {
      logo: "./assets/BrowserTabLogo.png",
      primaryColor: "#BAB1B1"
    },
    languageDictionary: {
      title: "BYT"
    },
    auth: {
     redirect: false,
     responseType: "token"
    }
  });

  constructor(private _router: Router, public authHttp: AuthHttp, _getBYTUser: GetBYTUser) {
    // Add callback for lock `authenticated` event

    this.lock.on("authenticated", (authResult:any) => {
      this.lock.getProfile(authResult.idToken, (error:any, profile:any) => {
        if(error){
          throw new Error(error);
        }

        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('profile', JSON.stringify(profile));
        localStorage.setItem('byt_paying_customer', 'false');

        this.authHttp.post('/create-user', profile).subscribe();

        this._router.navigate(['../app-menu']);
        this.lock.hide();
      })
    });
  }

  public login() {
    // Call the show method to display the widget.
    this.lock.show();
  };

  public authenticated() {
    // Check if there's an unexpired JWT
    // This searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired('id_token');
  };

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
  };
}