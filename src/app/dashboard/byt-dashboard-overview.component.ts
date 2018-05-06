import {Component, OnInit, ViewChild} from '@angular/core';

import {GetBYTUser} from './byt-dashboard-overview.service';
import {BYTDashboardExpenseAnalysisComponent} from './byt-dashboard-expense-analysis.component';
import {BYTDashboardDailyBudgetComponent} from './byt-dashboard-daily-budget.component';
import {BYTPostProjections} from './byt-dashboard-overview.service';
import {BYTBudgetActualNavComponent} from '../budgeting/actual/nav.component';

@Component({
    selector: 'byt-dashboard-overview',
    templateUrl: './byt-dashboard-overview.component.html',
    styleUrls: ['./byt-dashboard-overview.component.css']
})
export class BYTDashboardOverviewComponent implements OnInit {
	totalIncome: number;
	totalBills: number;
	totalSpent: number;
	totalSavings: number;
	bytIncomeProjection: boolean;
	bytBillProjection: boolean;
	bytExpProjection: boolean;
	DashboardMessage: string;
	byt_show_section: boolean;
	incomeProjectionsTotal: number;
	billProjectionsTotal: number;
	expenseProjectionsTotal: number;

	@ViewChild(BYTDashboardExpenseAnalysisComponent) expenseAnalysis: BYTDashboardExpenseAnalysisComponent;
	@ViewChild(BYTDashboardDailyBudgetComponent) dailyBudget: BYTDashboardDailyBudgetComponent;
	@ViewChild(BYTBudgetActualNavComponent) bytNav: BYTBudgetActualNavComponent;

	constructor (private _getBYTUser: GetBYTUser, private _bytPostProjections: BYTPostProjections) {}

	ngOnInit(){
		this._getBYTUser.getUser().subscribe( (user:any) => {
			this.totalIncome = user.totalIncome;
			this.totalBills = user.billsTotal;
			this.totalSpent = user.totalSpent;	
			this.incomeProjectionsTotal = user.incomeProjectionsTotal;
			this.billProjectionsTotal = user.billProjectionsTotal;
			this.expenseProjectionsTotal = user.expenseProjectionsTotal;
		});
		let delay = 8000;
		setInterval(() => this.byt_show_section = true, delay);
    };
}