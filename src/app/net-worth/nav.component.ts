import {Component} from '@angular/core';
import {GetBYTUser} from '../dashboard/byt-dashboard-overview.service';

@Component({
    selector: 'byt-net-worth-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css']
})
export class BYTNetWorthNavComponent {
	byt_spinner: boolean;
	byt_spinner_one: boolean;
	byt_spinner_two: boolean;
	byt_spinner_three: boolean;

	constructor(private _getBYTUser: GetBYTUser){}

	addRemoveSpinner(){		
		this.byt_spinner = !this.byt_spinner;
		this._getBYTUser.getUserAssetsLiabilities().subscribe(user => {
			this.byt_spinner = !this.byt_spinner;			
		});
	}
	addRemoveSpinnerOne(){
		this.byt_spinner_one = !this.byt_spinner_one;
		this._getBYTUser.getUserAssetsLiabilities().subscribe(user => {
			this.byt_spinner_one = !this.byt_spinner_one;			
		});
	}
	addRemoveSpinnerTwo(){
		this.byt_spinner_two = !this.byt_spinner_two;
		this._getBYTUser.getUserAssetsLiabilities().subscribe(user => {
			this.byt_spinner_two = !this.byt_spinner_two;		
		});
	}
	addRemoveSpinnerThree(){
		this.byt_spinner_three = !this.byt_spinner_three;
		this._getBYTUser.getUserAssetsLiabilities().subscribe(user => {
			this.byt_spinner_three = !this.byt_spinner_three;	
		});
	}
}