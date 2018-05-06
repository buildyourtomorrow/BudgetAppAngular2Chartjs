import {Component, OnInit} from '@angular/core';

import {GetBYTUser, BYTPostExpenseProjection, BYTRemoveTransaction} from '../../dashboard/byt-dashboard-overview.service';
import {BYTAllPurposeFormModel} from '../../byt-all-purpose-form-model.component';

@Component({
    templateUrl: './expenses.component.html',
    styleUrls: ['./expenses.component.css']
})
export class BYTMonthlyProjectionsExpensesComponent {
	expenseProjections: any[];
	expenseProjectionsLength: number;

	constructor (private _getBYTUser: GetBYTUser,
				 private _bytPostExpenseProjection: BYTPostExpenseProjection,
				 private _BYTRemoveTransaction: BYTRemoveTransaction) {}

	submitted: boolean = false;
	model = new BYTAllPurposeFormModel();
	categories: string[] = [ "Clothing", "Education", "Food", "Gift", "Giving", "Household", "Medical", 
							 "Personal", "Play", "Events", "Transportation", "Travel", "Pets", "Kids" ]
	subCategories: Object = 
	{
		Clothing:[
            { name: "Children's Clothing"},
            { name: "Adult's Clothing"}
        ],
        Education:[
            { name: "Tuition"},
            { name: "Books"},
            { name: "School Supplies"},
            { name: "Field Trips"},
            { name: "Student Loan Payment"},
            { name: "Magazines"}
        ],
        Food:[
            { name: "Groceries"},
            { name: "Restaurant"},
            { name: "Pet Food"},
            { name: "Junk Food"},
            { name: "Coffee"}
        ],
        Gift:[
            { name: "Birthday"},
            { name: "Valentine's Day"},
            { name: "Anniversary"},
            { name: "Wedding"},
            { name: "Christmas"},
            { name: "Special Occasion"}
        ],
        Giving:[
            { name: "Tithing"},
            { name: "Offerings"},
            { name: "Charities"},
            { name: "Family"}
        ],
        Household :[
            { name: "Toiletries"},
            { name: "Laundry Detergent"},
            { name: "Dishwasher Detergent"},
            { name: "Cleaning Supplies"},
            { name: "Tools"},
            { name: "Furniture"},
            { name: "Decorating"},
            { name: "Home Improvement"},
            { name: "Home Repair"}
		],
		Medical :[
            { name: "Primary Care"},
            { name: "Dental Care"},
            { name: "Specialty Care"},
            { name: "Medications"},
            { name: "Medical Devices"}
		],
		Personal: [
			{ name: "Hair & Hair Cuts"},
            { name: "Salon Services"},
            { name: "Cosmetics"},
            { name: "Babysitter"},
            { name: "Laundry"},
            { name: "Spa & Massage"},
		],
		Play: [
			{ name: "Movies"},
			{ name: "Clubs / Bars"},
			{ name: "Entertainment"},
			{ name: "Games"},
			{ name: "Vacations"},
			{ name: "Sporting Events"},
            { name: "Amusement Park"}
		],
        Events: [
            { name: "Moving"},
            { name: "Wedding"},
            { name: "Birthday parties"},
            { name: "Baby showers"},
            { name: "Special events"},
        ],
        Transportation: [
            { name: "Fuel"},
            { name: "Tires"},
            { name: "Oil Changes"},
            { name: "Maintenance"},
            { name: "Parking Fees"},
            { name: "Repairs"},
            { name: "DMV Fees"},
            { name: "Vehicle Replacement"},
            { name: "Taxi"},
            { name: "Public Transportation"},
            { name: "Tolls"},
            { name: "Auto Payment"},
            { name: "Auto Insurance"}
        ],
        Travel: [
            { name: "Air Travel"},
            { name: "Hotel"},
            { name: "Rental Car & Taxi"},
            { name: "Vacations"}
        ],
        Pets: [
            { name: "Pet Food & Supplies"},
            { name: "Pet Grooming"},
            { name: "Veterinary"}
        ],
        Kids: [
            { name: "Allowance"},
            { name: "Baby Supplies"},
            { name: "Babysitter & Daycare"},
            { name: "Child Support"},
            { name: "Kids Activities"},
            { name: "Toys"}
        ],
	}

	ngOnInit(){
		this.getExpenseProjections();
	};

	removeExpenseProjection(index){
		this.expenseProjections.splice(index, 1);
		this._BYTRemoveTransaction.bytRemoveExpenseProjection(index).subscribe(user => {});
		this.expenseProjectionsLength = this.expenseProjections.length;		
	};

	getExpenseProjections(){
		this._getBYTUser.getUserProjections().subscribe( (user: any) => {	
			this.expenseProjections = user.expenseProjections;
			this.expenseProjectionsLength = user.expenseProjections.length;
		});
	}

	submitExpense(){
		this.submitted = true;
	}

	submitExpenseFinal(){
		this.submitted = false;
		this.expenseProjections.push(this.model);
		this.expenseProjectionsLength = this.expenseProjections.length;
		this._bytPostExpenseProjection.bytPostExpenseProjectionForm(this.model).subscribe(user => {})
		this.model = new BYTAllPurposeFormModel();
	}

}