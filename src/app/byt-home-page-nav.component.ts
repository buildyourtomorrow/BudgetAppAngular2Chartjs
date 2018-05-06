import {Component, OnInit} from '@angular/core';

import {Auth} from "./auth.service";

@Component({
	selector: 'byt-home-page-nav',
	templateUrl: './byt-home-page-nav.component.html'
})
export class BYTHomePageNav {

	constructor (private _auth: Auth) {}

	BYTLogIn(){
		this._auth.login();
	}

}