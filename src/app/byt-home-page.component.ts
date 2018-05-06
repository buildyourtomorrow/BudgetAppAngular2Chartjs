import {Component, ViewEncapsulation} from '@angular/core';

import {Auth} from "./auth.service";

@Component({
    templateUrl: './home-page/index.html',
    styleUrls: [
    				'./home-page/vendor/bootstrap/css/bootstrap.min.css',
    				'./home-page/vendor/font-awesome/css/font-awesome.min.css',
	    			'./home-page/vendor/simple-line-icons/css/simple-line-icons.css',
	    			'./home-page/css/GoogleAPI1.css',
	    			'./home-page/css/GoogleAPI2.css',
	    			'./home-page/css/GoogleAPI3.css',
	    			'./home-page/device-mockups/device-mockups.min.css', 
	    			'./home-page/css/new-age.min.css'
    			]
})
export class BYTHomePage {

	constructor (private _auth: Auth) {}

	BYTLogIn(){
		this._auth.login();
	}

	GoToYouTube(){
    	window.location.href='https://www.youtube.com/channel/UC4y7a8nzB3W9IWd71FHnOsw';
	}

}