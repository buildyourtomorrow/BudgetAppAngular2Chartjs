import {Component, OnInit} from '@angular/core';

import {GetBYTUser} from './byt-dashboard-overview.service';


@Component({
    selector: 'byt-dashboard-daily-budget',
    templateUrl: './byt-dashboard-daily-budget.component.html',
    styleUrls: ['./byt-dashboard-daily-budget.component.css']
})
export class BYTDashboardDailyBudgetComponent implements OnInit {
	dailyBudget: number;
	daysLeft: number;
	periodStart: Date;
	periodEnd: Date;

	constructor (private _getBYTUser: GetBYTUser) {}

	ngOnInit(){

		this._getBYTUser.getUserNoCalc().subscribe( (user:any) => {
            this.periodStart = user.periodStart;
            this.periodEnd = user.periodEnd;          
        })

		this._getBYTUser.getUser().subscribe( (user:any) => {
			this.dailyBudget = user.dailyBudget;
			this.daysLeft = user.daysLeft;
		})
		
	}

}