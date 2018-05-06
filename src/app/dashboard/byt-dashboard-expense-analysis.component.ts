import {Component, OnInit} from '@angular/core';

import {GetBYTUser} from './byt-dashboard-overview.service';

@Component({
    selector: 'byt-dashboard-expense-analysis',
    templateUrl: './byt-dashboard-expense-analysis.component.html',
    styleUrls: ['./byt-dashboard-expense-analysis.component.css']
})
export class BYTDashboardExpenseAnalysisComponent implements OnInit {
	expenseProjectionsTotal: number;
	totalSpent: number;
	leftOver: number;
	upBy: number;
	today: Date = new Date;
	periodStart: Date;	
	periodEnd: Date;
	dailyBudget: number;
	specialVarUpBy: string;
	specialVarUpByWord: string;
	upByComment: string;
	byt_show_section: boolean;
	bytServerResponse: boolean;

	constructor (private _getBYTUser: GetBYTUser) {}

	ngOnInit(){
		this._getBYTUser.getUser().subscribe( (user:any) => {
			this.expenseProjectionsTotal = user.expenseProjectionsTotal;
			this.totalSpent = user.totalSpent;
			this.leftOver = user.leftOver;
			this.upBy = user.upBy;
			this.calcPeriodStart();
			this.calcPeriodEnd();
			this.calcDailyBudget();
			this.calcText();
			this.bytServerResponse = false;
		});
		let delay = 8000;
		setInterval(() => this.byt_show_section = true, delay);
	}
	calcPeriodStart(){
		let year = this.today.getFullYear();
		let month = this.today.getMonth();
		this.periodStart = new Date(year, month, 1);
	}
	calcPeriodEnd(){
		let year = this.today.getFullYear();
		let month = this.today.getMonth() + 1;
		this.periodEnd = new Date(year, month, 0);
	}
	calcDailyBudget(){
		this.dailyBudget = this.expenseProjectionsTotal / this.periodEnd.getDate();
		this.leftOver = this.expenseProjectionsTotal - this.totalSpent;
	}
	calcText(){
		if (this.upBy > 0) {
			this.specialVarUpByWord = 'Up by';
		} 
		if (this.upBy === 0) {
			this.specialVarUpByWord = 'Up by';
		} 
		if (this.upBy < 0) {
			this.specialVarUpByWord = 'Down by';
		}
	}
}