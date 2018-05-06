import {Component, OnInit, EventEmitter } from '@angular/core';

import {GetBYTUser, BYTPostIncome} from '../../dashboard/byt-dashboard-overview.service';
import {BYTAllPurposeFormModel} from '../../byt-all-purpose-form-model.component';

import {Observable} from "rxjs/Observable";

@Component({
	selector: 'byt-income-form',
	templateUrl: './income-form.component.html',
	styleUrls: ['./income-form.component.css'],
	outputs: ['incomeForm']
})
export class BYTIncomeFormComponent {

	constructor(private _bytPostIncome: BYTPostIncome){}

	incomeForm = new EventEmitter<Object>();
	submitted: boolean = false;
	model = new BYTAllPurposeFormModel();
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
	}

	submitIncomeFinal(){
		this.submitted = false;
		this.incomeForm.emit(this.model);
		this._bytPostIncome.bytPostIncomeForm(this.model).subscribe(user => {})
		this.model = new BYTAllPurposeFormModel();
	}

	myObservableFuction(){
		var keys$ = Observable.fromEvent(document, 'keyup').do( (keyUp:KeyboardEvent) => console.log(keyUp.key) )
		keys$.subscribe();
	}

}