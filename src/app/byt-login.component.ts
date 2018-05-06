import {Component, OnInit} from '@angular/core';

import {Auth} from "./auth.service";

@Component({
	templateUrl: './byt-login.component.html'
})
export class BYTLoginComponent implements OnInit {

	constructor (private _auth: Auth) {}

	ngOnInit(){
		this._auth.login();
	};
}