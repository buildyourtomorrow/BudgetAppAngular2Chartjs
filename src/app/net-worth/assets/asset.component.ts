import {Component, OnInit, ViewChild} from '@angular/core';

import {GetBYTUser} from '../../dashboard/byt-dashboard-overview.service';
import {BYTRemoveTransaction} from '../../dashboard/byt-dashboard-overview.service';
import {BYTLastAssetEntryComponent} from './last-asset-entry.component'

@Component({
	selector: 'byt-assets',
	templateUrl: './asset.component.html',
	styleUrls: ['./asset.component.css']
})
export class BYTAssetComponent implements OnInit {
	allAssets: any[];
	assetCategoryTotals: any[];
	byt_active: boolean = true;
	allAssetsLength: number;

	@ViewChild(BYTLastAssetEntryComponent) _lastAssetEntry: BYTLastAssetEntryComponent;

	constructor (private _getBYTUser: GetBYTUser, private _BYTRemoveTransaction: BYTRemoveTransaction) {}

	ngOnInit(){
		this.getAllAssets();
	};

	getAllAssets(){
		this._getBYTUser.getUserAssetsLiabilities().subscribe( (user:any) => {
			this.allAssets = user.assets;
			this.allAssetsLength = user.assets.length;

			this.assetCategoryTotals = [
				{category: "Cash - checking accounts", total: 0},
				{category: "Cash - savings accounts", total: 0},
				{category: "Special deposit accounts", total: 0},
				{category: "Market investments", total: 0},
				{category: "Certificate of deposit", total: 0},
				{category: "Life insurance (cash value)", total: 0},
				{category: "Mutual funds", total: 0},
				{category: "Car", total: 0},
				{category: "Equity in private company", total: 0},
				{category: "Other", total: 0}
			];

			for (let i = 0; i < this.allAssets.length; i++){
				if (this.allAssets[i].category === "Cash - checking accounts") {
					this.assetCategoryTotals[0].total += this.allAssets[i].amount;
				};
				if (this.allAssets[i].category === "Cash - savings accounts") {
					this.assetCategoryTotals[1].total += this.allAssets[i].amount;
				};
				if (this.allAssets[i].category === "Special deposit accounts") {
					this.assetCategoryTotals[2].total += this.allAssets[i].amount;
				};
				if (this.allAssets[i].category === "Market investments") {
					this.assetCategoryTotals[3].total += this.allAssets[i].amount;
				};
				if (this.allAssets[i].category === "Certificate of deposit") {
					this.assetCategoryTotals[4].total += this.allAssets[i].amount;
				};
				if (this.allAssets[i].category === "Life insurance (cash value)") {
					this.assetCategoryTotals[5].total += this.allAssets[i].amount;
				};
				if (this.allAssets[i].category === "Mutual funds") {
					this.assetCategoryTotals[6].total += this.allAssets[i].amount;
				};
				if (this.allAssets[i].category === "Car") {
					this.assetCategoryTotals[7].total += this.allAssets[i].amount;
				};
				if (this.allAssets[i].category === "Equity in private company") {
					this.assetCategoryTotals[8].total += this.allAssets[i].amount;
				};
				if (this.allAssets[i].category === "Other") {
					this.assetCategoryTotals[9].total += this.allAssets[i].amount;
				};
			};
		})
	}

	childAssetForm($event: Object){		
		this.allAssets.unshift($event)
		this.allAssetsLength = this.allAssets.length;
		this._lastAssetEntry.lastTransactionDateFunction($event);
		this.calcAssetCategoryTotals()
	}

	removeAsset(index){
		this.allAssets.splice(index, 1);
		this.calcAssetCategoryTotals();
		this._BYTRemoveTransaction.bytRemoveAsset(index).subscribe(user => {});
		this.allAssetsLength = this.allAssets.length;
		this._lastAssetEntry.updateViewFunction(this.allAssets);
		if(this.allAssetsLength === 0){
			this.byt_active = true;
		}
	};

	calcAssetCategoryTotals(){
		this.assetCategoryTotals = [
			{category: "Cash - checking accounts", total: 0},
			{category: "Cash - savings accounts", total: 0},
			{category: "Special deposit accounts", total: 0},
			{category: "Market investments", total: 0},
			{category: "Certificate of deposit", total: 0},
			{category: "Life insurance (cash value)", total: 0},
			{category: "Mutual funds", total: 0},
			{category: "Car", total: 0},
			{category: "Equity in private company", total: 0},
			{category: "Other", total: 0}
		];

		for (let i = 0; i < this.allAssets.length; i++){
			if (this.allAssets[i].category === "Cash - checking accounts") {
				this.assetCategoryTotals[0].total += this.allAssets[i].amount;
			};
			if (this.allAssets[i].category === "Cash - savings accounts") {
				this.assetCategoryTotals[1].total += this.allAssets[i].amount;
			};
			if (this.allAssets[i].category === "Special deposit accounts") {
				this.assetCategoryTotals[2].total += this.allAssets[i].amount;
			};
			if (this.allAssets[i].category === "Market investments") {
				this.assetCategoryTotals[3].total += this.allAssets[i].amount;
			};
			if (this.allAssets[i].category === "Certificate of deposit") {
				this.assetCategoryTotals[4].total += this.allAssets[i].amount;
			};
			if (this.allAssets[i].category === "Life insurance (cash value)") {
				this.assetCategoryTotals[5].total += this.allAssets[i].amount;
			};
			if (this.allAssets[i].category === "Mutual funds") {
				this.assetCategoryTotals[6].total += this.allAssets[i].amount;
			};
			if (this.allAssets[i].category === "Car") {
				this.assetCategoryTotals[7].total += this.allAssets[i].amount;
			};
			if (this.allAssets[i].category === "Equity in private company") {
				this.assetCategoryTotals[8].total += this.allAssets[i].amount;
			};
			if (this.allAssets[i].category === "Other") {
				this.assetCategoryTotals[9].total += this.allAssets[i].amount;
			};
		};
	}
}