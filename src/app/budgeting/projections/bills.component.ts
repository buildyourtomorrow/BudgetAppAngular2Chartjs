import {Component, OnInit} from '@angular/core';

import {GetBYTUser, BYTRemoveTransaction, BYTPostBillProjection} from '../../dashboard/byt-dashboard-overview.service';
import {BYTAllPurposeFormModel} from '../../byt-all-purpose-form-model.component';

/*
All of the bill categories need to update any time that a bill is either added or removed from all bills. Therefore, the billsCategoryTotals object is 
reset then the for loops add up all categories once again. This happens on three occassions. When a bill is added or removed by the user as mentioned above
and when the component is first initialized.
*/

@Component({
	selector: 'byt-monthly-projections-bills',
	templateUrl: './bills.component.html',
    styleUrls: ['./bills.component.css']
})
export class BYTMonthlyProjectionsBillsComponent implements OnInit {
	billProjections: any[];	
	billProjectionsLength: number;
	submitted: boolean = false;
	model = new BYTAllPurposeFormModel();

	constructor (private _getBYTUser: GetBYTUser, private _bytPostBillProjection: BYTPostBillProjection, private _bytRemoveTransaction: BYTRemoveTransaction) {}

	categories: string[] = [ "Housing", "Health", "Transportation", "Utilities", "Insurance", "Debt", "Taxes", 
							 "Entertainment", "ChildCare" ];
	subCategories: Object = 
	{
		Housing:[
            { name: "Rent"},
            { name: "Mortgage"},
            { name: "Vacation home"}
        ],
        Health:[
            { name: "Gym"},
            { name: "Yoga"},
            { name: "Pilates"},
            { name: "Boxing"},
            { name: "Martial arts"},
            { name: "Health Insurance"},
            { name: "Pharmacy"},
            { name: "Eyecare"},
            { name: "Doctor"},
            { name: "Dentist"}
        ],
        Transportation:[
            { name: "Metro Card"},
            { name: "EZ Pass"},
            { name: "Gas"},
            { name: "Parking"}
        ],
        Utilities:[
            { name: "Electric"},
            { name: "Water"},
            { name: "Garbage"},
            { name: "Home/Cell phone"},
            { name: "Internet"}
        ],
        Insurance:[
            { name: "Car insurance"},
            { name: "Homeowner's insurance"},
            { name: "Renter's insurance"},
            { name: "Life insurance"}
        ],
        Debt :[
            { name: "Credit card"},
            { name: "Student loan"},
            { name: "Personal loan"},
            { name: "Car loan"},
            { name: "Medical"}
		],
		Taxes :[
            { name: "Personal"},
            { name: "Business"},
            { name: "House"}
		],
		Entertainment: [
			{ name: "Streaming movies/music"},
            { name: "Monthly subscriptions"}
		],
		ChildCare: [
			{ name: "Babysitter"},
			{ name: "Daycare"},
			{ name: "After School Programs"},
			{ name: "Youth Leagues"},
			{ name: "Medical"},
			{ name: "Nutrition"}
		]
	}

	ngOnInit(){
		this.getBillProjections();
	};

	removeBillProjection(index){
		this.billProjections.splice(index, 1);
		this._bytRemoveTransaction.bytRemoveBillProjection(index).subscribe(user => {});
		this.billProjectionsLength = this.billProjections.length;	
	};

	getBillProjections(){
		this._getBYTUser.getUserProjections().subscribe( (user:any) => {	
			this.billProjections = user.billProjections;
			this.billProjectionsLength = user.billProjections.length; 	
		});
	}

	submitBill(){
		this.submitted = true;
	}

	submitBillFinal(){
		this.submitted = false;
		this.billProjections.push(this.model);
		this.billProjectionsLength = this.billProjections.length;
		this._bytPostBillProjection.bytPostBillProjectionForm(this.model).subscribe(user => {})
		this.model = new BYTAllPurposeFormModel();
	}

}