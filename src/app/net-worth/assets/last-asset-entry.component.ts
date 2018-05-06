import {Component, OnInit } from '@angular/core';

import {GetBYTUser} from '../../dashboard/byt-dashboard-overview.service';
 
@Component({
	selector: 'byt-last-asset-entry',
	templateUrl: './last-asset-entry.component.html',
	styleUrls: ['./last-asset-entry.component.css']
})
export class BYTLastAssetEntryComponent implements OnInit {
	lastTransactionDate: Date;
	allAssets: any;
	allAssetsLength: number;

	constructor (private _getBYTUser: GetBYTUser) {}

	ngOnInit(){
		this._getBYTUser.getUserAssetsLiabilities().subscribe( (user:any) => {
			this.allAssets = user.assets;
			this.allAssetsLength = this.allAssets.length;
			if(this.allAssetsLength > 0){
				this.lastTransactionDate = this.allAssets[0].date;
			}			
		});
	}

	lastTransactionDateFunction(item){
		this.allAssets.unshift(item)
		this.allAssetsLength = this.allAssets.length;
		this.lastTransactionDate = this.allAssets[0].date;
	}

	updateViewFunction(allItems){
		this.allAssetsLength = allItems.length;
		if(this.allAssetsLength > 0){
			this.lastTransactionDate = allItems[0].date;	
		}else{
			this.lastTransactionDate = new Date;
		}				
	}

}