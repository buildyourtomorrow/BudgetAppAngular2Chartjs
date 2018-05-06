import {Component, OnInit} from '@angular/core';

import {GetBYTUser} from '../dashboard/byt-dashboard-overview.service';

@Component({
    templateUrl: './byt-budget-11.component.html',
    styleUrls: ['./byt-budget-11.component.css']
})
export class BYTBudget11 implements OnInit {

constructor (private _getBYTUser: GetBYTUser) {}

    bytNetWorth:number;
    bytUpdatedNetWorth:number;
    bytDailyBudget:number;
    bytUpBy:number;
    bytPeriodStart:Date;
    bytPeriodEnd:Date;
    todaysDate:Date=new Date();
    bytExpenseProjections:number;

    ngOnInit(){
        this._getBYTUser.getUser().subscribe( (user:any) => {
            this.bytNetWorth = user.totalAssets - user.totalLiabilities;
            this.bytUpdatedNetWorth = user.totalAssets + (user.totalIncome - user.billsTotal - user.totalSpent) - user.totalLiabilities;
            this.bytDailyBudget = user.dailyBudget;
            this.bytUpBy = user.upBy;
            this.bytPeriodStart = user.periodStart;
            this.bytPeriodStart = user.bytPeriodStart;
            this.bytExpenseProjections = user.expenseProjectionsTotal;
        })
    }

}