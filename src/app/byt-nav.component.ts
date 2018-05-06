import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { GetBYTUser } from './dashboard/byt-dashboard-overview.service';
import { Auth } from './auth.service';
 
@Component({
	selector: 'byt-nav',
	templateUrl: './byt-nav.component.html',
	styleUrls: ['./byt-nav.component.css']
})
export class BYTNavComponent implements OnInit {
	nickName: string;
	@Output() bytPaid: EventEmitter<any> = new EventEmitter();
	@Output() bytPaid1: EventEmitter<any> = new EventEmitter();

	constructor (private _getBYTUser: GetBYTUser, private _auth: Auth, private router: Router) {}

	ngOnInit(){
		this._getBYTUser.getUserAppNav().subscribe((user: any) => {
			this.nickName = user.nickName;			
		},
		error => {
			console.log('this is hitting: byt-nav');
			this.logout();
		})
	}

	logout(){
		this._auth.logout();
		this.router.navigate(['home'])
	}

	theClientPaid(event){
		this.bytPaid.emit();
	}

}