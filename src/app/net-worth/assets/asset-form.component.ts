import {Component, OnInit, EventEmitter } from '@angular/core';

import {GetBYTUser} from '../../dashboard/byt-dashboard-overview.service';
import {BYTAllPurposeFormModel} from '../../byt-all-purpose-form-model.component';
import {BYTPostAsset} from "../../dashboard/byt-dashboard-overview.service";

@Component({
	selector: 'byt-asset-form',
	templateUrl: './asset-form.component.html',
	styleUrls: ['./asset-form.component.css'],
	outputs: ['assetForm']
})
export class BYTAssetFormComponent {

	constructor(private _bytPostAsset: BYTPostAsset){}

	assetForm = new EventEmitter<Object>();
	submitted: boolean = false;
	model = new BYTAllPurposeFormModel();
	categories: Object[] = [
		{ name: "Cash - checking accounts" },
		{ name: "Cash - savings accounts" },
		{ name: "Special deposit accounts" },
		{ name: "Market investments" },
		{ name: "Certificate of deposit" },
		{ name: "Life insurance (cash value)" },
		{ name: "Mutual funds" },
		{ name: "Car" },
		{ name: "Equity in private company" },
		{ name: "Other" }
	];

	submitAsset(){
		this.submitted = true;
	}

	submitAssetFinal(){
		this.submitted = false;
		this.assetForm.emit(this.model);
		this._bytPostAsset.bytPostAssetForm(this.model).subscribe(user => {})
		this.model = new BYTAllPurposeFormModel();
	}

}