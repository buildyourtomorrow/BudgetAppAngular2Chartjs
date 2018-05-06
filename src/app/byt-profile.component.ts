import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import {BYTStripePayment, GetBYTUser} from "./dashboard/byt-dashboard-overview.service";

import { Auth } from './auth.service';
import {BYTGoProSubscriptionComponent} from './byt-go-pro-subscription.component';

 
@Component({
	templateUrl: './byt-profile.component.html',
	styleUrls: ['./byt-profile.component.css']
})
export class BYTProfile implements OnInit {
	constructor(private _getBYTUser: GetBYTUser, private _bytStripePayment: BYTStripePayment, private router: Router) {}
	userProfile: any = JSON.parse(localStorage.getItem('profile'));
	nickName:string;
	byt_paying_customer:boolean;
	@Output() paid: EventEmitter<any> = new EventEmitter();

	ngOnInit(){
		this._getBYTUser.getUserAppNav().subscribe((user: any) => {
			this.nickName = user.nickName;
			this.byt_paying_customer = user.byt_paying_customer;	
		})
	}

	BYTCancelSubscription(){
		this._bytStripePayment.bytCancelSubscription(this.userProfile.email).subscribe( (user:any) => {
			this.byt_paying_customer = user.byt_paying_customer;
			localStorage.setItem('byt_paying_customer', JSON.stringify(user.byt_paying_customer) );
			this.router.navigate(['app-menu'])   
		})
	}

	BYTGoPro() {
		var handler = (<any>window).StripeCheckout.configure({
			key: 'pk_test_jIPsDMq98glog9Al3zo3dm3Q', // change this according to Live or Test mode.
			locale: 'auto',
			email: this.userProfile.email,
			image: "http://buildyourtomorrow.com/assets/JustLogo.png",
			token: token =>  {
				// You can access the token ID with `token.id`.
				// Get the token ID to your server-side code for use.
				//localStorage.setItem('stripe_token', token.id);
				//this1._bytStripePayment.bytPostStripePayment(token.id).subscribe(user => {})
				this._bytStripePayment.bytGoProSubscription(token.id, this.userProfile.email).subscribe( (user:any) => {		                        
		            localStorage.setItem('byt_paying_customer', JSON.stringify(user.byt_paying_customer));
		            this.byt_paying_customer=!user.byt_paying_customer;
		            this.router.navigate(['app-menu'])
        		})
			}
		});
		handler.open({
			name: 'Build Your Tomorrow',
			description: 'All Access - $19/month',
			amount: 1900
		});
	}
}