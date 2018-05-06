import { Component, OnInit, ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';

import { BaseChartDirective } from 'ng2-charts';

import {GetBYTUser, BYTRemoveTransaction} from '../../dashboard/byt-dashboard-overview.service';
import {BYTLastExpenseEntryComponent} from './last-expense-entry.component';

/*
All of the expense categories need to update any time that an expense is either added or removed from all expenses. Therefore, the expensesCategoryTotals object
is reset then the for loops add up all categories once again. This happens on three occassions. When an expense is added or removed by the user as mentioned 
above and when the component is first initialized.
*/

@Component({
	selector: 'byt-expenses',
	templateUrl: './expenses.component.html',
	styleUrls: ['./expenses.component.css']
})
export class BYTExpensesComponent implements OnInit {
	//donut chart
	@ViewChild(BaseChartDirective) private _chart;
	allExpenses: any[];
	//donut chart
	doughnutChartLabels: Array<any> = [];
	doughnutChartData: number[] = [];
	doughnutChartType: string = "doughnut";
	isDataAvailable:boolean = false;
	expensesCategoryTotals: any[] =
	[{
		category: "Clothing",
		total: 0,
		show: true,
		subCategory: [{
			name: "Children's Clothing",
			total: 0
		},
		{
			name: "Adult's Clothing",
			total: 0	
		}]
	},
	{
		category: "Education",
		total: 0,
		show: true,
		subCategory: [{
			name: "Tuition",
			total: 0
		},
		{
			name: "Books",
			total: 0	
		},
		{
			name: "School Supplies",
			total: 0		
		},
		{
			name: "Field Trips",
			total: 0	
		},
		{
			name: "Student Loan Payment",
			total: 0
		},
		{
			name: "Magazines",
			total: 0
		}]
	},
	{
		category: "Food",
		total: 0,
		show: true,
		subCategory: [{
			name: "Groceries",
			total: 0 
		},
		{
			name: "Restaurant",
			total: 0 
		},
		{
			name: "Pet Food",
			total: 0
		},
		{
			name: "Junk Food",
			total: 0
		},
		{
			name: "Coffee",
			total: 0	
		}]
	},
	{
		category: "Gift",
		total: 0,
		show: true,
		subCategory: [{
			name: "Birthday",
			total: 0 
		},
		{
			name: "Valentine's Day",
			total: 0 
		},
		{
			name: "Anniversary",
			total: 0
		},
		{
			name: "Wedding",
			total: 0
		},
		{
			name: "Christmas",
			total: 0	
		},
		{
			name: "Special Occasion",
			total: 0	
		}]
	},
	{
		category: "Giving",
		total: 0,
		show: true,
		subCategory: [{
			name: "Tithing",
			total: 0 
		},
		{
			name: "Offerings",
			total: 0 
		},
		{
			name: "Charities",
			total: 0
		},
		{
			name: "Family",
			total: 0
		}]
	},
	{ 
		category: "Household",
		total: 0,
		show: true,
		subCategory: [{
			name: "Toiletries",
			total: 0 
		},
		{
			name: "Laundry Detergent",
			total: 0 
		},
		{
			name: "Dishwasher Detergent",
			total: 0
		},
		{
			name: "Cleaning Supplies",
			total: 0
		},
		{
			name: "Tools",
			total: 0	
		},
		{
			name: "Furniture",
			total: 0	
		},
		{
			name: "Decorating",
			total: 0	
		},
		{
			name: "Home Improvement",
			total: 0	
		},
		{
			name: "Home Repair",
			total: 0	
		}]
	},
	{
		category: "Medical",
		total: 0,
		show: true,
		subCategory: [{
			name: "Primary Care",
			total: 0 
		},
		{
			name: "Dental Care",
			total: 0 
		},
		{
			name: "Specialty Care",
			total: 0
		},
		{
			name: "Medications",
			total: 0
		},
		{
			name: "Medical Devices",
			total: 0	
		}]
	},
	{
		category: "Personal",
		total: 0,
		show: true,
		subCategory: [{
			name: "Hair & Hair Cuts",
			total: 0 
		},
		{
			name: "Salon Services",
			total: 0 
		},
		{
			name: "Cosmetics",
			total: 0
		},
		{
			name: "Babysitter",
			total: 0
		},
		{
			name: "Laundry",
			total: 0
		},
		{
			name: "Spa & Massage",
			total: 0
		}]
	},
	{
		category: "Play",
		total: 0,
		show: true,
		subCategory: [{
			name: "Movies",
			total: 0 
		},
		{
			name: "Clubs / Bars",
			total: 0 
		},
		{
			name: "Entertainment",
			total: 0
		},
		{
			name: "Games",
			total: 0
		},
		{
			name: "Vacations",
			total: 0
		},
		{
			name: "Sporting Events",
			total: 0
		},
		{
			name: "Amusement Park",
			total: 0
		}]
	},
	{ 
		category: "Events",
		total: 0,
		show: true,
		subCategory: [{
			name: "Moving",
			total: 0 
		},
		{
			name: "Wedding",
			total: 0 
		},
		{
			name: "Birthday parties",
			total: 0 
		},
		{
			name: "Baby showers",
			total: 0 
		},
		{
			name: "Special events",
			total: 0 
		}]
	},
	{ 
		category: "Transportation",
		total: 0,
		show: true,
		subCategory: [{
			name: "Fuel",
			total: 0 
		},
		{
			name: "Tires",
			total: 0 
		},
		{
			name: "Oil Changes",
			total: 0
		},
		{
			name: "Maintenance",
			total: 0
		},
		{
			name: "Parking Fees",
			total: 0
		},
		{
			name: "Repairs",
			total: 0
		},
		{
			name: "DMV Fees",
			total: 0
		},
		{
			name: "Vehicle Replacement",
			total: 0
		},
		{
			name: "Taxi",
			total: 0
		},
		{
			name: "Public Transportation",
			total: 0
		},
		{
			name: "Tolls",
			total: 0
		},
		{
			name: "Auto Payment",
			total: 0
		},
		{
			name: "Auto Insurance",
			total: 0
		}]
	},
	{ 
		category: "Travel",
		total: 0,
		show: true,
		subCategory: [{
			name: "Air Travel",
			total: 0 
		},
		{
			name: "Hotel",
			total: 0 
		},
		{
			name: "Rental Car & Taxi",
			total: 0
		},
		{
			name: "Vacations",
			total: 0
		}]
	},
	{ 
		category: "Pets",
		total: 0,
		show: true,
		subCategory: [{
			name: "Pet Food & Supplies",
			total: 0 
		},
		{
			name: "Pet Grooming",
			total: 0 
		},
		{
			name: "Veterinary",
			total: 0
		}]
	},
	{ 
		category: "Kids",
		total: 0,
		show: true,
		subCategory: [{
			name: "Allowance",
			total: 0 
		},
		{
			name: "Baby Supplies",
			total: 0 
		},
		{
			name: "Babysitter & Daycare",
			total: 0
		},
		{
			name: "Child Support",
			total: 0
		},
		{
			name: "Kids Activities",
			total: 0
		},
		{
			name: "Toys",
			total: 0
		}]
	},
	{ 
		category: "Miscellaneous",
		total: 0,
		show: true,
		subCategory: [{
			name: "Day-To-Day Expenses",
			total: 0 
		}]
	}]
	byt_active: boolean = true;
	allExpensesLength: number;
	totalSpentOnExpenses: number;

	@ViewChild(BYTLastExpenseEntryComponent) _lastExpenseEntry: BYTLastExpenseEntryComponent;

	constructor (private _getBYTUser: GetBYTUser, private _bytRemoveTransaction: BYTRemoveTransaction) {}

	ngOnInit(){
		this.getAllExpenses();
	};

	removeBill(index){
		this.allExpenses.splice(index, 1);
		this.expensesCategoryTotals = 
		[{
			category: "Clothing",
			total: 0,
			show: true,
			subCategory: [{
				name: "Children's Clothing",
				total: 0
			},
			{
				name: "Adult's Clothing",
				total: 0	
			}]
		},
		{
			category: "Education",
			total: 0,
			show: true,
			subCategory: [{
				name: "Tuition",
				total: 0
			},
			{
				name: "Books",
				total: 0	
			},
			{
				name: "School Supplies",
				total: 0		
			},
			{
				name: "Field Trips",
				total: 0	
			},
			{
				name: "Student Loan Payment",
				total: 0
			},
			{
				name: "Magazines",
				total: 0
			}]
		},
		{
			category: "Food",
			total: 0,
			show: true,
			subCategory: [{
				name: "Groceries",
				total: 0 
			},
			{
				name: "Restaurant",
				total: 0 
			},
			{
				name: "Pet Food",
				total: 0
			},
			{
				name: "Junk Food",
				total: 0
			},
			{
				name: "Coffee",
				total: 0	
			}]
		},
		{
			category: "Gift",
			total: 0,
			show: true,
			subCategory: [{
				name: "Birthday",
				total: 0 
			},
			{
				name: "Valentine's Day",
				total: 0 
			},
			{
				name: "Anniversary",
				total: 0
			},
			{
				name: "Wedding",
				total: 0
			},
			{
				name: "Christmas",
				total: 0	
			},
			{
				name: "Special Occasion",
				total: 0	
			}]
		},
		{
			category: "Giving",
			total: 0,
			show: true,
			subCategory: [{
				name: "Tithing",
				total: 0 
			},
			{
				name: "Offerings",
				total: 0 
			},
			{
				name: "Charities",
				total: 0
			},
			{
				name: "Family",
				total: 0
			}]
		},
		{ 
			category: "Household",
			total: 0,
			show: true,
			subCategory: [{
				name: "Toiletries",
				total: 0 
			},
			{
				name: "Laundry Detergent",
				total: 0 
			},
			{
				name: "Dishwasher Detergent",
				total: 0
			},
			{
				name: "Cleaning Supplies",
				total: 0
			},
			{
				name: "Tools",
				total: 0	
			},
			{
				name: "Furniture",
				total: 0	
			},
			{
				name: "Decorating",
				total: 0	
			},
			{
				name: "Home Improvement",
				total: 0	
			},
			{
				name: "Home Repair",
				total: 0	
			}]
		},
		{
			category: "Medical",
			total: 0,
			show: true,
			subCategory: [{
				name: "Primary Care",
				total: 0 
			},
			{
				name: "Dental Care",
				total: 0 
			},
			{
				name: "Specialty Care",
				total: 0
			},
			{
				name: "Medications",
				total: 0
			},
			{
				name: "Medical Devices",
				total: 0	
			}]
		},
		{
			category: "Personal",
			total: 0,
			show: true,
			subCategory: [{
				name: "Hair & Hair Cuts",
				total: 0 
			},
			{
				name: "Salon Services",
				total: 0 
			},
			{
				name: "Cosmetics",
				total: 0
			},
			{
				name: "Babysitter",
				total: 0
			},
			{
				name: "Laundry",
				total: 0
			},
			{
				name: "Spa & Massage",
				total: 0
			}]
		},
		{
			category: "Play",
			total: 0,
			show: true,
			subCategory: [{
				name: "Movies",
				total: 0 
			},
			{
				name: "Clubs / Bars",
				total: 0 
			},
			{
				name: "Entertainment",
				total: 0
			},
			{
				name: "Games",
				total: 0
			},
			{
				name: "Vacations",
				total: 0
			},
			{
				name: "Sporting Events",
				total: 0
			},
			{
				name: "Amusement Park",
				total: 0
			}]
		},
		{ 
			category: "Events",
			total: 0,
			show: true,
			subCategory: [{
				name: "Moving",
				total: 0 
			},
			{
				name: "Wedding",
				total: 0 
			},
			{
				name: "Birthday parties",
				total: 0 
			},
			{
				name: "Baby showers",
				total: 0 
			},
			{
				name: "Special events",
				total: 0 
			}]
		},
		{ 
			category: "Transportation",
			total: 0,
			show: true,
			subCategory: [{
				name: "Fuel",
				total: 0 
			},
			{
				name: "Tires",
				total: 0 
			},
			{
				name: "Oil Changes",
				total: 0
			},
			{
				name: "Maintenance",
				total: 0
			},
			{
				name: "Parking Fees",
				total: 0
			},
			{
				name: "Repairs",
				total: 0
			},
			{
				name: "DMV Fees",
				total: 0
			},
			{
				name: "Vehicle Replacement",
				total: 0
			},
			{
				name: "Taxi",
				total: 0
			},
			{
				name: "Public Transportation",
				total: 0
			},
			{
				name: "Tolls",
				total: 0
			},
			{
				name: "Auto Payment",
				total: 0
			},
			{
				name: "Auto Insurance",
				total: 0
			}]
		},
		{ 
			category: "Travel",
			total: 0,
			show: true,
			subCategory: [{
				name: "Air Travel",
				total: 0 
			},
			{
				name: "Hotel",
				total: 0 
			},
			{
				name: "Rental Car & Taxi",
				total: 0
			},
			{
				name: "Vacations",
				total: 0
			}]
		},
		{ 
			category: "Pets",
			total: 0,
			show: true,
			subCategory: [{
				name: "Pet Food & Supplies",
				total: 0 
			},
			{
				name: "Pet Grooming",
				total: 0 
			},
			{
				name: "Veterinary",
				total: 0
			}]
		},
		{ 
			category: "Kids",
			total: 0,
			show: true,
			subCategory: [{
				name: "Allowance",
				total: 0 
			},
			{
				name: "Baby Supplies",
				total: 0 
			},
			{
				name: "Babysitter & Daycare",
				total: 0
			},
			{
				name: "Child Support",
				total: 0
			},
			{
				name: "Kids Activities",
				total: 0
			},
			{
				name: "Toys",
				total: 0
			}]
		},
		{ 
			category: "Miscellaneous",
			total: 0,
			show: true,
			subCategory: [{
				name: "Day-To-Day Expenses",
				total: 0 
			}]
		}]
		
		for (let i = 0; i < this.allExpenses.length; i++){
			if (this.allExpenses[i].category === "Clothing") {
				this.expensesCategoryTotals[0].total += this.allExpenses[i].amount;
				if (this.allExpenses[i].subCategory === "Children's Clothing") {
					this.expensesCategoryTotals[0].subCategory[0].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Adult's Clothing") {
					this.expensesCategoryTotals[0].subCategory[1].total += this.allExpenses[i].amount;
				}
			};
			if (this.allExpenses[i].category === "Education") {
				this.expensesCategoryTotals[1].total += this.allExpenses[i].amount;	
				if (this.allExpenses[i].subCategory === "Tuition") {
					this.expensesCategoryTotals[1].subCategory[0].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Books") {
					this.expensesCategoryTotals[1].subCategory[1].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "School Supplies") {
					this.expensesCategoryTotals[1].subCategory[2].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Field Trips") {
					this.expensesCategoryTotals[1].subCategory[3].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Student Loan Payment") {
					this.expensesCategoryTotals[1].subCategory[4].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Magazines") {
					this.expensesCategoryTotals[1].subCategory[5].total += this.allExpenses[i].amount;
				}
			};
			if (this.allExpenses[i].category === "Food") {
				this.expensesCategoryTotals[2].total += this.allExpenses[i].amount;	
				if (this.allExpenses[i].subCategory === "Groceries") {
					this.expensesCategoryTotals[2].subCategory[0].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Restaurant") {
					this.expensesCategoryTotals[2].subCategory[1].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Pet Food") {
					this.expensesCategoryTotals[2].subCategory[2].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Junk Food") {
					this.expensesCategoryTotals[2].subCategory[3].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Coffee") {
					this.expensesCategoryTotals[2].subCategory[4].total += this.allExpenses[i].amount;
				}
			};
			if (this.allExpenses[i].category === "Gift") {
				this.expensesCategoryTotals[3].total += this.allExpenses[i].amount;	
				if (this.allExpenses[i].subCategory === "Birthday") {
					this.expensesCategoryTotals[3].subCategory[0].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Valentine's Day") {
					this.expensesCategoryTotals[3].subCategory[1].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Anniversary") {
					this.expensesCategoryTotals[3].subCategory[2].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Wedding") {
					this.expensesCategoryTotals[3].subCategory[3].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Christmas") {
					this.expensesCategoryTotals[3].subCategory[4].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Special Occasion") {
					this.expensesCategoryTotals[3].subCategory[5].total += this.allExpenses[i].amount;
				}
			};
			if (this.allExpenses[i].category === "Giving") {
				this.expensesCategoryTotals[4].total += this.allExpenses[i].amount;	
				if (this.allExpenses[i].subCategory === "Tithing") {
					this.expensesCategoryTotals[4].subCategory[0].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Offerings") {
					this.expensesCategoryTotals[4].subCategory[1].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Charities") {
					this.expensesCategoryTotals[4].subCategory[2].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Family") {
					this.expensesCategoryTotals[4].subCategory[3].total += this.allExpenses[i].amount;
				}
			};
			if (this.allExpenses[i].category === "Household") {
				this.expensesCategoryTotals[5].total += this.allExpenses[i].amount;	
				if (this.allExpenses[i].subCategory === "Toiletries") {
					this.expensesCategoryTotals[5].subCategory[0].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Laundry Detergent") {
					this.expensesCategoryTotals[5].subCategory[1].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Dishwasher Detergent") {
					this.expensesCategoryTotals[5].subCategory[2].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Cleaning Supplies") {
					this.expensesCategoryTotals[5].subCategory[3].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Tools") {
					this.expensesCategoryTotals[5].subCategory[4].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Furniture") {
					this.expensesCategoryTotals[5].subCategory[5].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Decorating") {
					this.expensesCategoryTotals[5].subCategory[6].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Home Improvement") {
					this.expensesCategoryTotals[5].subCategory[7].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Home Repair") {
					this.expensesCategoryTotals[5].subCategory[8].total += this.allExpenses[i].amount;
				}
			};
			if (this.allExpenses[i].category === "Medical") {
				this.expensesCategoryTotals[6].total += this.allExpenses[i].amount;	
				if (this.allExpenses[i].subCategory === "Primary Care") {
					this.expensesCategoryTotals[6].subCategory[0].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Dental Care") {
					this.expensesCategoryTotals[6].subCategory[1].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Specialty Care") {
					this.expensesCategoryTotals[6].subCategory[2].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Medications") {
					this.expensesCategoryTotals[6].subCategory[3].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Medical Devices") {
					this.expensesCategoryTotals[6].subCategory[4].total += this.allExpenses[i].amount;
				}
			};
			if (this.allExpenses[i].category === "Personal") {
				this.expensesCategoryTotals[7].total += this.allExpenses[i].amount;	
				if (this.allExpenses[i].subCategory === "Hair & Hair Cuts") {
					this.expensesCategoryTotals[7].subCategory[0].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Salon Services") {
					this.expensesCategoryTotals[7].subCategory[1].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Cosmetics") {
					this.expensesCategoryTotals[7].subCategory[2].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Babysitter") {
					this.expensesCategoryTotals[7].subCategory[3].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Laundry") {
					this.expensesCategoryTotals[7].subCategory[2].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Spa & Massage") {
					this.expensesCategoryTotals[7].subCategory[3].total += this.allExpenses[i].amount;
				}
			};
			if (this.allExpenses[i].category === "Play") {
				this.expensesCategoryTotals[8].total += this.allExpenses[i].amount;	
				if (this.allExpenses[i].subCategory === "Movies") {
					this.expensesCategoryTotals[8].subCategory[0].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Clubs / Bars") {
					this.expensesCategoryTotals[8].subCategory[1].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Entertainment") {
					this.expensesCategoryTotals[8].subCategory[2].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Games") {
					this.expensesCategoryTotals[8].subCategory[3].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Vacations") {
					this.expensesCategoryTotals[8].subCategory[4].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Sporting Events") {
					this.expensesCategoryTotals[8].subCategory[5].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Amusement Park") {
					this.expensesCategoryTotals[8].subCategory[6].total += this.allExpenses[i].amount;
				}
			};
			if (this.allExpenses[i].category === "Events") {
				this.expensesCategoryTotals[9].total += this.allExpenses[i].amount;	
				if (this.allExpenses[i].subCategory === "Moving") {
					this.expensesCategoryTotals[9].subCategory[0].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Wedding") {
					this.expensesCategoryTotals[9].subCategory[1].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Birthday parties") {
					this.expensesCategoryTotals[9].subCategory[2].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Baby showers") {
					this.expensesCategoryTotals[9].subCategory[3].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Special events") {
					this.expensesCategoryTotals[9].subCategory[4].total += this.allExpenses[i].amount;
				}
			};
			if (this.allExpenses[i].category === "Transportation") {
				this.expensesCategoryTotals[10].total += this.allExpenses[i].amount;	
				if (this.allExpenses[i].subCategory === "Fuel") {
					this.expensesCategoryTotals[10].subCategory[0].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Tires") {
					this.expensesCategoryTotals[10].subCategory[1].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Oil Changes") {
					this.expensesCategoryTotals[10].subCategory[2].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Maintenance") {
					this.expensesCategoryTotals[10].subCategory[3].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Parking Fees") {
					this.expensesCategoryTotals[10].subCategory[4].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Repairs") {
					this.expensesCategoryTotals[10].subCategory[5].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "DMV Fees") {
					this.expensesCategoryTotals[10].subCategory[6].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Vehicle Replacement") {
					this.expensesCategoryTotals[10].subCategory[7].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Taxi") {
					this.expensesCategoryTotals[10].subCategory[8].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Public Transportation") {
					this.expensesCategoryTotals[10].subCategory[9].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Tolls") {
					this.expensesCategoryTotals[10].subCategory[10].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Auto Payment") {
					this.expensesCategoryTotals[10].subCategory[11].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Auto Insurance") {
					this.expensesCategoryTotals[10].subCategory[12].total += this.allExpenses[i].amount;
				}
			};
			if (this.allExpenses[i].category === "Travel") {
				this.expensesCategoryTotals[11].total += this.allExpenses[i].amount;	
				if (this.allExpenses[i].subCategory === "Air Travel") {
					this.expensesCategoryTotals[11].subCategory[0].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Hotel") {
					this.expensesCategoryTotals[11].subCategory[1].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Rental Car & Taxi") {
					this.expensesCategoryTotals[11].subCategory[2].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Vacations") {
					this.expensesCategoryTotals[11].subCategory[3].total += this.allExpenses[i].amount;
				}
			};
			if (this.allExpenses[i].category === "Pets") {
				this.expensesCategoryTotals[12].total += this.allExpenses[i].amount;	
				if (this.allExpenses[i].subCategory === "Pet Food & Supplies") {
					this.expensesCategoryTotals[12].subCategory[0].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Pet Grooming") {
					this.expensesCategoryTotals[12].subCategory[1].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Veterinary") {
					this.expensesCategoryTotals[12].subCategory[2].total += this.allExpenses[i].amount;
				}
			};
			if (this.allExpenses[i].category === "Kids") {
				this.expensesCategoryTotals[13].total += this.allExpenses[i].amount;	
				if (this.allExpenses[i].subCategory === "Allowance") {
					this.expensesCategoryTotals[13].subCategory[0].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Baby Supplies") {
					this.expensesCategoryTotals[13].subCategory[1].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Babysitter & Daycare") {
					this.expensesCategoryTotals[13].subCategory[2].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Child Support") {
					this.expensesCategoryTotals[13].subCategory[3].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Kids Activities") {
					this.expensesCategoryTotals[13].subCategory[4].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Toys") {
					this.expensesCategoryTotals[13].subCategory[5].total += this.allExpenses[i].amount;
				}
			};
			if (this.allExpenses[i].category === "Miscellaneous") {
				this.expensesCategoryTotals[14].total += this.allExpenses[i].amount;	
				if (this.allExpenses[i].subCategory === "Day-To-Day Expenses") {
					this.expensesCategoryTotals[14].subCategory[0].total += this.allExpenses[i].amount;
				}
			};
		};
		this._bytRemoveTransaction.bytRemoveExpense(index).subscribe(user => {});
		this.allExpensesLength = this.allExpenses.length;
		this._lastExpenseEntry.updateViewFunction(this.allExpenses);
		if(this.allExpensesLength === 0){
			this.byt_active = true;
		}
		//donut chart
		this.doughnutChartLabels.length = 0
		this.doughnutChartData.length = 0
		for (let i = 0; i < this.expensesCategoryTotals.length; i++){
			if( this.expensesCategoryTotals[i].total > 0 ){
				this.doughnutChartLabels.push(this.expensesCategoryTotals[i].category);
				this.doughnutChartData.push(this.expensesCategoryTotals[i].total);									
			};		
		};
		this._chart.refresh();
		//donut chart
		if(this.doughnutChartData.length > 0){
			this.isDataAvailable = true;
		} else { 
			this.isDataAvailable = false;
		}
	};

	childExpenseForm($event: Object){
		this.allExpensesLength = 1;
		this.allExpenses.unshift($event);
		this._lastExpenseEntry.lastTransactionDateFunction($event);
		this.expensesCategoryTotals = 
		[{
			category: "Clothing",
			total: 0,
			show: true,
			subCategory: [{
				name: "Children's Clothing",
				total: 0
			},
			{
				name: "Adult's Clothing",
				total: 0	
			}]
		},
		{
			category: "Education",
			total: 0,
			show: true,
			subCategory: [{
				name: "Tuition",
				total: 0
			},
			{
				name: "Books",
				total: 0	
			},
			{
				name: "School Supplies",
				total: 0		
			},
			{
				name: "Field Trips",
				total: 0	
			},
			{
				name: "Student Loan Payment",
				total: 0
			},
			{
				name: "Magazines",
				total: 0
			}]
		},
		{
			category: "Food",
			total: 0,
			show: true,
			subCategory: [{
				name: "Groceries",
				total: 0 
			},
			{
				name: "Restaurant",
				total: 0 
			},
			{
				name: "Pet Food",
				total: 0
			},
			{
				name: "Junk Food",
				total: 0
			},
			{
				name: "Coffee",
				total: 0	
			}]
		},
		{
			category: "Gift",
			total: 0,
			show: true,
			subCategory: [{
				name: "Birthday",
				total: 0 
			},
			{
				name: "Valentine's Day",
				total: 0 
			},
			{
				name: "Anniversary",
				total: 0
			},
			{
				name: "Wedding",
				total: 0
			},
			{
				name: "Christmas",
				total: 0	
			},
			{
				name: "Special Occasion",
				total: 0	
			}]
		},
		{
			category: "Giving",
			total: 0,
			show: true,
			subCategory: [{
				name: "Tithing",
				total: 0 
			},
			{
				name: "Offerings",
				total: 0 
			},
			{
				name: "Charities",
				total: 0
			},
			{
				name: "Family",
				total: 0
			}]
		},
		{ 
			category: "Household",
			total: 0,
			show: true,
			subCategory: [{
				name: "Toiletries",
				total: 0 
			},
			{
				name: "Laundry Detergent",
				total: 0 
			},
			{
				name: "Dishwasher Detergent",
				total: 0
			},
			{
				name: "Cleaning Supplies",
				total: 0
			},
			{
				name: "Tools",
				total: 0	
			},
			{
				name: "Furniture",
				total: 0	
			},
			{
				name: "Decorating",
				total: 0	
			},
			{
				name: "Home Improvement",
				total: 0	
			},
			{
				name: "Home Repair",
				total: 0	
			}]
		},
		{
			category: "Medical",
			total: 0,
			show: true,
			subCategory: [{
				name: "Primary Care",
				total: 0 
			},
			{
				name: "Dental Care",
				total: 0 
			},
			{
				name: "Specialty Care",
				total: 0
			},
			{
				name: "Medications",
				total: 0
			},
			{
				name: "Medical Devices",
				total: 0	
			}]
		},
		{
			category: "Personal",
			total: 0,
			show: true,
			subCategory: [{
				name: "Hair & Hair Cuts",
				total: 0 
			},
			{
				name: "Salon Services",
				total: 0 
			},
			{
				name: "Cosmetics",
				total: 0
			},
			{
				name: "Babysitter",
				total: 0
			},
			{
				name: "Laundry",
				total: 0
			},
			{
				name: "Spa & Massage",
				total: 0
			}]
		},
		{
			category: "Play",
			total: 0,
			show: true,
			subCategory: [{
				name: "Movies",
				total: 0 
			},
			{
				name: "Clubs / Bars",
				total: 0 
			},
			{
				name: "Entertainment",
				total: 0
			},
			{
				name: "Games",
				total: 0
			},
			{
				name: "Vacations",
				total: 0
			},
			{
				name: "Sporting Events",
				total: 0
			},
			{
				name: "Amusement Park",
				total: 0
			}]
		},
		{ 
			category: "Events",
			total: 0,
			show: true,
			subCategory: [{
				name: "Moving",
				total: 0 
			},
			{
				name: "Wedding",
				total: 0 
			},
			{
				name: "Birthday parties",
				total: 0 
			},
			{
				name: "Baby showers",
				total: 0 
			},
			{
				name: "Special events",
				total: 0 
			}]
		},
		{ 
			category: "Transportation",
			total: 0,
			show: true,
			subCategory: [{
				name: "Fuel",
				total: 0 
			},
			{
				name: "Tires",
				total: 0 
			},
			{
				name: "Oil Changes",
				total: 0
			},
			{
				name: "Maintenance",
				total: 0
			},
			{
				name: "Parking Fees",
				total: 0
			},
			{
				name: "Repairs",
				total: 0
			},
			{
				name: "DMV Fees",
				total: 0
			},
			{
				name: "Vehicle Replacement",
				total: 0
			},
			{
				name: "Taxi",
				total: 0
			},
			{
				name: "Public Transportation",
				total: 0
			},
			{
				name: "Tolls",
				total: 0
			},
			{
				name: "Auto Payment",
				total: 0
			},
			{
				name: "Auto Insurance",
				total: 0
			}]
		},
		{ 
			category: "Travel",
			total: 0,
			show: true,
			subCategory: [{
				name: "Air Travel",
				total: 0 
			},
			{
				name: "Hotel",
				total: 0 
			},
			{
				name: "Rental Car & Taxi",
				total: 0
			},
			{
				name: "Vacations",
				total: 0
			}]
		},
		{ 
			category: "Pets",
			total: 0,
			show: true,
			subCategory: [{
				name: "Pet Food & Supplies",
				total: 0 
			},
			{
				name: "Pet Grooming",
				total: 0 
			},
			{
				name: "Veterinary",
				total: 0
			}]
		},
		{ 
			category: "Kids",
			total: 0,
			show: true,
			subCategory: [{
				name: "Allowance",
				total: 0 
			},
			{
				name: "Baby Supplies",
				total: 0 
			},
			{
				name: "Babysitter & Daycare",
				total: 0
			},
			{
				name: "Child Support",
				total: 0
			},
			{
				name: "Kids Activities",
				total: 0
			},
			{
				name: "Toys",
				total: 0
			}]
		},		
		{ 
			category: "Miscellaneous",
			total: 0,
			show: true,
			subCategory: [{
				name: "Day-To-Day Expenses",
				total: 0 
			}]
		}]
		
		for (let i = 0; i < this.allExpenses.length; i++){
			if (this.allExpenses[i].category === "Clothing") {
				this.expensesCategoryTotals[0].total += this.allExpenses[i].amount;
				if (this.allExpenses[i].subCategory === "Children's Clothing") {
					this.expensesCategoryTotals[0].subCategory[0].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Adult's Clothing") {
					this.expensesCategoryTotals[0].subCategory[1].total += this.allExpenses[i].amount;
				}
			};
			if (this.allExpenses[i].category === "Education") {
				this.expensesCategoryTotals[1].total += this.allExpenses[i].amount;	
				if (this.allExpenses[i].subCategory === "Tuition") {
					this.expensesCategoryTotals[1].subCategory[0].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Books") {
					this.expensesCategoryTotals[1].subCategory[1].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "School Supplies") {
					this.expensesCategoryTotals[1].subCategory[2].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Field Trips") {
					this.expensesCategoryTotals[1].subCategory[3].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Student Loan Payment") {
					this.expensesCategoryTotals[1].subCategory[4].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Magazines") {
					this.expensesCategoryTotals[1].subCategory[5].total += this.allExpenses[i].amount;
				}
			};
			if (this.allExpenses[i].category === "Food") {
				this.expensesCategoryTotals[2].total += this.allExpenses[i].amount;	
				if (this.allExpenses[i].subCategory === "Groceries") {
					this.expensesCategoryTotals[2].subCategory[0].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Restaurant") {
					this.expensesCategoryTotals[2].subCategory[1].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Pet Food") {
					this.expensesCategoryTotals[2].subCategory[2].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Junk Food") {
					this.expensesCategoryTotals[2].subCategory[3].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Coffee") {
					this.expensesCategoryTotals[2].subCategory[4].total += this.allExpenses[i].amount;
				}
			};
			if (this.allExpenses[i].category === "Gift") {
				this.expensesCategoryTotals[3].total += this.allExpenses[i].amount;	
				if (this.allExpenses[i].subCategory === "Birthday") {
					this.expensesCategoryTotals[3].subCategory[0].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Valentine's Day") {
					this.expensesCategoryTotals[3].subCategory[1].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Anniversary") {
					this.expensesCategoryTotals[3].subCategory[2].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Wedding") {
					this.expensesCategoryTotals[3].subCategory[3].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Christmas") {
					this.expensesCategoryTotals[3].subCategory[4].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Special Occasion") {
					this.expensesCategoryTotals[3].subCategory[5].total += this.allExpenses[i].amount;
				}
			};
			if (this.allExpenses[i].category === "Giving") {
				this.expensesCategoryTotals[4].total += this.allExpenses[i].amount;	
				if (this.allExpenses[i].subCategory === "Tithing") {
					this.expensesCategoryTotals[4].subCategory[0].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Offerings") {
					this.expensesCategoryTotals[4].subCategory[1].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Charities") {
					this.expensesCategoryTotals[4].subCategory[2].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Family") {
					this.expensesCategoryTotals[4].subCategory[3].total += this.allExpenses[i].amount;
				}
			};
			if (this.allExpenses[i].category === "Household") {
				this.expensesCategoryTotals[5].total += this.allExpenses[i].amount;	
				if (this.allExpenses[i].subCategory === "Toiletries") {
					this.expensesCategoryTotals[5].subCategory[0].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Laundry Detergent") {
					this.expensesCategoryTotals[5].subCategory[1].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Dishwasher Detergent") {
					this.expensesCategoryTotals[5].subCategory[2].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Cleaning Supplies") {
					this.expensesCategoryTotals[5].subCategory[3].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Tools") {
					this.expensesCategoryTotals[5].subCategory[4].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Furniture") {
					this.expensesCategoryTotals[5].subCategory[5].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Decorating") {
					this.expensesCategoryTotals[5].subCategory[6].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Home Improvement") {
					this.expensesCategoryTotals[5].subCategory[7].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Home Repair") {
					this.expensesCategoryTotals[5].subCategory[8].total += this.allExpenses[i].amount;
				}
			};
			if (this.allExpenses[i].category === "Medical") {
				this.expensesCategoryTotals[6].total += this.allExpenses[i].amount;	
				if (this.allExpenses[i].subCategory === "Primary Care") {
					this.expensesCategoryTotals[6].subCategory[0].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Dental Care") {
					this.expensesCategoryTotals[6].subCategory[1].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Specialty Care") {
					this.expensesCategoryTotals[6].subCategory[2].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Medications") {
					this.expensesCategoryTotals[6].subCategory[3].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Medical Devices") {
					this.expensesCategoryTotals[6].subCategory[4].total += this.allExpenses[i].amount;
				}
			};
			if (this.allExpenses[i].category === "Personal") {
				this.expensesCategoryTotals[7].total += this.allExpenses[i].amount;	
				if (this.allExpenses[i].subCategory === "Hair & Hair Cuts") {
					this.expensesCategoryTotals[7].subCategory[0].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Salon Services") {
					this.expensesCategoryTotals[7].subCategory[1].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Cosmetics") {
					this.expensesCategoryTotals[7].subCategory[2].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Babysitter") {
					this.expensesCategoryTotals[7].subCategory[3].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Laundry") {
					this.expensesCategoryTotals[7].subCategory[2].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Spa & Massage") {
					this.expensesCategoryTotals[7].subCategory[3].total += this.allExpenses[i].amount;
				}
			};
			if (this.allExpenses[i].category === "Play") {
				this.expensesCategoryTotals[8].total += this.allExpenses[i].amount;	
				if (this.allExpenses[i].subCategory === "Movies") {
					this.expensesCategoryTotals[8].subCategory[0].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Clubs / Bars") {
					this.expensesCategoryTotals[8].subCategory[1].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Entertainment") {
					this.expensesCategoryTotals[8].subCategory[2].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Games") {
					this.expensesCategoryTotals[8].subCategory[3].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Vacations") {
					this.expensesCategoryTotals[8].subCategory[4].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Sporting Events") {
					this.expensesCategoryTotals[8].subCategory[5].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Amusement Park") {
					this.expensesCategoryTotals[8].subCategory[6].total += this.allExpenses[i].amount;
				}
			};
			if (this.allExpenses[i].category === "Events") {
				this.expensesCategoryTotals[9].total += this.allExpenses[i].amount;	
				if (this.allExpenses[i].subCategory === "Moving") {
					this.expensesCategoryTotals[9].subCategory[0].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Wedding") {
					this.expensesCategoryTotals[9].subCategory[1].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Birthday parties") {
					this.expensesCategoryTotals[9].subCategory[2].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Baby showers") {
					this.expensesCategoryTotals[9].subCategory[3].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Special events") {
					this.expensesCategoryTotals[9].subCategory[4].total += this.allExpenses[i].amount;
				}
			};
			if (this.allExpenses[i].category === "Transportation") {
				this.expensesCategoryTotals[10].total += this.allExpenses[i].amount;	
				if (this.allExpenses[i].subCategory === "Fuel") {
					this.expensesCategoryTotals[10].subCategory[0].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Tires") {
					this.expensesCategoryTotals[10].subCategory[1].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Oil Changes") {
					this.expensesCategoryTotals[10].subCategory[2].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Maintenance") {
					this.expensesCategoryTotals[10].subCategory[3].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Parking Fees") {
					this.expensesCategoryTotals[10].subCategory[4].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Repairs") {
					this.expensesCategoryTotals[10].subCategory[5].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "DMV Fees") {
					this.expensesCategoryTotals[10].subCategory[6].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Vehicle Replacement") {
					this.expensesCategoryTotals[10].subCategory[7].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Taxi") {
					this.expensesCategoryTotals[10].subCategory[8].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Public Transportation") {
					this.expensesCategoryTotals[10].subCategory[9].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Tolls") {
					this.expensesCategoryTotals[10].subCategory[10].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Auto Payment") {
					this.expensesCategoryTotals[10].subCategory[11].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Auto Insurance") {
					this.expensesCategoryTotals[10].subCategory[12].total += this.allExpenses[i].amount;
				}
			};
			if (this.allExpenses[i].category === "Travel") {
				this.expensesCategoryTotals[11].total += this.allExpenses[i].amount;	
				if (this.allExpenses[i].subCategory === "Air Travel") {
					this.expensesCategoryTotals[11].subCategory[0].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Hotel") {
					this.expensesCategoryTotals[11].subCategory[1].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Rental Car & Taxi") {
					this.expensesCategoryTotals[11].subCategory[2].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Vacations") {
					this.expensesCategoryTotals[11].subCategory[3].total += this.allExpenses[i].amount;
				}
			};
			if (this.allExpenses[i].category === "Pets") {
				this.expensesCategoryTotals[12].total += this.allExpenses[i].amount;	
				if (this.allExpenses[i].subCategory === "Pet Food & Supplies") {
					this.expensesCategoryTotals[12].subCategory[0].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Pet Grooming") {
					this.expensesCategoryTotals[12].subCategory[1].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Veterinary") {
					this.expensesCategoryTotals[12].subCategory[2].total += this.allExpenses[i].amount;
				}
			};
			if (this.allExpenses[i].category === "Kids") {
				this.expensesCategoryTotals[13].total += this.allExpenses[i].amount;	
				if (this.allExpenses[i].subCategory === "Allowance") {
					this.expensesCategoryTotals[13].subCategory[0].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Baby Supplies") {
					this.expensesCategoryTotals[13].subCategory[1].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Babysitter & Daycare") {
					this.expensesCategoryTotals[13].subCategory[2].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Child Support") {
					this.expensesCategoryTotals[13].subCategory[3].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Kids Activities") {
					this.expensesCategoryTotals[13].subCategory[4].total += this.allExpenses[i].amount;
				}
				if (this.allExpenses[i].subCategory === "Toys") {
					this.expensesCategoryTotals[13].subCategory[5].total += this.allExpenses[i].amount;
				}
			};
			if (this.allExpenses[i].category === "Miscellaneous") {
				this.expensesCategoryTotals[14].total += this.allExpenses[i].amount;	
				if (this.allExpenses[i].subCategory === "Day-To-Day Expenses") {
					this.expensesCategoryTotals[14].subCategory[0].total += this.allExpenses[i].amount;
				}
			};
		};

		//donut chart
		this.doughnutChartLabels.length = 0
		this.doughnutChartData.length = 0
		for (let i = 0; i < this.expensesCategoryTotals.length; i++){
			if( this.expensesCategoryTotals[i].total > 0 ){
				this.doughnutChartLabels.push(this.expensesCategoryTotals[i].category);
				this.doughnutChartData.push(this.expensesCategoryTotals[i].total);									
			};		
		};
		// This took me many hours to get working
		// Be careful before changing
		// I believe this.isDataAvailable = true gets the element on the DOM then the if statement below that updates that element.
		this.isDataAvailable = true;
		if(this.doughnutChartLabels.length>1){
			this._chart.refresh();
		}
	}

	getAllExpenses(){
		this._getBYTUser.getExpensesDuringBudgetPeriod().subscribe( (user:any) => {
			this.allExpenses = user.monthlyExpensesDuringBudgetPeriod;
			this.allExpensesLength = user.monthlyExpensesDuringBudgetPeriod.length;
			this.expensesCategoryTotals = 
			[{
				category: "Clothing",
				total: 0,
				show: true,
				subCategory: [{
					name: "Children's Clothing",
					total: 0
				},
				{
					name: "Adult's Clothing",
					total: 0	
				}]
			},
			{
				category: "Education",
				total: 0,
				show: true,
				subCategory: [{
					name: "Tuition",
					total: 0
				},
				{
					name: "Books",
					total: 0	
				},
				{
					name: "School Supplies",
					total: 0		
				},
				{
					name: "Field Trips",
					total: 0	
				},
				{
					name: "Student Loan Payment",
					total: 0
				},
				{
					name: "Magazines",
					total: 0
				}]
			},
			{
				category: "Food",
				total: 0,
				show: true,
				subCategory: [{
					name: "Groceries",
					total: 0 
				},
				{
					name: "Restaurant",
					total: 0 
				},
				{
					name: "Pet Food",
					total: 0
				},
				{
					name: "Junk Food",
					total: 0
				},
				{
					name: "Coffee",
					total: 0	
				}]
			},
			{
				category: "Gift",
				total: 0,
				show: true,
				subCategory: [{
					name: "Birthday",
					total: 0 
				},
				{
					name: "Valentine's Day",
					total: 0 
				},
				{
					name: "Anniversary",
					total: 0
				},
				{
					name: "Wedding",
					total: 0
				},
				{
					name: "Christmas",
					total: 0	
				},
				{
					name: "Special Occasion",
					total: 0	
				}]
			},
			{
			category: "Giving",
			total: 0,
			show: true,
			subCategory: [{
					name: "Tithing",
					total: 0 
				},
				{
					name: "Offerings",
					total: 0 
				},
				{
					name: "Charities",
					total: 0
				},
				{
					name: "Family",
					total: 0
				}]
			},
			{ 
				category: "Household",
				total: 0,
				show: true,
				subCategory: [{
					name: "Toiletries",
					total: 0 
				},
				{
					name: "Laundry Detergent",
					total: 0 
				},
				{
					name: "Dishwasher Detergent",
					total: 0
				},
				{
					name: "Cleaning Supplies",
					total: 0
				},
				{
					name: "Tools",
					total: 0	
				},
				{
					name: "Furniture",
					total: 0	
				},
				{
					name: "Decorating",
					total: 0	
				},
				{
					name: "Home Improvement",
					total: 0	
				},
				{
					name: "Home Repair",
					total: 0	
				}]
			},
			{
				category: "Medical",
				total: 0,
				show: true,
				subCategory: [{
					name: "Primary Care",
					total: 0 
				},
				{
					name: "Dental Care",
					total: 0 
				},
				{
					name: "Specialty Care",
					total: 0
				},
				{
					name: "Medications",
					total: 0
				},
				{
					name: "Medical Devices",
					total: 0	
				}]
			},
			{
				category: "Personal",
				total: 0,
				show: true,
				subCategory: [{
					name: "Hair & Hair Cuts",
					total: 0 
				},
				{
					name: "Salon Services",
					total: 0 
				},
				{
					name: "Cosmetics",
					total: 0
				},
				{
					name: "Babysitter",
					total: 0
				},
				{
					name: "Laundry",
					total: 0
				},
				{
					name: "Spa & Massage",
					total: 0
				}]
			},
			{
				category: "Play",
				total: 0,
				show: true,
				subCategory: [{
					name: "Movies",
					total: 0 
				},
				{
					name: "Clubs / Bars",
					total: 0 
				},
				{
					name: "Entertainment",
					total: 0
				},
				{
					name: "Games",
					total: 0
				},
				{
					name: "Vacations",
					total: 0
				},
				{
					name: "Sporting Events",
					total: 0
				},
				{
					name: "Amusement Park",
					total: 0
				}]
			},
			{ 
				category: "Events",
				total: 0,
				show: true,
				subCategory: [{
					name: "Moving",
					total: 0 
				},
				{
					name: "Wedding",
					total: 0 
				},
				{
					name: "Birthday parties",
					total: 0 
				},
				{
					name: "Baby showers",
					total: 0 
				},
				{
					name: "Special events",
					total: 0 
				}]
			},
			{ 
				category: "Transportation",
				total: 0,
				show: true,
				subCategory: [{
					name: "Fuel",
					total: 0 
				},
				{
					name: "Tires",
					total: 0 
				},
				{
					name: "Oil Changes",
					total: 0
				},
				{
					name: "Maintenance",
					total: 0
				},
				{
					name: "Parking Fees",
					total: 0
				},
				{
					name: "Repairs",
					total: 0
				},
				{
					name: "DMV Fees",
					total: 0
				},
				{
					name: "Vehicle Replacement",
					total: 0
				},
				{
					name: "Taxi",
					total: 0
				},
				{
					name: "Public Transportation",
					total: 0
				},
				{
					name: "Tolls",
					total: 0
				},
				{
					name: "Auto Payment",
					total: 0
				},
				{
					name: "Auto Insurance",
					total: 0
				}]
			},
			{ 
				category: "Travel",
				total: 0,
				show: true,
				subCategory: [{
					name: "Air Travel",
					total: 0 
				},
				{
					name: "Hotel",
					total: 0 
				},
				{
					name: "Rental Car & Taxi",
					total: 0
				},
				{
					name: "Vacations",
					total: 0
				}]
			},
			{ 
				category: "Pets",
				total: 0,
				show: true,
				subCategory: [{
					name: "Pet Food & Supplies",
					total: 0 
				},
				{
					name: "Pet Grooming",
					total: 0 
				},
				{
					name: "Veterinary",
					total: 0
				}]
			},
			{ 
				category: "Kids",
				total: 0,
				show: true,
				subCategory: [{
					name: "Allowance",
					total: 0 
				},
				{
					name: "Baby Supplies",
					total: 0 
				},
				{
					name: "Babysitter & Daycare",
					total: 0
				},
				{
					name: "Child Support",
					total: 0
				},
				{
					name: "Kids Activities",
					total: 0
				},
				{
					name: "Toys",
					total: 0
				}]
			},
			{ 
				category: "Miscellaneous",
				total: 0,
				show: true,
				subCategory: [{
					name: "Day-To-Day Expenses",
					total: 0 
				}]
			}]
			
			for (let i = 0; i < this.allExpenses.length; i++){
				if (this.allExpenses[i].category === "Clothing") {
					this.expensesCategoryTotals[0].total += this.allExpenses[i].amount;
					if (this.allExpenses[i].subCategory === "Children's Clothing") {
						this.expensesCategoryTotals[0].subCategory[0].total += this.allExpenses[i].amount;
					}
					if (this.allExpenses[i].subCategory === "Adult's Clothing") {
						this.expensesCategoryTotals[0].subCategory[1].total += this.allExpenses[i].amount;
					}
				};
				if (this.allExpenses[i].category === "Education") {
					this.expensesCategoryTotals[1].total += this.allExpenses[i].amount;	
					if (this.allExpenses[i].subCategory === "Tuition") {
						this.expensesCategoryTotals[1].subCategory[0].total += this.allExpenses[i].amount;
					}
					if (this.allExpenses[i].subCategory === "Books") {
						this.expensesCategoryTotals[1].subCategory[1].total += this.allExpenses[i].amount;
					}
					if (this.allExpenses[i].subCategory === "School Supplies") {
						this.expensesCategoryTotals[1].subCategory[2].total += this.allExpenses[i].amount;
					}
					if (this.allExpenses[i].subCategory === "Field Trips") {
						this.expensesCategoryTotals[1].subCategory[3].total += this.allExpenses[i].amount;
					}
					if (this.allExpenses[i].subCategory === "Student Loan Payment") {
						this.expensesCategoryTotals[1].subCategory[4].total += this.allExpenses[i].amount;
					}
					if (this.allExpenses[i].subCategory === "Magazines") {
						this.expensesCategoryTotals[1].subCategory[5].total += this.allExpenses[i].amount;
					}
				};
				if (this.allExpenses[i].category === "Food") {
					this.expensesCategoryTotals[2].total += this.allExpenses[i].amount;	
					if (this.allExpenses[i].subCategory === "Groceries") {
						this.expensesCategoryTotals[2].subCategory[0].total += this.allExpenses[i].amount;
					}
					if (this.allExpenses[i].subCategory === "Restaurant") {
						this.expensesCategoryTotals[2].subCategory[1].total += this.allExpenses[i].amount;
					}
					if (this.allExpenses[i].subCategory === "Pet Food") {
						this.expensesCategoryTotals[2].subCategory[2].total += this.allExpenses[i].amount;
					}
					if (this.allExpenses[i].subCategory === "Junk Food") {
						this.expensesCategoryTotals[2].subCategory[3].total += this.allExpenses[i].amount;
					}
					if (this.allExpenses[i].subCategory === "Coffee") {
						this.expensesCategoryTotals[2].subCategory[4].total += this.allExpenses[i].amount;
					}
				};
				if (this.allExpenses[i].category === "Gift") {
					this.expensesCategoryTotals[3].total += this.allExpenses[i].amount;	
					if (this.allExpenses[i].subCategory === "Birthday") {
						this.expensesCategoryTotals[3].subCategory[0].total += this.allExpenses[i].amount;
					}
					if (this.allExpenses[i].subCategory === "Valentine's Day") {
						this.expensesCategoryTotals[3].subCategory[1].total += this.allExpenses[i].amount;
					}
					if (this.allExpenses[i].subCategory === "Anniversary") {
						this.expensesCategoryTotals[3].subCategory[2].total += this.allExpenses[i].amount;
					}
					if (this.allExpenses[i].subCategory === "Wedding") {
						this.expensesCategoryTotals[3].subCategory[3].total += this.allExpenses[i].amount;
					}
					if (this.allExpenses[i].subCategory === "Christmas") {
						this.expensesCategoryTotals[3].subCategory[4].total += this.allExpenses[i].amount;
					}
					if (this.allExpenses[i].subCategory === "Special Occasion") {
						this.expensesCategoryTotals[3].subCategory[5].total += this.allExpenses[i].amount;
					}
				};
				if (this.allExpenses[i].category === "Giving") {
					this.expensesCategoryTotals[4].total += this.allExpenses[i].amount;	
					if (this.allExpenses[i].subCategory === "Tithing") {
						this.expensesCategoryTotals[4].subCategory[0].total += this.allExpenses[i].amount;
					}
					if (this.allExpenses[i].subCategory === "Offerings") {
						this.expensesCategoryTotals[4].subCategory[1].total += this.allExpenses[i].amount;
					}
					if (this.allExpenses[i].subCategory === "Charities") {
						this.expensesCategoryTotals[4].subCategory[2].total += this.allExpenses[i].amount;
					}
					if (this.allExpenses[i].subCategory === "Family") {
						this.expensesCategoryTotals[4].subCategory[3].total += this.allExpenses[i].amount;
					}
				};
				if (this.allExpenses[i].category === "Household") {
					this.expensesCategoryTotals[5].total += this.allExpenses[i].amount;	
					if (this.allExpenses[i].subCategory === "Toiletries") {
						this.expensesCategoryTotals[5].subCategory[0].total += this.allExpenses[i].amount;
					}
					if (this.allExpenses[i].subCategory === "Laundry Detergent") {
						this.expensesCategoryTotals[5].subCategory[1].total += this.allExpenses[i].amount;
					}
					if (this.allExpenses[i].subCategory === "Dishwasher Detergent") {
						this.expensesCategoryTotals[5].subCategory[2].total += this.allExpenses[i].amount;
					}
					if (this.allExpenses[i].subCategory === "Cleaning Supplies") {
						this.expensesCategoryTotals[5].subCategory[3].total += this.allExpenses[i].amount;
					}
					if (this.allExpenses[i].subCategory === "Tools") {
						this.expensesCategoryTotals[5].subCategory[4].total += this.allExpenses[i].amount;
					}
					if (this.allExpenses[i].subCategory === "Furniture") {
						this.expensesCategoryTotals[5].subCategory[5].total += this.allExpenses[i].amount;
					}
					if (this.allExpenses[i].subCategory === "Decorating") {
						this.expensesCategoryTotals[5].subCategory[6].total += this.allExpenses[i].amount;
					}
					if (this.allExpenses[i].subCategory === "Home Improvement") {
						this.expensesCategoryTotals[5].subCategory[7].total += this.allExpenses[i].amount;
					}
					if (this.allExpenses[i].subCategory === "Home Repair") {
						this.expensesCategoryTotals[5].subCategory[8].total += this.allExpenses[i].amount;
					}
				};
				if (this.allExpenses[i].category === "Medical") {
					this.expensesCategoryTotals[6].total += this.allExpenses[i].amount;	
					if (this.allExpenses[i].subCategory === "Primary Care") {
						this.expensesCategoryTotals[6].subCategory[0].total += this.allExpenses[i].amount;
					}
					if (this.allExpenses[i].subCategory === "Dental Care") {
						this.expensesCategoryTotals[6].subCategory[1].total += this.allExpenses[i].amount;
					}
					if (this.allExpenses[i].subCategory === "Specialty Care") {
						this.expensesCategoryTotals[6].subCategory[2].total += this.allExpenses[i].amount;
					}
					if (this.allExpenses[i].subCategory === "Medications") {
						this.expensesCategoryTotals[6].subCategory[3].total += this.allExpenses[i].amount;
					}
					if (this.allExpenses[i].subCategory === "Medical Devices") {
						this.expensesCategoryTotals[6].subCategory[4].total += this.allExpenses[i].amount;
					}
				};
				if (this.allExpenses[i].category === "Personal") {
					this.expensesCategoryTotals[7].total += this.allExpenses[i].amount;	
					if (this.allExpenses[i].subCategory === "Hair & Hair Cuts") {
						this.expensesCategoryTotals[7].subCategory[0].total += this.allExpenses[i].amount;
					}
					if (this.allExpenses[i].subCategory === "Salon Services") {
						this.expensesCategoryTotals[7].subCategory[1].total += this.allExpenses[i].amount;
					}
					if (this.allExpenses[i].subCategory === "Cosmetics") {
						this.expensesCategoryTotals[7].subCategory[2].total += this.allExpenses[i].amount;
					}
					if (this.allExpenses[i].subCategory === "Babysitter") {
						this.expensesCategoryTotals[7].subCategory[3].total += this.allExpenses[i].amount;
					}
					if (this.allExpenses[i].subCategory === "Laundry") {
						this.expensesCategoryTotals[7].subCategory[2].total += this.allExpenses[i].amount;
					}
					if (this.allExpenses[i].subCategory === "Spa & Massage") {
						this.expensesCategoryTotals[7].subCategory[3].total += this.allExpenses[i].amount;
					}
				};
				if (this.allExpenses[i].category === "Play") {
					this.expensesCategoryTotals[8].total += this.allExpenses[i].amount;	
					if (this.allExpenses[i].subCategory === "Movies") {
						this.expensesCategoryTotals[8].subCategory[0].total += this.allExpenses[i].amount;
					}
					if (this.allExpenses[i].subCategory === "Clubs / Bars") {
						this.expensesCategoryTotals[8].subCategory[1].total += this.allExpenses[i].amount;
					}
					if (this.allExpenses[i].subCategory === "Entertainment") {
						this.expensesCategoryTotals[8].subCategory[2].total += this.allExpenses[i].amount;
					}
					if (this.allExpenses[i].subCategory === "Games") {
						this.expensesCategoryTotals[8].subCategory[3].total += this.allExpenses[i].amount;
					}
					if (this.allExpenses[i].subCategory === "Vacations") {
						this.expensesCategoryTotals[8].subCategory[4].total += this.allExpenses[i].amount;
					}
					if (this.allExpenses[i].subCategory === "Sporting Events") {
						this.expensesCategoryTotals[8].subCategory[5].total += this.allExpenses[i].amount;
					}
					if (this.allExpenses[i].subCategory === "Amusement Park") {
						this.expensesCategoryTotals[8].subCategory[6].total += this.allExpenses[i].amount;
					}
				};
				if (this.allExpenses[i].category === "Events") {
					this.expensesCategoryTotals[9].total += this.allExpenses[i].amount;	
					if (this.allExpenses[i].subCategory === "Moving") {
						this.expensesCategoryTotals[9].subCategory[0].total += this.allExpenses[i].amount;
					}
					if (this.allExpenses[i].subCategory === "Wedding") {
						this.expensesCategoryTotals[9].subCategory[1].total += this.allExpenses[i].amount;
					}
					if (this.allExpenses[i].subCategory === "Birthday parties") {
						this.expensesCategoryTotals[9].subCategory[2].total += this.allExpenses[i].amount;
					}
					if (this.allExpenses[i].subCategory === "Baby showers") {
						this.expensesCategoryTotals[9].subCategory[3].total += this.allExpenses[i].amount;
					}
					if (this.allExpenses[i].subCategory === "Special events") {
						this.expensesCategoryTotals[9].subCategory[4].total += this.allExpenses[i].amount;
					}
				};
				if (this.allExpenses[i].category === "Transportation") {
					this.expensesCategoryTotals[10].total += this.allExpenses[i].amount;	
					if (this.allExpenses[i].subCategory === "Fuel") {
						this.expensesCategoryTotals[10].subCategory[0].total += this.allExpenses[i].amount;
					}
					if (this.allExpenses[i].subCategory === "Tires") {
						this.expensesCategoryTotals[10].subCategory[1].total += this.allExpenses[i].amount;
					}
					if (this.allExpenses[i].subCategory === "Oil Changes") {
						this.expensesCategoryTotals[10].subCategory[2].total += this.allExpenses[i].amount;
					}
					if (this.allExpenses[i].subCategory === "Maintenance") {
						this.expensesCategoryTotals[10].subCategory[3].total += this.allExpenses[i].amount;
					}
					if (this.allExpenses[i].subCategory === "Parking Fees") {
						this.expensesCategoryTotals[10].subCategory[4].total += this.allExpenses[i].amount;
					}
					if (this.allExpenses[i].subCategory === "Repairs") {
						this.expensesCategoryTotals[10].subCategory[5].total += this.allExpenses[i].amount;
					}
					if (this.allExpenses[i].subCategory === "DMV Fees") {
						this.expensesCategoryTotals[10].subCategory[6].total += this.allExpenses[i].amount;
					}
					if (this.allExpenses[i].subCategory === "Vehicle Replacement") {
						this.expensesCategoryTotals[10].subCategory[7].total += this.allExpenses[i].amount;
					}
					if (this.allExpenses[i].subCategory === "Taxi") {
						this.expensesCategoryTotals[10].subCategory[8].total += this.allExpenses[i].amount;
					}
					if (this.allExpenses[i].subCategory === "Public Transportation") {
						this.expensesCategoryTotals[10].subCategory[9].total += this.allExpenses[i].amount;
					}
					if (this.allExpenses[i].subCategory === "Tolls") {
						this.expensesCategoryTotals[10].subCategory[10].total += this.allExpenses[i].amount;
					}
					if (this.allExpenses[i].subCategory === "Auto Payment") {
						this.expensesCategoryTotals[10].subCategory[11].total += this.allExpenses[i].amount;
					}
					if (this.allExpenses[i].subCategory === "Auto Insurance") {
						this.expensesCategoryTotals[10].subCategory[12].total += this.allExpenses[i].amount;
					}
				};
				if (this.allExpenses[i].category === "Travel") {
					this.expensesCategoryTotals[11].total += this.allExpenses[i].amount;	
					if (this.allExpenses[i].subCategory === "Air Travel") {
						this.expensesCategoryTotals[11].subCategory[0].total += this.allExpenses[i].amount;
					}
					if (this.allExpenses[i].subCategory === "Hotel") {
						this.expensesCategoryTotals[11].subCategory[1].total += this.allExpenses[i].amount;
					}
					if (this.allExpenses[i].subCategory === "Rental Car & Taxi") {
						this.expensesCategoryTotals[11].subCategory[2].total += this.allExpenses[i].amount;
					}
					if (this.allExpenses[i].subCategory === "Vacations") {
						this.expensesCategoryTotals[11].subCategory[3].total += this.allExpenses[i].amount;
					}
				};
				if (this.allExpenses[i].category === "Pets") {
					this.expensesCategoryTotals[12].total += this.allExpenses[i].amount;	
					if (this.allExpenses[i].subCategory === "Pet Food & Supplies") {
						this.expensesCategoryTotals[12].subCategory[0].total += this.allExpenses[i].amount;
					}
					if (this.allExpenses[i].subCategory === "Pet Grooming") {
						this.expensesCategoryTotals[12].subCategory[1].total += this.allExpenses[i].amount;
					}
					if (this.allExpenses[i].subCategory === "Veterinary") {
						this.expensesCategoryTotals[12].subCategory[2].total += this.allExpenses[i].amount;
					}
				};
				if (this.allExpenses[i].category === "Kids") {
					this.expensesCategoryTotals[13].total += this.allExpenses[i].amount;	
					if (this.allExpenses[i].subCategory === "Allowance") {
						this.expensesCategoryTotals[13].subCategory[0].total += this.allExpenses[i].amount;
					}
					if (this.allExpenses[i].subCategory === "Baby Supplies") {
						this.expensesCategoryTotals[13].subCategory[1].total += this.allExpenses[i].amount;
					}
					if (this.allExpenses[i].subCategory === "Babysitter & Daycare") {
						this.expensesCategoryTotals[13].subCategory[2].total += this.allExpenses[i].amount;
					}
					if (this.allExpenses[i].subCategory === "Child Support") {
						this.expensesCategoryTotals[13].subCategory[3].total += this.allExpenses[i].amount;
					}
					if (this.allExpenses[i].subCategory === "Kids Activities") {
						this.expensesCategoryTotals[13].subCategory[4].total += this.allExpenses[i].amount;
					}
					if (this.allExpenses[i].subCategory === "Toys") {
						this.expensesCategoryTotals[13].subCategory[5].total += this.allExpenses[i].amount;
					}
				};
				if (this.allExpenses[i].category === "Miscellaneous") {
					this.expensesCategoryTotals[14].total += this.allExpenses[i].amount;	
					if (this.allExpenses[i].subCategory === "Day-To-Day Expenses") {
						this.expensesCategoryTotals[14].subCategory[0].total += this.allExpenses[i].amount;
					}
				};
			};
			//donut chart
			for (let i = 0; i < this.expensesCategoryTotals.length; i++){
				if( this.expensesCategoryTotals[i].total > 0 ){
					this.doughnutChartLabels.push(this.expensesCategoryTotals[i].category);
					this.doughnutChartData.push(this.expensesCategoryTotals[i].total);									
				};				
  			};  			
  			//donut chart
  			if(this.doughnutChartData.length > 0){
  				this.isDataAvailable = true;
  			} else { 
  				this.isDataAvailable = false;
  			}
		});
	};
	public chartClicked(e:any):void {
		console.log(e);
	}
	public chartHovered(e:any):void {
		console.log(e);
	}
};