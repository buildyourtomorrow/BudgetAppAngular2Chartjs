import {Component, OnInit } from '@angular/core';

import {GetBYTUser} from '../../dashboard/byt-dashboard-overview.service';
 
@Component({
	selector: 'byt-last-bill-entry',
	templateUrl: './last-bill-entry.component.html',
	styleUrls: ['./last-bill-entry.component.css']
})
export class BYTLastBillEntryComponent implements OnInit {
	lastTransactionDate: Date;
	monthlyBills: any;
	monthlyBillsLength: number;

	constructor (private _getBYTUser: GetBYTUser) {}

	ngOnInit(){	
		this._getBYTUser.getBillsDuringBudgetPeriod().subscribe( (user:any) => {
			this.monthlyBills = user.billsDuringBudgetPeriod;
			this.monthlyBillsLength = this.monthlyBills.length;
			if(this.monthlyBillsLength > 0){
				this.lastTransactionDate = this.monthlyBills[0].date;
			}			
		});
	}

	lastTransactionDateFunction(bill){
		this.monthlyBills.unshift(bill)
		this.monthlyBillsLength = this.monthlyBills.length;
		this.lastTransactionDate = this.monthlyBills[0].date;
	}

	updateViewFunction(monthlyBills){
		this.monthlyBillsLength = monthlyBills.length;
		if(this.monthlyBillsLength > 0){
			this.lastTransactionDate = monthlyBills[0].date;	
		}else{
			this.lastTransactionDate = new Date;
		}				
	}

}