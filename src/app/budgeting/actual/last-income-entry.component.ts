import {Component, OnInit } from '@angular/core';

import {GetBYTUser} from '../../dashboard/byt-dashboard-overview.service';
 
@Component({
	selector: 'byt-last-income-entry',
	templateUrl: './last-income-entry.component.html',
	styleUrls: ['./last-income-entry.component.css']
})
export class BYTLastIncomeEntryComponent implements OnInit {
	lastTransactionDate: Date;
	allIncome: any;
	allIncomeLength: number;

	constructor (private _getBYTUser: GetBYTUser) {}

	ngOnInit(){	
		this._getBYTUser.getIncomeDuringBudgetPeriod().subscribe( (user:any) => {
			let income = user.incomeDuringBudgetPeriod;
			this.allIncome = income;
			this.allIncomeLength = income.length;
			if(this.allIncomeLength > 0){
				this.lastTransactionDate = income[0].date;
			}			
		});
	}

	lastTransactionDateFunction(income){
		this.allIncome.unshift(income)
		this.allIncomeLength = this.allIncome.length;
		this.lastTransactionDate = this.allIncome[0].date;		
	}

	updateViewFunction(allIncome){
		this.allIncomeLength = allIncome.length;
		if(this.allIncomeLength > 0){
			this.lastTransactionDate = allIncome[0].date;	
		}else{
			this.lastTransactionDate = new Date;
		}				
	}

}