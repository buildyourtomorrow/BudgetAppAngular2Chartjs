import {Component, OnInit } from '@angular/core';

import {GetBYTUser} from '../../dashboard/byt-dashboard-overview.service';
 
@Component({
	selector: 'byt-last-expense-entry',
	templateUrl: './last-expense-entry.component.html',
	styleUrls: ['./last-expense-entry.component.css']
})
export class BYTLastExpenseEntryComponent implements OnInit {
	lastTransactionDate: Date;
	monthlyExpenses: any;
	monthlyExpensesLength: number;

	constructor (private _getBYTUser: GetBYTUser) {}

	ngOnInit(){
		this._getBYTUser.getExpensesDuringBudgetPeriod().subscribe( (user:any) => {
			this.monthlyExpenses = user.monthlyExpensesDuringBudgetPeriod;
			this.monthlyExpensesLength = this.monthlyExpenses.length;
			if(this.monthlyExpensesLength > 0){
				this.lastTransactionDate = this.monthlyExpenses[0].date;
			}			
		});
	}

	lastTransactionDateFunction(expense){
		this.monthlyExpenses.unshift(expense)
		this.monthlyExpensesLength = this.monthlyExpenses.length;
		this.lastTransactionDate = this.monthlyExpenses[0].date;
	}

	updateViewFunction(monthlyExpenses){
		this.monthlyExpensesLength = monthlyExpenses.length;
		if(this.monthlyExpensesLength > 0){
			this.lastTransactionDate = monthlyExpenses[0].date;	
		}else{
			this.lastTransactionDate = new Date;
		}				
	}

}