import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';

import {BYTStripePayment} from "./dashboard/byt-dashboard-overview.service";

@Component({
	selector: 'byt-go-pro-subscription',
    templateUrl: './byt-go-pro-subscription.component.html',
    styleUrls: ['./byt-go-pro-subscription.component.css']
})
export class BYTGoProSubscriptionComponent implements OnInit {

	constructor (private _bytStripePayment: BYTStripePayment, private router: Router) {}
	userProfile: any = JSON.parse(localStorage.getItem('profile'));
	bytPayingCustomer: boolean;
	@Output() paid: EventEmitter<any> = new EventEmitter();

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
		            this.bytPayingCustomer=!user.byt_paying_customer;
		            this.theCustomerPaid()
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

	ngOnInit(){
		this.bytIsCustPaying();
	};

	bytIsCustPaying(){
		if(localStorage.getItem('byt_paying_customer') === 'true' ) {
			this.bytPayingCustomer=false;
		} else {
			this.bytPayingCustomer=true;
		}
	}

	theCustomerPaid(){
		this.paid.emit();
	}

}