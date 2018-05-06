import {Component, OnInit} from '@angular/core';
//import { Router } from '@angular/router';

import {GetBYTUser} from '../dashboard/byt-dashboard-overview.service';
 
@Component({
	selector: 'byt-net-worth-dup',
	templateUrl: './net-worth-1.component.html',
	styleUrls: ['./net-worth-1.component.css']
})
export class BYTNetWorthDupComponent implements OnInit {
	totalAssets: number;
	totalIncome: number;
	totalLiabilities: number;
	totalExpenses: number;
	totalBills: number;

	constructor (private _getBYTUser: GetBYTUser) {}

	ngOnInit(){
		this._getBYTUser.getUser().subscribe( (user:any) => {
			this.totalAssets = user.totalAssets;
			this.totalLiabilities = user.totalLiabilities;
			this.totalIncome = user.totalIncome;
			this.totalExpenses = user.totalSpent;
			this.totalBills = user.billsTotal;
		})
	}

}