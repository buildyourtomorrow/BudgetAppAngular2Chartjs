import { Component, OnInit } from '@angular/core';

import {GetBYTUser} from './byt-dashboard-overview.service';

@Component({
    selector: 'byt-dashboard-overview-chart',
    templateUrl: './byt-dashboard-overview-chart.component.html',
    styleUrls: ['./byt-dashboard-overview-chart.component.css']
})
export class BYTDashboardOverviewChart implements OnInit {

	myDate: Date = new Date();
	yearOne:number = this.myDate.getFullYear() + 1;
	yearTwo:number = this.myDate.getFullYear() + 2;
	yearThree:number = this.myDate.getFullYear() + 3;
	yearFour:number = this.myDate.getFullYear() + 4;
	yearFive:number = this.myDate.getFullYear() + 5;
	yearSix:number = this.myDate.getFullYear() + 6;
	yearSeven:number = this.myDate.getFullYear() + 7;
	yearEight:number = this.myDate.getFullYear() + 8;
	
	public barChartLabels: any[] = [ 	this.yearOne.toString(), 
										this.yearTwo.toString(), 
										this.yearThree.toString(), 
										this.yearFour.toString(), 
										this.yearFive.toString(), 
										this.yearSix.toString(), 
										this.yearSeven.toString(), 
										this.yearEight.toString() ];

	actualIncome: number;
	actualBills: number;
	actualSpent: number;
	actualSavings: number;
	yearOneAtEight: number;
	yearTwoAtEight: number;
	yearThreeAtEight: number;
	yearFourAtEight: number;
	yearFiveAtEight: number;
	yearSixAtEight: number;
	yearSevenAtEight: number;
	yearEightAtEight: number;
	yearOneAtTen: number;
	yearTwoAtTen: number;
	yearThreeAtTen: number;
	yearFourAtTen: number;
	yearFiveAtTen: number;
	yearSixAtTen: number;
	yearSevenAtTen: number;
	yearEightAtTen: number;

	constructor (private _getBYTUser: GetBYTUser) {}

	public barChartOptions:any = {
		scaleShowVerticalLines: false,
		responsive: true
	};

	public barChartType:string = 'bar';
	public barChartLegend:boolean = true;
	 
	public barChartData:any[] = [
		{data: [ -10, -20, -30, -40, -50, -60, -70], label: 'Savings @ 10%'},
		{data: [28, 48, 40, 19, 86, 27, 90], label: 'Savings @ 12%'}
	];
		// events
	public chartClicked(e:any):void {
		console.log(e);
	}
	public chartHovered(e:any):void {
		console.log(e);
	}

	ngOnInit(){
		this._getBYTUser.getUser().subscribe( (user:any) => {
			this.actualIncome = user.totalIncome;
			this.actualBills = user.billsTotal;
			this.actualSpent = user.totalSpent;	
			this.actualSavings = this.actualIncome - this.actualBills - this.actualSpent;
			this.yearOneAtEight = this.actualSavings * 1.08
			this.yearTwoAtEight = this.actualSavings * 1.08 * 1.08;
			this.yearThreeAtEight = this.actualSavings * 1.08 * 1.08 * 1.08;
			this.yearFourAtEight = this.actualSavings * 1.08 * 1.08 * 1.08 * 1.08;
			this.yearFiveAtEight = this.actualSavings * 1.08 * 1.08 * 1.08 * 1.08 * 1.08;
			this.yearSixAtEight = this.actualSavings * 1.08 * 1.08 * 1.08 * 1.08 * 1.08 * 1.08;
			this.yearSevenAtEight = this.actualSavings * 1.08 * 1.08 * 1.08 * 1.08 * 1.08 * 1.08 * 1.08;
			this.yearEightAtEight = this.actualSavings * 1.08 * 1.08 * 1.08 * 1.08 * 1.08 * 1.08 * 1.08 * 1.08;
			this.yearOneAtTen = this.actualSavings * 1.1;
			this.yearTwoAtTen = this.actualSavings * 1.1 * 1.1;
			this.yearThreeAtTen = this.actualSavings * 1.1 * 1.1 * 1.1;
			this.yearFourAtTen = this.actualSavings * 1.1 * 1.1 * 1.1 * 1.1;
			this.yearFiveAtTen  = this.actualSavings * 1.1 * 1.1 * 1.1 * 1.1 * 1.1;
			this.yearSixAtTen = this.actualSavings * 1.1 * 1.1 * 1.1 * 1.1 * 1.1 * 1.1;
			this.yearSevenAtTen = this.actualSavings * 1.1 * 1.1 * 1.1 * 1.1 * 1.1 * 1.1 * 1.1;
			this.yearEightAtTen = this.actualSavings * 1.1 * 1.1 * 1.1 * 1.1 * 1.1 * 1.1 * 1.1 * 1.1;
			this.barChartData = [];
			this.barChartData = [
				{	
					data: 
						[ 	this.yearOneAtEight, 
							this.yearTwoAtEight, 
							this.yearThreeAtEight, 
							this.yearFourAtEight, 
							this.yearFiveAtEight, 
							this.yearSixAtEight,
							this.yearSevenAtEight,
							this.yearEightAtEight
						], 
					label: 'Savings @ 8%'
				},
				{	
					data: 
						[	this.yearOneAtTen, 
							this.yearTwoAtTen, 
							this.yearThreeAtTen, 
							this.yearFourAtTen, 
							this.yearFiveAtTen, 
							this.yearSixAtTen,
							this.yearSevenAtTen,
							this.yearEightAtTen
						],
					label: 'Savings @ 10%'
				}
			];
		});
    };

}