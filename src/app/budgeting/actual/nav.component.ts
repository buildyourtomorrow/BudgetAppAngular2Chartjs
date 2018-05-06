import {Component} from '@angular/core';
import {GetBYTUser} from '../../dashboard/byt-dashboard-overview.service';

@Component({
    selector: 'byt-actual-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css']
})
export class BYTBudgetActualNavComponent {
	byt_dashboard_spinner: boolean;
	byt_income_spinner: boolean;
	byt_bills_spinner: boolean;
	byt_expenses_spinner: boolean;
	byt_edu_spinner: boolean;

	constructor(private _getBYTUser: GetBYTUser){}
	
	addRemoveIncomeSpinner(){
		this.byt_income_spinner = !this.byt_income_spinner;
		this._getBYTUser.getUserProjections().subscribe(user => {
			this.byt_income_spinner = !this.byt_income_spinner;			
		});
	}
	addRemoveBillsSpinner(){
		this.byt_bills_spinner = !this.byt_bills_spinner;
		this._getBYTUser.getUserProjections().subscribe(user => {
			this.byt_bills_spinner = !this.byt_bills_spinner;		
		});
	}
	addRemoveExpensesSpinner(){
		this.byt_expenses_spinner = !this.byt_expenses_spinner;
		this._getBYTUser.getUserProjections().subscribe(user => {
			this.byt_expenses_spinner = !this.byt_expenses_spinner;	
		});
	}
}