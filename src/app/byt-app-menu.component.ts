import {Component, OnInit} from '@angular/core';

@Component({
    templateUrl: './byt-app-menu.component.html',
    styleUrls: ['./byt-app-menu.component.css']
})
export class BYTAppMenu implements OnInit{
	byt_paying_customer: any = JSON.parse(localStorage.getItem('byt_paying_customer'));
	bytPayingCustomer: boolean;

	theCustomerPaidStripe(){
		this.bytPayingCustomer=true;
	}

	ngOnInit(){
		this.bytPayingCustomer = this.byt_paying_customer;
	}

}