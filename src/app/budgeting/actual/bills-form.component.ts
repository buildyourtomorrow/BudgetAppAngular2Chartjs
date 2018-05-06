import {Component, OnInit, EventEmitter } from '@angular/core';

import {BYTAllPurposeFormModel} from '../../byt-all-purpose-form-model.component';
import {BYTPostBill} from "../../dashboard/byt-dashboard-overview.service";

@Component({
	selector: 'byt-bills-form',
	templateUrl: './bills-form.component.html',
	styleUrls: ['./bills-form.component.css'],
	outputs: ['billsForm']
})
export class BYTBillsFormComponent {

    constructor(private _bytPostBill: BYTPostBill){}

	billsForm = new EventEmitter<Object>();
	submitted: boolean = false;
	model = new BYTAllPurposeFormModel();
	categories: string[] = [ "Housing", "Health", "Transportation", "Utilities", "Insurance", "Debt", "Taxes", 
							 "Entertainment", "ChildCare", "Miscellaneous" ]
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
		],
        Miscellaneous: [
            { name: "Small / Unforeseen Bill"}
        ],
	}

	submitBill(){
		this.submitted = true;
	}

	submitBillFinal(){
		this.submitted = false;
		this.billsForm.emit(this.model);
        this._bytPostBill.bytPostBillForm(this.model).subscribe(user => {})
		this.model = new BYTAllPurposeFormModel();
	}

}