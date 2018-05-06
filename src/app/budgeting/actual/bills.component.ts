import {Component, OnInit, ViewChild} from '@angular/core';

import {GetBYTUser} from '../../dashboard/byt-dashboard-overview.service';
import {BYTRemoveTransaction} from "../../dashboard/byt-dashboard-overview.service";
import {BYTLastBillEntryComponent} from './last-bill-entry.component';

/*
All of the bill categories need to update any time that a bill is either added or removed from all bills. Therefore, the billsCategoryTotals object is 
reset then the for loops add up all categories once again. This happens on three occassions. When a bill is added or removed by the user as mentioned above
and when the component is first initialized.
*/

@Component({
	selector: 'byt-bills',
	templateUrl: './bills.component.html',
	styleUrls: ['./bills.component.css']
})
export class BYTBillsComponent implements OnInit {
	allBills: any[];
	billsCategoryTotals: any[] = 
	[{
		category: "Housing",
		total: 0,
		show: true,
		subCategory: [{
			name: "Rent",
			total: 0
		},
		{
			name: "Mortgage",
			total: 0	
		},
		{
			name: "Vacation home",
			total: 0	
		}]
	},
	{
		category: "Health",
		total: 0,
		show: true,
		subCategory: [{
			name: "Gym",
			total: 0
		},
		{
			name: "Yoga",
			total: 0	
		},
		{
			name: "Pilates",
			total: 0		
		},
		{
			name: "Boxing",
			total: 0	
		},
		{
			name: "Martial arts",
			total: 0
		},
		{
			name: "Health Insurance",
			total: 0
		},
		{
			name: "Pharmacy",
			total: 0
		},
		{
			name: "Eyecare",
			total: 0
		},
		{
			name: "Doctor",
			total: 0
		},
		{
			name: "Dentist",
			total: 0
		}]
	},
	{
		category: "Transportation",
		total: 0,
		show: true,
		subCategory: [{
			name: "Metro Card",
			total: 0 
		},
		{
			name: "EZ Pass",
			total: 0 
		},
		{
			name: "Gas",
			total: 0
		},
		{
			name: "Parking",
			total: 0
		}]
	},
	{
		category: "Utilities",
		total: 0,
		show: true,
		subCategory: [{
			name: "Electric",
			total: 0 
		},
		{
			name: "Water",
			total: 0 
		},
		{
			name: "Garbage",
			total: 0
		},
		{
			name: "Home/Cell phone",
			total: 0
		},
		{
			name: "Internet",
			total: 0	
		}]
	},
	{
		category: "Insurance",
		total: 0,
		show: true,
		subCategory: [{
			name: "Car insurance",
			total: 0 
		},
		{
			name: "Homeowner's insurance",
			total: 0 
		},
		{
			name: "Renter's insurance",
			total: 0
		},
		{
			name: "Life insurance",
			total: 0
		}]
	},
	{ 
		category: "Debt",
		total: 0,
		show: true,
		subCategory: [{
			name: "Credit card",
			total: 0 
		},
		{
			name: "Student loan",
			total: 0 
		},
		{
			name: "Personal loan",
			total: 0
		},
		{
			name: "Car loan",
			total: 0
		},
		{
			name: "Medical",
			total: 0
		}]
	},
	{
		category: "Taxes",
		total: 0,
		show: true,
		subCategory: [{
			name: "Personal",
			total: 0 
		},
		{
			name: "Business",
			total: 0 
		},
		{
			name: "House",
			total: 0
		}]
	},
	{
		category: "Entertainment",
		total: 0,
		show: true,
		subCategory: [{
			name: "Streaming movies/music",
			total: 0 
		},
		{
			name: "Monthly subscriptions",
			total: 0 
		}]
	},
	{
		category: "ChildCare",
		total: 0,
		show: true,
		subCategory: [{
			name: "Babysitter",
			total: 0 
		},
		{
			name: "Daycare",
			total: 0 
		},
		{
			name: "After School Programs",
			total: 0 
		},
		{
			name: "Youth Leagues",
			total: 0 
		},
		{
			name: "Medical",
			total: 0 
		},
		{
			name: "Nutrition",
			total: 0 
		}]
	},
	{
		category: "Miscellaneous",
		total: 0,
		show: true,
		subCategory: [{
			name: "Small / Unforeseen Bill",
			total: 0 
		}]
	}];
	byt_active: boolean = true;
	isRequesting: boolean;
	allBillsLength: number;
	totalSpentOnBills: number;

	@ViewChild(BYTLastBillEntryComponent) _lastBillEntry: BYTLastBillEntryComponent;

	constructor (private _getBYTUser: GetBYTUser, private _bytRemoveTransaction: BYTRemoveTransaction) {}

	ngOnInit(){
		this.getAllBills();
	};

	removeBill(index){
		this.allBills.splice(index, 1);
		this.billsCategoryTotals = 
		[{
			category: "Housing",
			total: 0,
			show: true,
			subCategory: [{
				name: "Rent",
				total: 0
			},
			{
				name: "Mortgage",
				total: 0	
			},
			{
				name: "Vacation home",
				total: 0	
			}]
		},
		{
			category: "Health",
			total: 0,
			show: true,
			subCategory: [{
				name: "Gym",
				total: 0
			},
			{
				name: "Yoga",
				total: 0	
			},
			{
				name: "Pilates",
				total: 0		
			},
			{
				name: "Boxing",
				total: 0	
			},
			{
				name: "Martial arts",
				total: 0
			},
			{
				name: "Health Insurance",
				total: 0
			},
			{
				name: "Pharmacy",
				total: 0
			},
			{
				name: "Eyecare",
				total: 0
			},
			{
				name: "Doctor",
				total: 0
			},
			{
				name: "Dentist",
				total: 0
			}]
		},
		{
			category: "Transportation",
			total: 0,
			show: true,
			subCategory: [{
				name: "Metro Card",
				total: 0 
			},
			{
				name: "EZ Pass",
				total: 0 
			},
			{
				name: "Gas",
				total: 0
			},
			{
				name: "Parking",
				total: 0
			}]
		},
		{
			category: "Utilities",
			total: 0,
			show: true,
			subCategory: [{
				name: "Electric",
				total: 0 
			},
			{
				name: "Water",
				total: 0 
			},
			{
				name: "Garbage",
				total: 0
			},
			{
				name: "Home/Cell phone",
				total: 0
			},
			{
				name: "Internet",
				total: 0	
			}]
		},
		{
			category: "Insurance",
			total: 0,
			show: true,
			subCategory: [{
				name: "Car insurance",
				total: 0 
			},
			{
				name: "Homeowner's insurance",
				total: 0 
			},
			{
				name: "Renter's insurance",
				total: 0
			},
			{
				name: "Life insurance",
				total: 0
			}]
		},
		{ 
			category: "Debt",
			total: 0,
			show: true,
			subCategory: [{
				name: "Credit card",
				total: 0 
			},
			{
				name: "Student loan",
				total: 0 
			},
			{
				name: "Personal loan",
				total: 0
			},
			{
				name: "Car loan",
				total: 0
			},
			{
				name: "Medical",
				total: 0
			}]
		},
		{
			category: "Taxes",
			total: 0,
			show: true,
			subCategory: [{
				name: "Personal",
				total: 0 
			},
			{
				name: "Business",
				total: 0 
			},
			{
				name: "House",
				total: 0
			}]
		},
		{
			category: "Entertainment",
			total: 0,
			show: true,
			subCategory: [{
				name: "Streaming movies/music",
				total: 0 
			},
			{
				name: "Monthly subscriptions",
				total: 0 
			}]
		},
		{
			category: "ChildCare",
			total: 0,
			show: true,
			subCategory: [{
				name: "Babysitter",
				total: 0 
			},
			{
				name: "Daycare",
				total: 0 
			},
			{
				name: "After School Programs",
				total: 0 
			},
			{
				name: "Youth Leagues",
				total: 0 
			},
			{
				name: "Medical",
				total: 0 
			},
			{
				name: "Nutrition",
				total: 0 
			}]
		},
		{
			category: "Miscellaneous",
			total: 0,
			show: true,
			subCategory: [{
				name: "Small / Unforeseen Bill",
				total: 0 
			}]
		}];
		
		for (let i = 0; i < this.allBills.length; i++){
			if (this.allBills[i].category === "Housing") {
				this.billsCategoryTotals[0].total += this.allBills[i].amount;	
				if (this.allBills[i].subCategory === "Rent") {
					this.billsCategoryTotals[0].subCategory[0].total += this.allBills[i].amount;
				}
				if (this.allBills[i].subCategory === "Mortgage") {
					this.billsCategoryTotals[0].subCategory[1].total += this.allBills[i].amount;
				}
				if (this.allBills[i].subCategory === "Vacation home") {
					this.billsCategoryTotals[0].subCategory[2].total += this.allBills[i].amount;
				}
			};
			if (this.allBills[i].category === "Health") {
				this.billsCategoryTotals[1].total += this.allBills[i].amount;	
				if (this.allBills[i].subCategory === "Gym") {
					this.billsCategoryTotals[1].subCategory[0].total += this.allBills[i].amount;
				}
				if (this.allBills[i].subCategory === "Yoga") {
					this.billsCategoryTotals[1].subCategory[1].total += this.allBills[i].amount;
				}
				if (this.allBills[i].subCategory === "Pilates") {
					this.billsCategoryTotals[1].subCategory[2].total += this.allBills[i].amount;
				}
				if (this.allBills[i].subCategory === "Boxing") {
					this.billsCategoryTotals[1].subCategory[3].total += this.allBills[i].amount;
				}
				if (this.allBills[i].subCategory === "Martial arts") {
					this.billsCategoryTotals[1].subCategory[4].total += this.allBills[i].amount;
				}
				if (this.allBills[i].subCategory === "Health Insurance") {
					this.billsCategoryTotals[1].subCategory[5].total += this.allBills[i].amount;
				}
				if (this.allBills[i].subCategory === "Pharmacy") {
					this.billsCategoryTotals[1].subCategory[6].total += this.allBills[i].amount;
				}
				if (this.allBills[i].subCategory === "Eyecare") {
					this.billsCategoryTotals[1].subCategory[7].total += this.allBills[i].amount;
				}
				if (this.allBills[i].subCategory === "Doctor") {
					this.billsCategoryTotals[1].subCategory[8].total += this.allBills[i].amount;
				}
				if (this.allBills[i].subCategory === "Dentist") {
					this.billsCategoryTotals[1].subCategory[9].total += this.allBills[i].amount;
				}
			};
			if (this.allBills[i].category === "Transportation") {
				this.billsCategoryTotals[2].total += this.allBills[i].amount;	
				if (this.allBills[i].subCategory === "Metro Card") {
					this.billsCategoryTotals[2].subCategory[0].total += this.allBills[i].amount;
				}
				if (this.allBills[i].subCategory === "EZ Pass") {
					this.billsCategoryTotals[2].subCategory[1].total += this.allBills[i].amount;
				}
				if (this.allBills[i].subCategory === "Gas") {
					this.billsCategoryTotals[2].subCategory[2].total += this.allBills[i].amount;
				}
				if (this.allBills[i].subCategory === "Parking") {
					this.billsCategoryTotals[2].subCategory[3].total += this.allBills[i].amount;
				}
			};
			if (this.allBills[i].category === "Utilities") {
				this.billsCategoryTotals[3].total += this.allBills[i].amount;	
				if (this.allBills[i].subCategory === "Electric") {
					this.billsCategoryTotals[3].subCategory[0].total += this.allBills[i].amount;
				}
				if (this.allBills[i].subCategory === "Water") {
					this.billsCategoryTotals[3].subCategory[1].total += this.allBills[i].amount;
				}
				if (this.allBills[i].subCategory === "Garbage") {
					this.billsCategoryTotals[3].subCategory[2].total += this.allBills[i].amount;
				}
				if (this.allBills[i].subCategory === "Home/Cell phone") {
					this.billsCategoryTotals[3].subCategory[3].total += this.allBills[i].amount;
				}
				if (this.allBills[i].subCategory === "Internet") {
					this.billsCategoryTotals[3].subCategory[4].total += this.allBills[i].amount;
				}
			};
			if (this.allBills[i].category === "Insurance") {
				this.billsCategoryTotals[4].total += this.allBills[i].amount;	
				if (this.allBills[i].subCategory === "Car insurance") {
					this.billsCategoryTotals[4].subCategory[0].total += this.allBills[i].amount;
				}
				if (this.allBills[i].subCategory === "Homeowner's insurance") {
					this.billsCategoryTotals[4].subCategory[1].total += this.allBills[i].amount;
				}
				if (this.allBills[i].subCategory === "Renter's insurance") {
					this.billsCategoryTotals[4].subCategory[2].total += this.allBills[i].amount;
				}
				if (this.allBills[i].subCategory === "Life insurance") {
					this.billsCategoryTotals[4].subCategory[3].total += this.allBills[i].amount;
				}
			};
			if (this.allBills[i].category === "Debt") {
				this.billsCategoryTotals[5].total += this.allBills[i].amount;	
				if (this.allBills[i].subCategory === "Credit card") {
					this.billsCategoryTotals[5].subCategory[0].total += this.allBills[i].amount;
				}
				if (this.allBills[i].subCategory === "Student loan") {
					this.billsCategoryTotals[5].subCategory[1].total += this.allBills[i].amount;
				}
				if (this.allBills[i].subCategory === "Personal loan") {
					this.billsCategoryTotals[5].subCategory[2].total += this.allBills[i].amount;
				}
				if (this.allBills[i].subCategory === "Car loan") {
					this.billsCategoryTotals[5].subCategory[3].total += this.allBills[i].amount;
				}
				if (this.allBills[i].subCategory === "Medical") {
					this.billsCategoryTotals[5].subCategory[4].total += this.allBills[i].amount;
				}
			};
			if (this.allBills[i].category === "Taxes") {
				this.billsCategoryTotals[6].total += this.allBills[i].amount;	
				if (this.allBills[i].subCategory === "Personal") {
					this.billsCategoryTotals[6].subCategory[0].total += this.allBills[i].amount;
				}
				if (this.allBills[i].subCategory === "Business") {
					this.billsCategoryTotals[6].subCategory[1].total += this.allBills[i].amount;
				}
				if (this.allBills[i].subCategory === "House") {
					this.billsCategoryTotals[6].subCategory[2].total += this.allBills[i].amount;
				}
			};
			if (this.allBills[i].category === "Entertainment") {
				this.billsCategoryTotals[7].total += this.allBills[i].amount;	
				if (this.allBills[i].subCategory === "Streaming movies/music") {
					this.billsCategoryTotals[7].subCategory[0].total += this.allBills[i].amount;
				}
				if (this.allBills[i].subCategory === "Monthly subscriptions") {
					this.billsCategoryTotals[7].subCategory[1].total += this.allBills[i].amount;
				}
			};
			if (this.allBills[i].category === "ChildCare") {
				this.billsCategoryTotals[8].total += this.allBills[i].amount;	
				if (this.allBills[i].subCategory === "Babysitter") {
					this.billsCategoryTotals[8].subCategory[0].total += this.allBills[i].amount;
				}
				if (this.allBills[i].subCategory === "Daycare") {
					this.billsCategoryTotals[8].subCategory[1].total += this.allBills[i].amount;
				}
				if (this.allBills[i].subCategory === "After School Programs") {
					this.billsCategoryTotals[8].subCategory[2].total += this.allBills[i].amount;
				}
				if (this.allBills[i].subCategory === "Youth Leagues") {
					this.billsCategoryTotals[8].subCategory[3].total += this.allBills[i].amount;
				}
				if (this.allBills[i].subCategory === "Medical") {
					this.billsCategoryTotals[8].subCategory[4].total += this.allBills[i].amount;
				}
				if (this.allBills[i].subCategory === "Nutrition") {
					this.billsCategoryTotals[8].subCategory[5].total += this.allBills[i].amount;
				}
			};
			if (this.allBills[i].category === "Miscellaneous") {
				this.billsCategoryTotals[9].total += this.allBills[i].amount;	
				if (this.allBills[i].subCategory === "Small / Unforeseen Bill") {
					this.billsCategoryTotals[9].subCategory[0].total += this.allBills[i].amount;
				}
			};
		};
		// update the back end with the code just below.
		this._bytRemoveTransaction.bytRemoveBill(index).subscribe(user => {});
		// update the view
		this.allBillsLength = this.allBills.length;
		// update last transaction component
		this._lastBillEntry.updateViewFunction(this.allBills);
		if(this.allBillsLength === 0){
			this.byt_active = true;
		}
	};

	childBillsForm($event: Object){
		this.allBillsLength = 1;
		this.allBills.unshift($event)
		this._lastBillEntry.lastTransactionDateFunction($event);
		this.billsCategoryTotals = 
		[{
			category: "Housing",
			total: 0,
			show: true,
			subCategory: [{
				name: "Rent",
				total: 0
			},
			{
				name: "Mortgage",
				total: 0	
			},
			{
				name: "Vacation home",
				total: 0	
			}]
		},
		{
			category: "Health",
			total: 0,
			show: true,
			subCategory: [{
				name: "Gym",
				total: 0
			},
			{
				name: "Yoga",
				total: 0	
			},
			{
				name: "Pilates",
				total: 0		
			},
			{
				name: "Boxing",
				total: 0	
			},
			{
				name: "Martial arts",
				total: 0
			},
			{
				name: "Health Insurance",
				total: 0
			},
			{
				name: "Pharmacy",
				total: 0
			},
			{
				name: "Eyecare",
				total: 0
			},
			{
				name: "Doctor",
				total: 0
			},
			{
				name: "Dentist",
				total: 0
			}]
		},
		{
			category: "Transportation",
			total: 0,
			show: true,
			subCategory: [{
				name: "Metro Card",
				total: 0 
			},
			{
				name: "EZ Pass",
				total: 0 
			},
			{
				name: "Gas",
				total: 0
			},
			{
				name: "Parking",
				total: 0
			}]
		},
		{
			category: "Utilities",
			total: 0,
			show: true,
			subCategory: [{
				name: "Electric",
				total: 0 
			},
			{
				name: "Water",
				total: 0 
			},
			{
				name: "Garbage",
				total: 0
			},
			{
				name: "Home/Cell phone",
				total: 0
			},
			{
				name: "Internet",
				total: 0	
			}]
		},
		{
			category: "Insurance",
			total: 0,
			show: true,
			subCategory: [{
				name: "Car insurance",
				total: 0 
			},
			{
				name: "Homeowner's insurance",
				total: 0 
			},
			{
				name: "Renter's insurance",
				total: 0
			},
			{
				name: "Life insurance",
				total: 0
			}]
		},
		{ 
			category: "Debt",
			total: 0,
			show: true,
			subCategory: [{
				name: "Credit card",
				total: 0 
			},
			{
				name: "Student loan",
				total: 0 
			},
			{
				name: "Personal loan",
				total: 0
			},
			{
				name: "Car loan",
				total: 0
			},
			{
				name: "Medical",
				total: 0
			}]
		},
		{
			category: "Taxes",
			total: 0,
			show: true,
			subCategory: [{
				name: "Personal",
				total: 0 
			},
			{
				name: "Business",
				total: 0 
			},
			{
				name: "House",
				total: 0
			}]
		},
		{
			category: "Entertainment",
			total: 0,
			show: true,
			subCategory: [{
				name: "Streaming movies/music",
				total: 0 
			},
			{
				name: "Monthly subscriptions",
				total: 0 
			}]
		},
		{
			category: "ChildCare",
			total: 0,
			show: true,
			subCategory: [{
				name: "Babysitter",
				total: 0 
			},
			{
				name: "Daycare",
				total: 0 
			},
			{
				name: "After School Programs",
				total: 0 
			},
			{
				name: "Youth Leagues",
				total: 0 
			},
			{
				name: "Medical",
				total: 0 
			},
			{
				name: "Nutrition",
				total: 0 
			}]
		},
		{
			category: "Miscellaneous",
			total: 0,
			show: true,
			subCategory: [{
				name: "Small / Unforeseen Bill",
				total: 0 
			}]
		}];
		
		for (let i = 0; i < this.allBills.length; i++){
			if (this.allBills[i].category === "Housing") {
				this.billsCategoryTotals[0].total += this.allBills[i].amount;	
				if (this.allBills[i].subCategory === "Rent") {
					this.billsCategoryTotals[0].subCategory[0].total += this.allBills[i].amount;
				}
				if (this.allBills[i].subCategory === "Mortgage") {
					this.billsCategoryTotals[0].subCategory[1].total += this.allBills[i].amount;
				}
				if (this.allBills[i].subCategory === "Vacation home") {
					this.billsCategoryTotals[0].subCategory[2].total += this.allBills[i].amount;
				}
			};
			if (this.allBills[i].category === "Health") {
				this.billsCategoryTotals[1].total += this.allBills[i].amount;	
				if (this.allBills[i].subCategory === "Gym") {
					this.billsCategoryTotals[1].subCategory[0].total += this.allBills[i].amount;
				}
				if (this.allBills[i].subCategory === "Yoga") {
					this.billsCategoryTotals[1].subCategory[1].total += this.allBills[i].amount;
				}
				if (this.allBills[i].subCategory === "Pilates") {
					this.billsCategoryTotals[1].subCategory[2].total += this.allBills[i].amount;
				}
				if (this.allBills[i].subCategory === "Boxing") {
					this.billsCategoryTotals[1].subCategory[3].total += this.allBills[i].amount;
				}
				if (this.allBills[i].subCategory === "Martial arts") {
					this.billsCategoryTotals[1].subCategory[4].total += this.allBills[i].amount;
				}
				if (this.allBills[i].subCategory === "Health Insurance") {
					this.billsCategoryTotals[1].subCategory[5].total += this.allBills[i].amount;
				}
				if (this.allBills[i].subCategory === "Pharmacy") {
					this.billsCategoryTotals[1].subCategory[6].total += this.allBills[i].amount;
				}
				if (this.allBills[i].subCategory === "Eyecare") {
					this.billsCategoryTotals[1].subCategory[7].total += this.allBills[i].amount;
				}
				if (this.allBills[i].subCategory === "Doctor") {
					this.billsCategoryTotals[1].subCategory[8].total += this.allBills[i].amount;
				}
				if (this.allBills[i].subCategory === "Dentist") {
					this.billsCategoryTotals[1].subCategory[9].total += this.allBills[i].amount;
				}
			};
			if (this.allBills[i].category === "Transportation") {
				this.billsCategoryTotals[2].total += this.allBills[i].amount;	
				if (this.allBills[i].subCategory === "Metro Card") {
					this.billsCategoryTotals[2].subCategory[0].total += this.allBills[i].amount;
				}
				if (this.allBills[i].subCategory === "EZ Pass") {
					this.billsCategoryTotals[2].subCategory[1].total += this.allBills[i].amount;
				}
				if (this.allBills[i].subCategory === "Gas") {
					this.billsCategoryTotals[2].subCategory[2].total += this.allBills[i].amount;
				}
				if (this.allBills[i].subCategory === "Parking") {
					this.billsCategoryTotals[2].subCategory[3].total += this.allBills[i].amount;
				}
			};
			if (this.allBills[i].category === "Utilities") {
				this.billsCategoryTotals[3].total += this.allBills[i].amount;	
				if (this.allBills[i].subCategory === "Electric") {
					this.billsCategoryTotals[3].subCategory[0].total += this.allBills[i].amount;
				}
				if (this.allBills[i].subCategory === "Water") {
					this.billsCategoryTotals[3].subCategory[1].total += this.allBills[i].amount;
				}
				if (this.allBills[i].subCategory === "Garbage") {
					this.billsCategoryTotals[3].subCategory[2].total += this.allBills[i].amount;
				}
				if (this.allBills[i].subCategory === "Home/Cell phone") {
					this.billsCategoryTotals[3].subCategory[3].total += this.allBills[i].amount;
				}
				if (this.allBills[i].subCategory === "Internet") {
					this.billsCategoryTotals[3].subCategory[4].total += this.allBills[i].amount;
				}
			};
			if (this.allBills[i].category === "Insurance") {
				this.billsCategoryTotals[4].total += this.allBills[i].amount;	
				if (this.allBills[i].subCategory === "Car insurance") {
					this.billsCategoryTotals[4].subCategory[0].total += this.allBills[i].amount;
				}
				if (this.allBills[i].subCategory === "Homeowner's insurance") {
					this.billsCategoryTotals[4].subCategory[1].total += this.allBills[i].amount;
				}
				if (this.allBills[i].subCategory === "Renter's insurance") {
					this.billsCategoryTotals[4].subCategory[2].total += this.allBills[i].amount;
				}
				if (this.allBills[i].subCategory === "Life insurance") {
					this.billsCategoryTotals[4].subCategory[3].total += this.allBills[i].amount;
				}
			};
			if (this.allBills[i].category === "Debt") {
				this.billsCategoryTotals[5].total += this.allBills[i].amount;	
				if (this.allBills[i].subCategory === "Credit card") {
					this.billsCategoryTotals[5].subCategory[0].total += this.allBills[i].amount;
				}
				if (this.allBills[i].subCategory === "Student loan") {
					this.billsCategoryTotals[5].subCategory[1].total += this.allBills[i].amount;
				}
				if (this.allBills[i].subCategory === "Personal loan") {
					this.billsCategoryTotals[5].subCategory[2].total += this.allBills[i].amount;
				}
				if (this.allBills[i].subCategory === "Car loan") {
					this.billsCategoryTotals[5].subCategory[3].total += this.allBills[i].amount;
				}
				if (this.allBills[i].subCategory === "Medical") {
					this.billsCategoryTotals[5].subCategory[4].total += this.allBills[i].amount;
				}
			};
			if (this.allBills[i].category === "Taxes") {
				this.billsCategoryTotals[6].total += this.allBills[i].amount;	
				if (this.allBills[i].subCategory === "Personal") {
					this.billsCategoryTotals[6].subCategory[0].total += this.allBills[i].amount;
				}
				if (this.allBills[i].subCategory === "Business") {
					this.billsCategoryTotals[6].subCategory[1].total += this.allBills[i].amount;
				}
				if (this.allBills[i].subCategory === "House") {
					this.billsCategoryTotals[6].subCategory[2].total += this.allBills[i].amount;
				}
			};
			if (this.allBills[i].category === "Entertainment") {
				this.billsCategoryTotals[7].total += this.allBills[i].amount;	
				if (this.allBills[i].subCategory === "Streaming movies/music") {
					this.billsCategoryTotals[7].subCategory[0].total += this.allBills[i].amount;
				}
				if (this.allBills[i].subCategory === "Monthly subscriptions") {
					this.billsCategoryTotals[7].subCategory[1].total += this.allBills[i].amount;
				}
			};
			if (this.allBills[i].category === "ChildCare") {
				this.billsCategoryTotals[8].total += this.allBills[i].amount;	
				if (this.allBills[i].subCategory === "Babysitter") {
					this.billsCategoryTotals[8].subCategory[0].total += this.allBills[i].amount;
				}
				if (this.allBills[i].subCategory === "Daycare") {
					this.billsCategoryTotals[8].subCategory[1].total += this.allBills[i].amount;
				}
				if (this.allBills[i].subCategory === "After School Programs") {
					this.billsCategoryTotals[8].subCategory[2].total += this.allBills[i].amount;
				}
				if (this.allBills[i].subCategory === "Youth Leagues") {
					this.billsCategoryTotals[8].subCategory[3].total += this.allBills[i].amount;
				}
				if (this.allBills[i].subCategory === "Medical") {
					this.billsCategoryTotals[8].subCategory[4].total += this.allBills[i].amount;
				}
				if (this.allBills[i].subCategory === "Nutrition") {
					this.billsCategoryTotals[8].subCategory[5].total += this.allBills[i].amount;
				}
			};
			if (this.allBills[i].category === "Miscellaneous") {
				this.billsCategoryTotals[9].total += this.allBills[i].amount;	
				if (this.allBills[i].subCategory === "Small / Unforeseen Bill") {
					this.billsCategoryTotals[9].subCategory[0].total += this.allBills[i].amount;
				}
			};
		};
	}

	getAllBills(){
		this.isRequesting = true;
		this._getBYTUser.getBillsDuringBudgetPeriod().subscribe( (user:any) => {	
			this.allBills = user.billsDuringBudgetPeriod;
			this.allBillsLength = user.billsDuringBudgetPeriod.length; 

			this.billsCategoryTotals = 
			[{
				category: "Housing",
				total: 0,
				show: true,
				subCategory: [{
					name: "Rent",
					total: 0
				},
				{
					name: "Mortgage",
					total: 0	
				},
				{
					name: "Vacation home",
					total: 0	
				}]
			},
			{
				category: "Health",
				total: 0,
				show: true,
				subCategory: [{
					name: "Gym",
					total: 0
				},
				{
					name: "Yoga",
					total: 0	
				},
				{
					name: "Pilates",
					total: 0		
				},
				{
					name: "Boxing",
					total: 0	
				},
				{
					name: "Martial arts",
					total: 0
				},
				{
					name: "Health Insurance",
					total: 0
				},
				{
					name: "Pharmacy",
					total: 0
				},
				{
					name: "Eyecare",
					total: 0
				},
				{
					name: "Doctor",
					total: 0
				},
				{
					name: "Dentist",
					total: 0
				}]
			},
			{
				category: "Transportation",
				total: 0,
				show: true,
				subCategory: [{
					name: "Metro Card",
					total: 0 
				},
				{
					name: "EZ Pass",
					total: 0 
				},
				{
					name: "Gas",
					total: 0
				},
				{
					name: "Parking",
					total: 0
				}]
			},
			{
				category: "Utilities",
				total: 0,
				show: true,
				subCategory: [{
					name: "Electric",
					total: 0 
				},
				{
					name: "Water",
					total: 0 
				},
				{
					name: "Garbage",
					total: 0
				},
				{
					name: "Home/Cell phone",
					total: 0
				},
				{
					name: "Internet",
					total: 0	
				}]
			},
			{
				category: "Insurance",
				total: 0,
				show: true,
				subCategory: [{
					name: "Car insurance",
					total: 0 
				},
				{
					name: "Homeowner's insurance",
					total: 0 
				},
				{
					name: "Renter's insurance",
					total: 0
				},
				{
					name: "Life insurance",
					total: 0
				}]
			},
			{ 
				category: "Debt",
				total: 0,
				show: true,
				subCategory: [{
					name: "Credit card",
					total: 0 
				},
				{
					name: "Student loan",
					total: 0 
				},
				{
					name: "Personal loan",
					total: 0
				},
				{
					name: "Car loan",
					total: 0
				},
				{
					name: "Medical",
					total: 0
				}]
			},
			{
				category: "Taxes",
				total: 0,
				show: true,
				subCategory: [{
					name: "Personal",
					total: 0 
				},
				{
					name: "Business",
					total: 0 
				},
				{
					name: "House",
					total: 0
				}]
			},
			{
				category: "Entertainment",
				total: 0,
				show: true,
				subCategory: [{
					name: "Streaming movies/music",
					total: 0 
				},
				{
					name: "Monthly subscriptions",
					total: 0 
				}]
			},
			{
				category: "ChildCare",
				total: 0,
				show: true,
				subCategory: [{
					name: "Babysitter",
					total: 0 
				},
				{
					name: "Daycare",
					total: 0 
				},
				{
					name: "After School Programs",
					total: 0 
				},
				{
					name: "Youth Leagues",
					total: 0 
				},
				{
					name: "Medical",
					total: 0 
				},
				{
					name: "Nutrition",
					total: 0 
				}]
			},
			{
				category: "Miscellaneous",
				total: 0,
				show: true,
				subCategory: [{
					name: "Small / Unforeseen Bill",
					total: 0 
				}]
			}];
			
			for (let i = 0; i < this.allBills.length; i++){
				if (this.allBills[i].category === "Housing") {
					this.billsCategoryTotals[0].total += this.allBills[i].amount;	
					if (this.allBills[i].subCategory === "Rent") {
						this.billsCategoryTotals[0].subCategory[0].total += this.allBills[i].amount;
					}
					if (this.allBills[i].subCategory === "Mortgage") {
						this.billsCategoryTotals[0].subCategory[1].total += this.allBills[i].amount;
					}
					if (this.allBills[i].subCategory === "Vacation home") {
						this.billsCategoryTotals[0].subCategory[2].total += this.allBills[i].amount;
					}
				};
				if (this.allBills[i].category === "Health") {
					this.billsCategoryTotals[1].total += this.allBills[i].amount;	
					if (this.allBills[i].subCategory === "Gym") {
						this.billsCategoryTotals[1].subCategory[0].total += this.allBills[i].amount;
					}
					if (this.allBills[i].subCategory === "Yoga") {
						this.billsCategoryTotals[1].subCategory[1].total += this.allBills[i].amount;
					}
					if (this.allBills[i].subCategory === "Pilates") {
						this.billsCategoryTotals[1].subCategory[2].total += this.allBills[i].amount;
					}
					if (this.allBills[i].subCategory === "Boxing") {
						this.billsCategoryTotals[1].subCategory[3].total += this.allBills[i].amount;
					}
					if (this.allBills[i].subCategory === "Martial arts") {
						this.billsCategoryTotals[1].subCategory[4].total += this.allBills[i].amount;
					}
					if (this.allBills[i].subCategory === "Health Insurance") {
						this.billsCategoryTotals[1].subCategory[5].total += this.allBills[i].amount;
					}
					if (this.allBills[i].subCategory === "Pharmacy") {
						this.billsCategoryTotals[1].subCategory[6].total += this.allBills[i].amount;
					}
					if (this.allBills[i].subCategory === "Eyecare") {
						this.billsCategoryTotals[1].subCategory[7].total += this.allBills[i].amount;
					}
					if (this.allBills[i].subCategory === "Doctor") {
						this.billsCategoryTotals[1].subCategory[8].total += this.allBills[i].amount;
					}
					if (this.allBills[i].subCategory === "Dentist") {
						this.billsCategoryTotals[1].subCategory[9].total += this.allBills[i].amount;
					}
				};
				if (this.allBills[i].category === "Transportation") {
					this.billsCategoryTotals[2].total += this.allBills[i].amount;	
					if (this.allBills[i].subCategory === "Metro Card") {
						this.billsCategoryTotals[2].subCategory[0].total += this.allBills[i].amount;
					}
					if (this.allBills[i].subCategory === "EZ Pass") {
						this.billsCategoryTotals[2].subCategory[1].total += this.allBills[i].amount;
					}
					if (this.allBills[i].subCategory === "Gas") {
						this.billsCategoryTotals[2].subCategory[2].total += this.allBills[i].amount;
					}
					if (this.allBills[i].subCategory === "Parking") {
						this.billsCategoryTotals[2].subCategory[3].total += this.allBills[i].amount;
					}
				};
				if (this.allBills[i].category === "Utilities") {
					this.billsCategoryTotals[3].total += this.allBills[i].amount;	
					if (this.allBills[i].subCategory === "Electric") {
						this.billsCategoryTotals[3].subCategory[0].total += this.allBills[i].amount;
					}
					if (this.allBills[i].subCategory === "Water") {
						this.billsCategoryTotals[3].subCategory[1].total += this.allBills[i].amount;
					}
					if (this.allBills[i].subCategory === "Garbage") {
						this.billsCategoryTotals[3].subCategory[2].total += this.allBills[i].amount;
					}
					if (this.allBills[i].subCategory === "Home/Cell phone") {
						this.billsCategoryTotals[3].subCategory[3].total += this.allBills[i].amount;
					}
					if (this.allBills[i].subCategory === "Internet") {
						this.billsCategoryTotals[3].subCategory[4].total += this.allBills[i].amount;
					}
				};
				if (this.allBills[i].category === "Insurance") {
					this.billsCategoryTotals[4].total += this.allBills[i].amount;	
					if (this.allBills[i].subCategory === "Car insurance") {
						this.billsCategoryTotals[4].subCategory[0].total += this.allBills[i].amount;
					}
					if (this.allBills[i].subCategory === "Homeowner's insurance") {
						this.billsCategoryTotals[4].subCategory[1].total += this.allBills[i].amount;
					}
					if (this.allBills[i].subCategory === "Renter's insurance") {
						this.billsCategoryTotals[4].subCategory[2].total += this.allBills[i].amount;
					}
					if (this.allBills[i].subCategory === "Life insurance") {
						this.billsCategoryTotals[4].subCategory[3].total += this.allBills[i].amount;
					}
				};
				if (this.allBills[i].category === "Debt") {
					this.billsCategoryTotals[5].total += this.allBills[i].amount;	
					if (this.allBills[i].subCategory === "Credit card") {
						this.billsCategoryTotals[5].subCategory[0].total += this.allBills[i].amount;
					}
					if (this.allBills[i].subCategory === "Student loan") {
						this.billsCategoryTotals[5].subCategory[1].total += this.allBills[i].amount;
					}
					if (this.allBills[i].subCategory === "Personal loan") {
						this.billsCategoryTotals[5].subCategory[2].total += this.allBills[i].amount;
					}
					if (this.allBills[i].subCategory === "Car loan") {
						this.billsCategoryTotals[5].subCategory[3].total += this.allBills[i].amount;
					}
					if (this.allBills[i].subCategory === "Medical") {
						this.billsCategoryTotals[5].subCategory[4].total += this.allBills[i].amount;
					}
				};
				if (this.allBills[i].category === "Taxes") {
					this.billsCategoryTotals[6].total += this.allBills[i].amount;	
					if (this.allBills[i].subCategory === "Personal") {
						this.billsCategoryTotals[6].subCategory[0].total += this.allBills[i].amount;
					}
					if (this.allBills[i].subCategory === "Business") {
						this.billsCategoryTotals[6].subCategory[1].total += this.allBills[i].amount;
					}
					if (this.allBills[i].subCategory === "House") {
						this.billsCategoryTotals[6].subCategory[2].total += this.allBills[i].amount;
					}
				};
				if (this.allBills[i].category === "Entertainment") {
					this.billsCategoryTotals[7].total += this.allBills[i].amount;	
					if (this.allBills[i].subCategory === "Streaming movies/music") {
						this.billsCategoryTotals[7].subCategory[0].total += this.allBills[i].amount;
					}
					if (this.allBills[i].subCategory === "Monthly subscriptions") {
						this.billsCategoryTotals[7].subCategory[1].total += this.allBills[i].amount;
					}
				};
				if (this.allBills[i].category === "ChildCare") {
					this.billsCategoryTotals[8].total += this.allBills[i].amount;	
					if (this.allBills[i].subCategory === "Babysitter") {
						this.billsCategoryTotals[8].subCategory[0].total += this.allBills[i].amount;
					}
					if (this.allBills[i].subCategory === "Daycare") {
						this.billsCategoryTotals[8].subCategory[1].total += this.allBills[i].amount;
					}
					if (this.allBills[i].subCategory === "After School Programs") {
						this.billsCategoryTotals[8].subCategory[2].total += this.allBills[i].amount;
					}
					if (this.allBills[i].subCategory === "Youth Leagues") {
						this.billsCategoryTotals[8].subCategory[3].total += this.allBills[i].amount;
					}
					if (this.allBills[i].subCategory === "Medical") {
						this.billsCategoryTotals[8].subCategory[4].total += this.allBills[i].amount;
					}
					if (this.allBills[i].subCategory === "Nutrition") {
						this.billsCategoryTotals[8].subCategory[5].total += this.allBills[i].amount;
					}
				};
				if (this.allBills[i].category === "Miscellaneous") {
					this.billsCategoryTotals[9].total += this.allBills[i].amount;	
					if (this.allBills[i].subCategory === "Small / Unforeseen Bill") {
						this.billsCategoryTotals[9].subCategory[0].total += this.allBills[i].amount;
					}
				};
			};
		});
	}
}