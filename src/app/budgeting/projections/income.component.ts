import {Component, OnInit, ViewChild} from '@angular/core';

import {GetBYTUser, BYTRemoveTransaction, BYTPostIncomeProjections} from '../../dashboard/byt-dashboard-overview.service';
import {BYTAllPurposeFormModel} from '../../byt-all-purpose-form-model.component';

@Component({
	selector: 'byt-monthly-projections-income',
	templateUrl: './income.component.html',
	styleUrls: ['./income.component.css']
})
export class BYTMonthlyProjectionsIncomeComponent implements OnInit {
	allIncomeProjections: any[];
	byt_active: boolean = true;
	allIncomeProjectionsLength: number;
	submitted: boolean = false;
	model = new BYTAllPurposeFormModel();

	constructor (private _getBYTUser: GetBYTUser, private _bytPostIncomeProjections: BYTPostIncomeProjections, private _BYTRemoveTransaction: BYTRemoveTransaction) {}

	ngOnInit(){
		this.getAllIncomeProjections();

	};

	getAllIncomeProjections(){
		this._getBYTUser.getUserProjections().subscribe( (user:any) => {
			this.allIncomeProjections = user.incomeProjections;
			this.allIncomeProjectionsLength = user.incomeProjections.length;
		})
	};

	removeIncomeProjection(index){
		this.allIncomeProjections.splice(index, 1);
		this._BYTRemoveTransaction.bytRemoveIncomeProjection(index).subscribe(user => {});
		this.allIncomeProjectionsLength = this.allIncomeProjections.length;	
	};
	
	categories: Object[] = [
		{ name: "Wages" },
		{ name: "Rental Property" },
		{ name: "Limited Partnerships" },
		{ name: "Market Investments" },
		{ name: "Sole Proprietorship" },
		{ name: "Corporation" },
		{ name: "Child Support" },
		{ name: "Taxes" },
		{ name: "Refund" },
		{ name: "Other" }
	];

	submitIncome(){
		this.submitted = true;
	};

	submitIncomeFinal(){
		this.submitted = false;
		this.allIncomeProjections.push(this.model);
		this.allIncomeProjectionsLength = this.allIncomeProjections.length;
		this._bytPostIncomeProjections.bytPostIncomeProjectionForm(this.model).subscribe(user => {})
		this.model = new BYTAllPurposeFormModel();
	};

}