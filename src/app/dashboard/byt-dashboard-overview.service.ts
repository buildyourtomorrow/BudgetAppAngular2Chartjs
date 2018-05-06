import { Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {User} from '../user';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class BYTPostBudgetDateRange {
	constructor(public authHttp: AuthHttp) {}
	//userProfile: any = JSON.parse(localStorage.getItem('profile'));
	bytPostBudgetDateRange(bytStart: any, bytEnd: any, bytDiff: any): Observable<any[]>{
		let bytUserProfile = JSON.parse(localStorage.getItem('profile'));
		return this.authHttp.post('/add-date-range', {"bytStart": bytStart,
													  "bytEnd": bytEnd,
													  "bytPeriodLength": bytDiff,
													  "byt_email": bytUserProfile.email})
			.map((res: Response) => res.json() )
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'))
	}
}
@Injectable()
export class GetBYTUser {
	// Set userProfile attribute of already saved profile
	constructor (public authHttp: AuthHttp) {}
    //public userProfile: any = JSON.parse(localStorage.getItem('profile'));
	getUser(): Observable<User[]>{
		let myHeader = new Headers();
		let bytUserProfile = JSON.parse(localStorage.getItem('profile'));
		myHeader.append('byt_email', bytUserProfile.email);
		return this.authHttp.get('/get-user', {headers: myHeader }).map((res: Response) => res.json() )
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'))
	}
	getUserAppNav(): Observable<User[]>{
		let myHeader = new Headers();
		let bytUserProfile = JSON.parse(localStorage.getItem('profile'));
		myHeader.append('byt_email', bytUserProfile.email);
		return this.authHttp.get('/get-user-app-nav', {headers: myHeader }).map((res: Response) => res.json() )
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'))
	}
	getUserNoCalc(): Observable<User[]>{
		let myHeader = new Headers();
		let bytUserProfile = JSON.parse(localStorage.getItem('profile'));
		myHeader.append('byt_email', bytUserProfile.email);
		return this.authHttp.get('/get-user-no-calc', {headers: myHeader }).map((res: Response) => res.json() )
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'))
	}
	getUserAssetsLiabilities(): Observable<User[]>{
		let myHeader = new Headers();
		let bytUserProfile = JSON.parse(localStorage.getItem('profile'));
		myHeader.append('byt_email', bytUserProfile.email);
		return this.authHttp.get('/get-user-assets-liabilities', {headers: myHeader }).map((res: Response) => res.json() )
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'))
	}
	getUserProjections(): Observable<User[]>{
		let myHeader = new Headers();
		let bytUserProfile = JSON.parse(localStorage.getItem('profile'));
		myHeader.append('byt_email', bytUserProfile.email);
		return this.authHttp.get('/get-user-projections', {headers: myHeader }).map((res: Response) => res.json() )
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'))
	}
	getUserRecord(): Observable<User[]>{
		let myHeader = new Headers();
		let bytUserProfile = JSON.parse(localStorage.getItem('profile'));
		myHeader.append('byt_email', bytUserProfile.email);
		return this.authHttp.get('/get-user-record', {headers: myHeader }).map((res: Response) => res.json() )
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'))
	}
	getIncomeDuringBudgetPeriod(): Observable<User[]>{
		let myHeader = new Headers();
		let bytUserProfile = JSON.parse(localStorage.getItem('profile'));
		myHeader.append('byt_email', bytUserProfile.email);
		return this.authHttp.get('/get-income-during-budget-period', {headers: myHeader }).map((res: Response) => res.json() )
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'))
	}
	getBillsDuringBudgetPeriod(): Observable<User[]>{
		let myHeader = new Headers();
		let bytUserProfile = JSON.parse(localStorage.getItem('profile'));
		myHeader.append('byt_email', bytUserProfile.email);
		return this.authHttp.get('/get-bills-during-budget-period', {headers: myHeader }).map((res: Response) => res.json() )
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'))
	}
	getExpensesDuringBudgetPeriod(): Observable<User[]>{
		let myHeader = new Headers();
		let bytUserProfile = JSON.parse(localStorage.getItem('profile'));
		myHeader.append('byt_email', bytUserProfile.email);
		return this.authHttp.get('/get-expenses-during-budget-period', {headers: myHeader }).map((res: Response) => res.json() )
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'))
	}
}
@Injectable()
export class BYTPostProjections {
	constructor(public authHttp: AuthHttp) {}
	userProfile: any = JSON.parse(localStorage.getItem('profile'));
	bytPostIncomeProjection(bytIncomeProjection: number): Observable<User[]>{
		let bytUserProfile = JSON.parse(localStorage.getItem('profile'));
		return this.authHttp.post('/add-income-projection', {"bytIncomeProjection": bytIncomeProjection, "byt_email": bytUserProfile.email})
			.map((res: Response) => res.json() )
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'))
	}
	bytPostBillProjection(bytBillProjection: number): Observable<User[]>{
		let bytUserProfile = JSON.parse(localStorage.getItem('profile'));
		return this.authHttp.post('/add-bills-projection', {"bytBillProjection": bytBillProjection, "byt_email": bytUserProfile.email})
			.map((res: Response) => res.json() )
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'))
	}
	bytPostExpensesProjection(bytExpensesProjection: number): Observable<User[]>{
		let bytUserProfile = JSON.parse(localStorage.getItem('profile'));
		return this.authHttp.post('/add-expenses-projection', {"bytExpensesProjection": bytExpensesProjection, "byt_email": bytUserProfile.email})
			.map((res: Response) => res.json() )
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'))
	}
}
@Injectable()
export class BYTPostIncomeProjections {
	constructor(public authHttp: AuthHttp) {}
	userProfile: any = JSON.parse(localStorage.getItem('profile'));
	bytPostIncomeProjectionForm(byt_model: any): Observable<any[]>{
		let bytUserProfile = JSON.parse(localStorage.getItem('profile'));
		return this.authHttp.post('/add-income-projections', {"category": byt_model.category,
															  "description": byt_model.description,
															  "date": byt_model.date,
															  "amount": byt_model.amount,
															  "byt_email": bytUserProfile.email})
			.map((res: Response) => res.json() )
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'))
	}
}
@Injectable()
export class BYTPostBillProjection {
	constructor(public authHttp: AuthHttp) {}
	userProfile: any = JSON.parse(localStorage.getItem('profile'));
	bytPostBillProjectionForm(byt_model: any): Observable<any[]>{
		let bytUserProfile = JSON.parse(localStorage.getItem('profile'));
		return this.authHttp.post('/add-bill-projections', {"category": byt_model.category,
															"subCategory": byt_model.subCategory,
															"date": byt_model.date,
															"amount": byt_model.amount,
															"byt_email": bytUserProfile.email})
			.map((res: Response) => res.json() )
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'))
	}
}
@Injectable()
export class BYTPostExpenseProjection {
	constructor(public authHttp: AuthHttp) {}
	userProfile: any = JSON.parse(localStorage.getItem('profile'));
	bytPostExpenseProjectionForm(byt_model: any): Observable<any[]>{
		let bytUserProfile = JSON.parse(localStorage.getItem('profile'));
		return this.authHttp.post('/add-expense-projection', {"category": byt_model.category,
															  "subCategory": byt_model.subCategory,
															  "date": byt_model.date,
															  "amount": byt_model.amount,
															  "byt_email": bytUserProfile.email})
			.map((res: Response) => res.json() )
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'))
	}
}
@Injectable()
export class BYTPostIncome {
	constructor(public authHttp: AuthHttp) {}
	userProfile: any = JSON.parse(localStorage.getItem('profile'));
	bytPostIncomeForm(bytPostIncomeForm: any): Observable<any[]>{
		let bytUserProfile = JSON.parse(localStorage.getItem('profile'));
		return this.authHttp.post('/add-income', {"category": bytPostIncomeForm.category,
												  "description": bytPostIncomeForm.description,
												  "date": bytPostIncomeForm.date,
												  "amount": bytPostIncomeForm.amount,
												  "byt_email": bytUserProfile.email})
			.map((res: Response) => res.json() )
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'))
	}
}
@Injectable()
export class BYTPostAsset {
	constructor(public authHttp: AuthHttp) {}
	userProfile: any = JSON.parse(localStorage.getItem('profile'));
	bytPostAssetForm(bytPostAssetForm: any): Observable<any[]>{
		let bytUserProfile = JSON.parse(localStorage.getItem('profile'));
		return this.authHttp.post('/add-asset', {"category": bytPostAssetForm.category,
												  "description": bytPostAssetForm.description,
												  "date": bytPostAssetForm.date,
												  "amount": bytPostAssetForm.amount,
												  "byt_email": bytUserProfile.email})
			.map((res: Response) => res.json() )
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'))
	}
}
@Injectable()
export class BYTPostLiability {
	constructor(public authHttp: AuthHttp) {}
	userProfile: any = JSON.parse(localStorage.getItem('profile'));
	bytPostLiabilityForm(bytPostLiabilityForm: any): Observable<any[]>{
		let bytUserProfile = JSON.parse(localStorage.getItem('profile'));
		return this.authHttp.post('/add-liability', {"category": bytPostLiabilityForm.category,
												     "description": bytPostLiabilityForm.description,
												     "date": bytPostLiabilityForm.date,
												     "amount": bytPostLiabilityForm.amount,
												     "byt_email": bytUserProfile.email})
			.map((res: Response) => res.json() )
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'))
	}
}
@Injectable()
export class BYTPostBill {
	constructor(public authHttp: AuthHttp) {}
	userProfile: any = JSON.parse(localStorage.getItem('profile'));
	bytPostBillForm(bytPostBillForm: any): Observable<any[]>{
		let bytUserProfile = JSON.parse(localStorage.getItem('profile'));
		return this.authHttp.post('/add-bill', {"category": bytPostBillForm.category,
												"description": bytPostBillForm.description,
												"subCategory": bytPostBillForm.subCategory,
												"date": bytPostBillForm.date,
												"amount": bytPostBillForm.amount,
												"byt_email": bytUserProfile.email})
			.map((res: Response) => res.json() )
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'))
	}
}
@Injectable()
export class BYTPostExpense {
	constructor(public authHttp: AuthHttp) {}
	userProfile: any = JSON.parse(localStorage.getItem('profile'));
	bytPostExpenseForm(bytPostExpenseForm: any): Observable<any[]>{
		let bytUserProfile = JSON.parse(localStorage.getItem('profile'));
		return this.authHttp.post('/add-monthly-expense', {"category": bytPostExpenseForm.category,
														   "description": bytPostExpenseForm.description,
														   "subCategory": bytPostExpenseForm.subCategory,
												   		   "date": bytPostExpenseForm.date,
												 		   "amount": bytPostExpenseForm.amount,
														   "byt_email": bytUserProfile.email})
			.map((res: Response) => res.json() )
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'))
	}
}

@Injectable()
export class BYTRemoveTransaction {
	constructor(public authHttp: AuthHttp) {}
	userProfile: any = JSON.parse(localStorage.getItem('profile'));
	bytRemoveIncome(index: number): Observable<any[]>{
		let bytUserProfile = JSON.parse(localStorage.getItem('profile'));
		return this.authHttp.put('/remove-income', {"index": index,
													"byt_email": bytUserProfile.email})
			.map((res: Response) => res.json() )
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'))
	}
	bytRemoveIncomeProjection(index: number): Observable<any[]>{
		let bytUserProfile = JSON.parse(localStorage.getItem('profile'));
		return this.authHttp.put('/remove-income-projection', {"index": index,
															   "byt_email": bytUserProfile.email})
			.map((res: Response) => res.json() )
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'))
	}
	bytRemoveBill(index: number): Observable<any[]>{
		let bytUserProfile = JSON.parse(localStorage.getItem('profile'));
		return this.authHttp.put('/remove-bill', {"index": index,
												  "byt_email": bytUserProfile.email})
			.map((res: Response) => res.json() )
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'))
	}
	bytRemoveBillProjection(index: number): Observable<any[]>{
		let bytUserProfile = JSON.parse(localStorage.getItem('profile'));
		return this.authHttp.put('/remove-bill-projection', {"index": index,
												  			 "byt_email": bytUserProfile.email})
			.map((res: Response) => res.json() )
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'))
	}
	bytRemoveExpense(index: number): Observable<any[]>{
		let bytUserProfile = JSON.parse(localStorage.getItem('profile'));
		return this.authHttp.put('/remove-expense', {"index": index,
												  	 "byt_email": bytUserProfile.email})
			.map((res: Response) => res.json() )
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'))
	}
	bytRemoveExpenseProjection(index: number): Observable<any[]>{
		let bytUserProfile = JSON.parse(localStorage.getItem('profile'));
		return this.authHttp.put('/remove-expense-projection', {"index": index,
												  	 			"byt_email": bytUserProfile.email})
			.map((res: Response) => res.json() )
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'))
	}
	bytRemoveAsset(index: number): Observable<any[]>{
		let bytUserProfile = JSON.parse(localStorage.getItem('profile'));
		return this.authHttp.put('/remove-asset', {"index": index,
												   "byt_email": bytUserProfile.email})
			.map((res: Response) => res.json() )
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'))
	}
	bytRemoveLiability(index: number): Observable<any[]>{
		let bytUserProfile = JSON.parse(localStorage.getItem('profile'));
		return this.authHttp.put('/remove-liability', {"index": index,
												       "byt_email": bytUserProfile.email})
			.map((res: Response) => res.json() )
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'))
	}
}

@Injectable()
export class BYTStripePayment {
	constructor(private _http: Http) {}
	bytPostStripePayment(token_id: any, email: String): Observable<any[]>{
		return this._http.post('/charge', { "token_id": token_id, 
											"byt_email": email })
			.map((res: Response) => res.json() )
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'))
	}
	bytGoProSubscription(token_id: any, email: String): Observable<any[]>{
		return this._http.post('/byt-go-pro-subscription', { "token_id": token_id, 
											                 "byt_email": email })
			.map((res: Response) => res.json() )
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'))
	}
	bytCancelSubscription(email: String): Observable<any[]>{
		return this._http.post('/byt-cancel-subscription', { "byt_email": email } )
			.map((res: Response) => res.json() )
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'))
	}
}

@Injectable()
export class BYTPlaid {
	constructor(public authHttp: AuthHttp) {}
	userProfile: any = JSON.parse(localStorage.getItem('profile'));
	bytPostBankTransactions(public_token: Object): Observable<any[]>{
		let bytUserProfile = JSON.parse(localStorage.getItem('profile'));
		return this.authHttp.post('/authenticate', {"public_token": public_token,										
												    "byt_email": bytUserProfile.email})
			.map((res: Response) => res.json() )
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'))
	}
}