import {Component, OnInit, ViewChild} from '@angular/core';

import {GetBYTUser, BYTRemoveTransaction} from '../../dashboard/byt-dashboard-overview.service';
import {BYTLastLiabilityEntryComponent} from './last-liability-entry.component';

@Component({
	selector: 'byt-liabilities',
	templateUrl: './liability.component.html',
	styleUrls: ['./liability.component.css']
})
export class BYTLiabilityComponent implements OnInit {
	allLiabilities: any[];
	liabilityCategoryTotals: any[];
	byt_active: boolean = true;
	allLiabilitiesLength: number;

	@ViewChild(BYTLastLiabilityEntryComponent) _lastLiabilityEntry: BYTLastLiabilityEntryComponent;

	constructor (private _getBYTUser: GetBYTUser, private _BYTRemoveTransaction: BYTRemoveTransaction) {}

	ngOnInit(){
		this.getAllLiabilities();
	};

	getAllLiabilities(){
		this._getBYTUser.getUserAssetsLiabilities().subscribe( (user:any) => {
			this.allLiabilities = user.liabilities;
			this.allLiabilitiesLength = user.liabilities.length;

			this.liabilityCategoryTotals = [
				{category: "Credit card debt", total: 0},
				{category: "Medical debt", total: 0},
				{category: "Unpaid rent", total: 0},
				{category: "Unpaid utilities", total: 0},
				{category: "Auto loan", total: 0},
				{category: "Personal loan", total: 0},
				{category: "Consolidation loan", total: 0},
				{category: "Student loan", total: 0},
				{category: "Home loan", total: 0},
				{category: "Business loan", total: 0},
				{category: "Other", total: 0}
			];

			for (let i = 0; i < this.allLiabilities.length; i++){
				if (this.allLiabilities[i].category === "Credit card debt") {
					this.liabilityCategoryTotals[0].total += this.allLiabilities[i].amount;
				};
				if (this.allLiabilities[i].category === "Medical debt") {
					this.liabilityCategoryTotals[1].total += this.allLiabilities[i].amount;
				};
				if (this.allLiabilities[i].category === "Unpaid rent") {
					this.liabilityCategoryTotals[2].total += this.allLiabilities[i].amount;
				};
				if (this.allLiabilities[i].category === "Unpaid utilities") {
					this.liabilityCategoryTotals[3].total += this.allLiabilities[i].amount;
				};
				if (this.allLiabilities[i].category === "Auto loan") {
					this.liabilityCategoryTotals[4].total += this.allLiabilities[i].amount;
				};
				if (this.allLiabilities[i].category === "Personal loan") {
					this.liabilityCategoryTotals[5].total += this.allLiabilities[i].amount;
				};
				if (this.allLiabilities[i].category === "Consolidation loan") {
					this.liabilityCategoryTotals[6].total += this.allLiabilities[i].amount;
				};
				if (this.allLiabilities[i].category === "Student loan") {
					this.liabilityCategoryTotals[7].total += this.allLiabilities[i].amount;
				};
				if (this.allLiabilities[i].category === "Home loan") {
					this.liabilityCategoryTotals[8].total += this.allLiabilities[i].amount;
				};
				if (this.allLiabilities[i].category === "Business loan") {
					this.liabilityCategoryTotals[9].total += this.allLiabilities[i].amount;
				};
				if (this.allLiabilities[i].category === "Other") {
					this.liabilityCategoryTotals[10].total += this.allLiabilities[i].amount;
				};
			};
		})
	}

	childLiabilityForm($event: Object){		
		this.allLiabilities.unshift($event)
		this.allLiabilitiesLength = this.allLiabilities.length;
		this._lastLiabilityEntry.lastTransactionDateFunction($event);
		this.calcLiabilityCategoryTotals()
	}

	removeLiability(index){
		this.allLiabilities.splice(index, 1);
		this.calcLiabilityCategoryTotals();
		this._BYTRemoveTransaction.bytRemoveLiability(index).subscribe(user => {});
		this.allLiabilitiesLength = this.allLiabilities.length;
		this._lastLiabilityEntry.updateViewFunction(this.allLiabilities);
		if(this.allLiabilitiesLength === 0){
			this.byt_active = true;
		}
	};

	calcLiabilityCategoryTotals(){
		this.liabilityCategoryTotals = [
			{category: "Credit card debt", total: 0},
			{category: "Medical debt", total: 0},
			{category: "Unpaid rent", total: 0},
			{category: "Unpaid utilities", total: 0},
			{category: "Auto loan", total: 0},
			{category: "Personal loan", total: 0},
			{category: "Consolidation loan", total: 0},
			{category: "Student loan", total: 0},
			{category: "Home loan", total: 0},
			{category: "Business loan", total: 0},
			{category: "Other", total: 0}
		];

		for (let i = 0; i < this.allLiabilities.length; i++){
			if (this.allLiabilities[i].category === "Credit card debt") {
				this.liabilityCategoryTotals[0].total += this.allLiabilities[i].amount;
			};
			if (this.allLiabilities[i].category === "Medical debt") {
				this.liabilityCategoryTotals[1].total += this.allLiabilities[i].amount;
			};
			if (this.allLiabilities[i].category === "Unpaid rent") {
				this.liabilityCategoryTotals[2].total += this.allLiabilities[i].amount;
			};
			if (this.allLiabilities[i].category === "Unpaid utilities") {
				this.liabilityCategoryTotals[3].total += this.allLiabilities[i].amount;
			};
			if (this.allLiabilities[i].category === "Auto loan") {
				this.liabilityCategoryTotals[4].total += this.allLiabilities[i].amount;
			};
			if (this.allLiabilities[i].category === "Personal loan") {
				this.liabilityCategoryTotals[5].total += this.allLiabilities[i].amount;
			};
			if (this.allLiabilities[i].category === "Consolidation loan") {
				this.liabilityCategoryTotals[6].total += this.allLiabilities[i].amount;
			};
			if (this.allLiabilities[i].category === "Student loan") {
				this.liabilityCategoryTotals[7].total += this.allLiabilities[i].amount;
			};
			if (this.allLiabilities[i].category === "Home loan") {
				this.liabilityCategoryTotals[8].total += this.allLiabilities[i].amount;
			};
			if (this.allLiabilities[i].category === "Business loan") {
				this.liabilityCategoryTotals[9].total += this.allLiabilities[i].amount;
			};
			if (this.allLiabilities[i].category === "Other") {
				this.liabilityCategoryTotals[10].total += this.allLiabilities[i].amount;
			};
		};
	}
}