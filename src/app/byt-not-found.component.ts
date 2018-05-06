import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from './auth.service';

@Component({
	// the following three lines are just here to avoid errors
	templateUrl: './byt-not-found.component.html'
})
export class BYT404Component implements OnInit {
	constructor(private auth: Auth, private router: Router) {}

	ngOnInit(){
		console.log('not found. being logged out');
		this.auth.logout();
		this.router.navigate(['home']);
	}

}