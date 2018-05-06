var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
	plaid_banking_transactions: [{
		id: Number,
		amount: Number,
		date: String,
		name: String
	}],
	stripe_token: {
		type: String
	},
	stripe_customer_id: {
		type: String
	},
	byt_paying_customer: {
		type: Boolean
	},
	stripe_subscription_id: {
		type: String
	},
	email: {
		type: String,
		lowercase: true
	},
	nickName: {
		type: String
	}, // nickname of user in auth0	
	incomeProjections: [{
		id: Number,
		description: String,
		category: String,
		amount: Number,
		date: Date
	}],
	billProjections: [{
		id: Number,
		description: String,
		category: String,
		subCategory: String,
		amount: Number,
		date: Date
	}],
	expenseProjections: [{
		id: Number,
		description: String,
		category: String,
		subCategory: String,
		amount: Number,
		date: Date
	}],
	income: [{
		id: Number,
		description: String,
		category: String,
		amount: Number,
		date: Date
	}],
	incomeDuringBudgetPeriod: [{
		id: Number,
		description: String,
		category: String,
		amount: Number,
		date: Date
	}],
	billsDuringBudgetPeriod: [{
		id: Number,
		description: String,
		category: String,
		subCategory: String,
		amount: Number,
		date: Date
	}],
	monthlyExpensesDuringBudgetPeriod: [{
		id: Number,
		description: String,
		category: String,
		subCategory: String,
		amount: Number,
		date: Date
	}],
	assets: [{
		id: Number,
		description: String,
		category: String,
		amount: Number,
		date: Date
	}],
	liabilities: [{
		id: Number,
		description: String,
		category: String,
		amount: Number,
		date: Date
	}],
	totalIncome: {
		id: Number,
		type: Number,
		default: 0
	},
	incomeProjectionsTotal: {
		id: Number,
		type: Number,
		default: 0
	},
	billProjectionsTotal: {
		id: Number,
		type: Number,
		default: 0
	},
	expenseProjectionsTotal: {
		id: Number,
		type: Number,
		default: 0
	},
	monthlyBills: [{
		id: Number,
		description: String,
		category: String,
		subCategory: String,
		amount: Number,
		date: Date
	}],
	billsTotal: {
		id: Number,
		type: Number,
		default: 0
	},
	totalAssets: {
		id: Number,
		type: Number,
		default: 0
	},
	totalLiabilities: {
		id: Number,
		type: Number,
		default: 0
	},
	monthlyExpenses: [{ 
		id: Number,
		description: String,
		category: String,
		subCategory: String,
		amount: Number,
		date: Date
	}],
	totalSpent: {
		id: Number,
		type: Number,
		default: 0
	},
	leftOver: {
		id: Number,
		type: Number,
		default: 0
	},	
	upBy: {
		id: Number,
		type: Number,
		default: 0
	},
	dailyBudget: {
		id: Number,
		type: Number,
		default: 0
	},
	daysLeft: {
		id: Number,
		type: Number,
		default: 0
	},
	periodStart: Date,
	periodStartCopy: Date,
	periodEnd: Date,
	periodEndCopy: Date,
	bytNumberOfDays: Number,
	today: Date,
	incomeCategoryTotals: [{
		category: String,
		total: Number
	}],
	assetCategoryTotals: [{
		category: String,
		total: Number
	}],
	liabilitiesCategoryTotals: [{
		category: String,
		total: Number
	}],
	billsCategoryTotals: [{
		category: String,
		total: Number,
		subCategory: [{
			name: String,
			total: Number
		}]
	}],
	expCategoryTotals: [{
		category: String,
		total: Number,
		subCategory: [{
			name: String,
			total: Number
		}]
	}]
});

UserSchema.methods.calcTotalIncome = function(allIncome){
	var total = 0;
	for (i = 0; i < allIncome.length; i++) {
		if(allIncome[i].date.getTime() >= this.periodStart.getTime() && allIncome[i].date.getTime() <= this.periodEnd.getTime()){
			total = total + allIncome[i].amount;
		}
	};
	this.totalIncome = total;
	this.save();
};
UserSchema.methods.calcIncomeDuringBudgetPeriod = function(allIncome){
	this.incomeDuringBudgetPeriod = [];
	for (i = 0; i < allIncome.length; i++) {
		if(allIncome[i].date.getTime() >= this.periodStart.getTime() && allIncome[i].date.getTime() <= this.periodEnd.getTime()){
			this.incomeDuringBudgetPeriod.push(allIncome[i]);
		}
	};
	this.save();
};
UserSchema.methods.calcBillsDuringBudgetPeriod = function(monthlyBills){
	this.billsDuringBudgetPeriod = [];
	for (i = 0; i < monthlyBills.length; i++) {
		if(monthlyBills[i].date.getTime() >= this.periodStart.getTime() && monthlyBills[i].date.getTime() <= this.periodEnd.getTime()){
			this.billsDuringBudgetPeriod.push(monthlyBills[i]);
		}
	};
	this.save();
};
UserSchema.methods.calcMonthlyExpensesDuringBudgetPeriod = function(monthlyExpenses){
	this.monthlyExpensesDuringBudgetPeriod = [];
	for (i = 0; i < monthlyExpenses.length; i++) {
		if(monthlyExpenses[i].date.getTime() >= this.periodStart.getTime() && monthlyExpenses[i].date.getTime() <= this.periodEnd.getTime()){
			this.monthlyExpensesDuringBudgetPeriod.push(monthlyExpenses[i]);
		}
	};
	this.save();
};
UserSchema.methods.calcTotalAssets = function(assets){
	var total = 0;
	for (i = 0; i < assets.length; i++) {
		total = total + assets[i].amount;
	};
	this.totalAssets = total;
	this.save();
};
UserSchema.methods.calcTotalIncomeProjections = function(incomeProjections){		
	var total = 0;
	for (i = 0; i < incomeProjections.length; i++) {	
		total = total + incomeProjections[i].amount;
	};
	this.incomeProjectionsTotal = total;
	this.save();
};

UserSchema.methods.calcTotalBillProjections = function(billProjections){		
	var total = 0;
	for (i = 0; i < billProjections.length; i++) {	
		total = total + billProjections[i].amount;
	};
	this.billProjectionsTotal = total;
	this.save();
};

UserSchema.methods.calcTotalExpenseProjections = function(expenseProjections){		
	var total = 0;
	for (i = 0; i < expenseProjections.length; i++) {	
		total = total + expenseProjections[i].amount;
	};
	this.expenseProjectionsTotal = total;
	this.save();
};

UserSchema.methods.calcTotalLiabilities = function(liabilities){		
	var total = 0;
	for (i = 0; i < liabilities.length; i++) {	
		total = total + liabilities[i].amount;
	};
	this.totalLiabilities = total;
	this.save();
};

UserSchema.methods.calcTotalBills = function(allbills){		
	var total = 0;
	for (i = 0; i < allbills.length; i++) {
		if(allbills[i].date.getTime() >= this.periodStart.getTime() && allbills[i].date.getTime() <= this.periodEnd.getTime()){
			total = total + allbills[i].amount;
		}	
	};
	this.billsTotal = total;
	this.save();
};

UserSchema.methods.calcTotalSpent = function(allExpenses){		
	var total = 0;
	for (i = 0; i < allExpenses.length; i++) {
		if(allExpenses[i].date.getTime() >= this.periodStart.getTime() && allExpenses[i].date.getTime() <= this.periodEnd.getTime()){
			total = total + allExpenses[i].amount;	
		}	
	};
	this.totalSpent = total;
	this.save();
};

UserSchema.methods.calcLeftOver = function(){
	this.leftOver = this.expenseProjectionsTotal - this.totalSpent;
	this.save();
};

UserSchema.methods.calcUpBy = function(){

	if(this.periodStart){
		console.log(this.today.getTime());
		console.log(this.periodStartCopy.getTime());
	    var y = this.today.getTime() - this.periodStartCopy.getTime();
	    var z = y / (1000*60*60*24);
	    var z = z + 1;
	    var z1 = Math.abs(z);
	    var z11 = Math.ceil(z1);

	    this.upBy = (z11 * this.dailyBudget) - this.totalSpent
		this.save();
	} else {
		console.log('no period start yet' + this.periodEnd)
	}
	
};

UserSchema.methods.calcDailyBudget = function(){
	this.dailyBudget = this.expenseProjectionsTotal / this.bytNumberOfDays;  
	this.save();
};

UserSchema.methods.calcDaysLeft = function(){
	if(this.periodEnd){
		this.daysLeft = ( ( this.periodEnd.getTime() - this.today.getTime() ) / (1000*60*60*24) )
		this.daysLeft = Math.ceil(this.daysLeft);
		this.save();
	} else {
		console.log('no period end yet' + this.periodEnd)
	}	
};

UserSchema.methods.calcToday = function(){
	// from StackOverFlow
	var offset = -5.0
	var clientDate = new Date();
	var utc = clientDate.getTime() + (clientDate.getTimezoneOffset() * 60000);
	var serverDate = new Date(utc + (3600000*offset));

	var dd = serverDate.getDate();
	var mm = serverDate.getMonth() + 1;
	var yyyy = serverDate.getFullYear();
	this.today = mm + '/' + dd + '/' + yyyy; 
	this.save();
};

UserSchema.methods.calcIncomeCategoryTotals = function(){
	this.incomeCategoryTotals = [
		{category: "Wages", total: 0},
		{category: "Rental Property", total: 0},
		{category: "Limited Partnerships", total: 0},
		{category: "Market Investments", total: 0},
		{category: "Sole Proprietorship", total: 0},
		{category: "Corporation", total: 0},
		{category: "Child Support", total: 0},
		{category: "Taxes", total: 0},
		{category: "Refund", total: 0},
		{category: "Other", total: 0}
	];

	for (i = 0; i < this.income.length; i++){
		if (this.income[i].category === "Wages") {
			this.incomeCategoryTotals[0].total += this.income[i].amount;
		};
		if (this.income[i].category === "Rental Property") {
			this.incomeCategoryTotals[1].total += this.income[i].amount;
		};
		if (this.income[i].category === "Limited Partnerships") {
			this.incomeCategoryTotals[2].total += this.income[i].amount;
		};
		if (this.income[i].category === "Market Investments") {
			this.incomeCategoryTotals[3].total += this.income[i].amount;
		};
		if (this.income[i].category === "Sole Proprietorship") {
			this.incomeCategoryTotals[4].total += this.income[i].amount;
		};
		if (this.income[i].category === "Corporation") {
			this.incomeCategoryTotals[5].total += this.income[i].amount;
		};
		if (this.income[i].category === "Child Support") {
			this.incomeCategoryTotals[6].total += this.income[i].amount;
		};
		if (this.income[i].category === "Taxes") {
			this.incomeCategoryTotals[7].total += this.income[i].amount;
		};
		if (this.income[i].category === "Refund") {
			this.incomeCategoryTotals[6].total += this.income[i].amount;
		};
		if (this.income[i].category === "Other") {
			this.incomeCategoryTotals[7].total += this.income[i].amount;
		};
		this.save();
	};
}

UserSchema.methods.calcAssetCategoryTotals = function(){
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

	for (i = 0; i < this.assets.length; i++){
		if (this.assets[i].category === "Cash - checking accounts") {
			this.assetCategoryTotals[0].total += this.assets[i].amount;
		};
		if (this.assets[i].category === "Cash - savings accounts") {
			this.assetCategoryTotals[1].total += this.assets[i].amount;
		};
		if (this.assets[i].category === "Special deposit accounts") {
			this.assetCategoryTotals[2].total += this.assets[i].amount;
		};
		if (this.assets[i].category === "Market investments") {
			this.assetCategoryTotals[3].total += this.assets[i].amount;
		};
		if (this.assets[i].category === "Certificate of deposit") {
			this.assetCategoryTotals[4].total += this.assets[i].amount;
		};
		if (this.assets[i].category === "Life insurance (cash value") {
			this.assetCategoryTotals[5].total += this.assets[i].amount;
		};
		if (this.assets[i].category === "Mutual funds") {
			this.assetCategoryTotals[6].total += this.assets[i].amount;
		};
		if (this.assets[i].category === "Car") {
			this.assetCategoryTotals[7].total += this.assets[i].amount;
		};
		if (this.assets[i].category === "Equity in private company") {
			this.assetCategoryTotals[8].total += this.assets[i].amount;
		};
		if (this.assets[i].category === "Other") {
			this.assetCategoryTotals[9].total += this.assets[i].amount;
		};
		this.save();
	};
}

UserSchema.methods.calcLiabilityCategoryTotals = function(){
	this.liabilitiesCategoryTotals = [
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

	for (i = 0; i < this.liabilities.length; i++){
		if (this.liabilities[i].category === "Credit card debt") {
			this.liabilitiesCategoryTotals[0].total += this.liabilities[i].amount;
		};
		if (this.liabilities[i].category === "Medical debt") {
			this.liabilitiesCategoryTotals[1].total += this.liabilities[i].amount;
		};
		if (this.liabilities[i].category === "Unpaid rent") {
			this.liabilitiesCategoryTotals[2].total += this.liabilities[i].amount;
		};
		if (this.liabilities[i].category === "Unpaid utilities") {
			this.liabilitiesCategoryTotals[3].total += this.liabilities[i].amount;
		};
		if (this.liabilities[i].category === "Auto loan") {
			this.liabilitiesCategoryTotals[4].total += this.liabilities[i].amount;
		};
		if (this.liabilities[i].category === "Personal loan") {
			this.liabilitiesCategoryTotals[5].total += this.liabilities[i].amount;
		};
		if (this.liabilities[i].category === "Consolidation loan") {
			this.liabilitiesCategoryTotals[6].total += this.liabilities[i].amount;
		};
		if (this.liabilities[i].category === "Student loan") {
			this.liabilitiesCategoryTotals[7].total += this.liabilities[i].amount;
		};
		if (this.liabilities[i].category === "Home loan") {
			this.liabilitiesCategoryTotals[8].total += this.liabilities[i].amount;
		};
		if (this.liabilities[i].category === "Business loan") {
			this.liabilitiesCategoryTotals[9].total += this.liabilities[i].amount;
		};
		if (this.liabilities[i].category === "Other") {
			this.liabilitiesCategoryTotals[10].total += this.liabilities[i].amount;
		};
		this.save();
	};
}
UserSchema.methods.calcBillCategoryTotals = function(){
	this.billsCategoryTotals = [	
		{
			category: "Housing",
			total: 0,
			subCategory: [{
				name: "Rent",
				total: 0
			},
			{
				name: "Mortgage",
				total: 0	
			},
			{
				name: "Vacation home",
				total: 0	
			}]
		},
		{
			category: "Health",
			total: 0,
			subCategory: [{
				name: "Gym",
				total: 0
			},
			{
				name: "Yoga",
				total: 0	
			},
			{
				name: "Pilates",
				total: 0		
			},
			{
				name: "Boxing",
				total: 0	
			},
			{
				name: "Martial arts",
				total: 0
			},
			{
				name: "Health Insurance",
				total: 0
			},
			{
				name: "Pharmacy",
				total: 0
			},
			{
				name: "Eyecare",
				total: 0
			},
			{
				name: "Doctor",
				total: 0
			},
			{
				name: "Dentist",
				total: 0
			}]
		},
		{
			category: "Transportation",
			total: 0,
			subCategory: [{
				name: "Metro Card",
				total: 0 
			},
			{
				name: "EZ Pass",
				total: 0 
			},
			{
				name: "Gas",
				total: 0
			},
			{
				name: "Parking",
				total: 0
			}]
		},
		{
			category: "Utilities",
			total: 0,
			subCategory: [{
				name: "Electric",
				total: 0 
			},
			{
				name: "Water",
				total: 0 
			},
			{
				name: "Garbage",
				total: 0
			},
			{
				name: "Home/Cell phone",
				total: 0
			},
			{
				name: "Internet",
				total: 0	
			}]
		},
		{
			category: "Insurance",
			total: 0,
			subCategory: [{
				name: "Car insurance",
				total: 0 
			},
			{
				name: "Homeowner's insurance",
				total: 0 
			},
			{
				name: "Renter's insurance",
				total: 0
			},
			{
				name: "Life insurance",
				total: 0
			}]
		},
		{ 
			category: "Debt",
			total: 0,
			subCategory: [{
				name: "Credit card",
				total: 0 
			},
			{
				name: "Student loan",
				total: 0 
			},
			{
				name: "Personal loan",
				total: 0
			},
			{
				name: "Car loan",
				total: 0
			},
			{
				name: "Medical",
				total: 0
			}]
		},
		{
			category: "Taxes",
			total: 0,
			subCategory: [{
				name: "Personal",
				total: 0 
			},
			{
				name: "Business",
				total: 0 
			},
			{
				name: "House",
				total: 0
			}]
		},
		{
			category: "Entertainment",
			total: 0,
			subCategory: [{
				name: "Streaming movies/music",
				total: 0 
			},
			{
				name: "Monthly subscriptions",
				total: 0 
			}]
		},
		{
			category: "Child Care",
			total: 0,
			subCategory: [{
				name: "Babysitter",
				total: 0 
			},
			{
				name: "Daycare",
				total: 0 
			},
			{
				name: "After School Programs",
				total: 0 
			},
			{
				name: "Youth Leagues",
				total: 0 
			},
			{
				name: "Medical",
				total: 0 
			},
			{
				name: "Nutrition",
				total: 0 
			}]
		},
		{ 
			category: "Miscellaneous",
			total: 0,
			subCategory: [{
				name: "Small / Unforeseen Bill",
				total: 0 
			}]
		}
	];

	for (i = 0; i < this.monthlyBills.length; i++){
		if (this.monthlyBills[i].category === "Housing") {
			this.billsCategoryTotals[0].total += this.monthlyBills[i].amount;	
			if (this.monthlyBills[i].subCategory === "Rent") {
				this.billsCategoryTotals[0].subCategory[0].total += this.monthlyBills[i].amount;
			}
			if (this.monthlyBills[i].subCategory === "Mortgage") {
				this.billsCategoryTotals[0].subCategory[1].total += this.monthlyBills[i].amount;
			}
			if (this.monthlyBills[i].subCategory === "Vacation home") {
				this.billsCategoryTotals[0].subCategory[2].total += this.monthlyBills[i].amount;
			}
		};
		if (this.monthlyBills[i].category === "Health") {
			this.billsCategoryTotals[1].total += this.monthlyBills[i].amount;	
			if (this.monthlyBills[i].subCategory === "Gym") {
				this.billsCategoryTotals[1].subCategory[0].total += this.monthlyBills[i].amount;
			}
			if (this.monthlyBills[i].subCategory === "Yoga") {
				this.billsCategoryTotals[1].subCategory[1].total += this.monthlyBills[i].amount;
			}
			if (this.monthlyBills[i].subCategory === "Pilates") {
				this.billsCategoryTotals[1].subCategory[2].total += this.monthlyBills[i].amount;
			}
			if (this.monthlyBills[i].subCategory === "Boxing") {
				this.billsCategoryTotals[1].subCategory[3].total += this.monthlyBills[i].amount;
			}
			if (this.monthlyBills[i].subCategory === "Martial arts") {
				this.billsCategoryTotals[1].subCategory[4].total += this.monthlyBills[i].amount;
			}
			if (this.monthlyBills[i].subCategory === "Health Insurance") {
				this.billsCategoryTotals[1].subCategory[5].total += this.monthlyBills[i].amount;
			}
			if (this.monthlyBills[i].subCategory === "Pharmacy") {
				this.billsCategoryTotals[1].subCategory[6].total += this.monthlyBills[i].amount;
			}
			if (this.monthlyBills[i].subCategory === "Eyecare") {
				this.billsCategoryTotals[1].subCategory[7].total += this.monthlyBills[i].amount;
			}
			if (this.monthlyBills[i].subCategory === "Doctor") {
				this.billsCategoryTotals[1].subCategory[8].total += this.monthlyBills[i].amount;
			}
			if (this.monthlyBills[i].subCategory === "Dentist") {
				this.billsCategoryTotals[1].subCategory[9].total += this.monthlyBills[i].amount;
			}
		};
		if (this.monthlyBills[i].category === "Transportation") {
			this.billsCategoryTotals[2].total += this.monthlyBills[i].amount;	
			if (this.monthlyBills[i].subCategory === "Metro Card") {
				this.billsCategoryTotals[2].subCategory[0].total += this.monthlyBills[i].amount;
			}
			if (this.monthlyBills[i].subCategory === "EZ Pass") {
				this.billsCategoryTotals[2].subCategory[1].total += this.monthlyBills[i].amount;
			}
			if (this.monthlyBills[i].subCategory === "Gas") {
				this.billsCategoryTotals[2].subCategory[2].total += this.monthlyBills[i].amount;
			}
			if (this.monthlyBills[i].subCategory === "Parking") {
				this.billsCategoryTotals[2].subCategory[3].total += this.monthlyBills[i].amount;
			}
		};
		if (this.monthlyBills[i].category === "Utilities") {
			this.billsCategoryTotals[3].total += this.monthlyBills[i].amount;	
			if (this.monthlyBills[i].subCategory === "Electric") {
				this.billsCategoryTotals[3].subCategory[0].total += this.monthlyBills[i].amount;
			}
			if (this.monthlyBills[i].subCategory === "Water") {
				this.billsCategoryTotals[3].subCategory[1].total += this.monthlyBills[i].amount;
			}
			if (this.monthlyBills[i].subCategory === "Garbage") {
				this.billsCategoryTotals[3].subCategory[2].total += this.monthlyBills[i].amount;
			}
			if (this.monthlyBills[i].subCategory === "Home/Cell phone") {
				this.billsCategoryTotals[3].subCategory[3].total += this.monthlyBills[i].amount;
			}
			if (this.monthlyBills[i].subCategory === "Internet") {
				this.billsCategoryTotals[3].subCategory[4].total += this.monthlyBills[i].amount;
			}
		};
		if (this.monthlyBills[i].category === "Insurance") {
			this.billsCategoryTotals[4].total += this.monthlyBills[i].amount;	
			if (this.monthlyBills[i].subCategory === "Car insurance") {
				this.billsCategoryTotals[4].subCategory[0].total += this.monthlyBills[i].amount;
			}
			if (this.monthlyBills[i].subCategory === "Homeowner's insurance") {
				this.billsCategoryTotals[4].subCategory[1].total += this.monthlyBills[i].amount;
			}
			if (this.monthlyBills[i].subCategory === "Renter's insurance") {
				this.billsCategoryTotals[4].subCategory[2].total += this.monthlyBills[i].amount;
			}
			if (this.monthlyBills[i].subCategory === "Life insurance") {
				this.billsCategoryTotals[4].subCategory[3].total += this.monthlyBills[i].amount;
			}
		};
		if (this.monthlyBills[i].category === "Debt") {
			this.billsCategoryTotals[5].total += this.monthlyBills[i].amount;	
			if (this.monthlyBills[i].subCategory === "Credit card") {
				this.billsCategoryTotals[5].subCategory[0].total += this.monthlyBills[i].amount;
			}
			if (this.monthlyBills[i].subCategory === "Student loan") {
				this.billsCategoryTotals[5].subCategory[1].total += this.monthlyBills[i].amount;
			}
			if (this.monthlyBills[i].subCategory === "Personal loan") {
				this.billsCategoryTotals[5].subCategory[2].total += this.monthlyBills[i].amount;
			}
			if (this.monthlyBills[i].subCategory === "Car loan") {
				this.billsCategoryTotals[5].subCategory[3].total += this.monthlyBills[i].amount;
			}
			if (this.monthlyBills[i].subCategory === "Medical") {
				this.billsCategoryTotals[5].subCategory[4].total += this.monthlyBills[i].amount;
			}
		};
		if (this.monthlyBills[i].category === "Taxes") {
			this.billsCategoryTotals[6].total += this.monthlyBills[i].amount;	
			if (this.monthlyBills[i].subCategory === "Personal") {
				this.billsCategoryTotals[6].subCategory[0].total += this.monthlyBills[i].amount;
			}
			if (this.monthlyBills[i].subCategory === "Business") {
				this.billsCategoryTotals[6].subCategory[1].total += this.monthlyBills[i].amount;
			}
			if (this.monthlyBills[i].subCategory === "House") {
				this.billsCategoryTotals[6].subCategory[2].total += this.monthlyBills[i].amount;
			}
		};
		if (this.monthlyBills[i].category === "Entertainment") {
			this.billsCategoryTotals[7].total += this.monthlyBills[i].amount;	
			if (this.monthlyBills[i].subCategory === "Streaming movies/music") {
				this.billsCategoryTotals[7].subCategory[0].total += this.monthlyBills[i].amount;
			}
			if (this.monthlyBills[i].subCategory === "Monthly subscriptions") {
				this.billsCategoryTotals[7].subCategory[1].total += this.monthlyBills[i].amount;
			}
		};
		if (this.monthlyBills[i].category === "Child Care") {
			this.billsCategoryTotals[8].total += this.monthlyBills[i].amount;	
			if (this.monthlyBills[i].subCategory === "Babysitter") {
				this.billsCategoryTotals[8].subCategory[0].total += this.monthlyBills[i].amount;
			}
			if (this.monthlyBills[i].subCategory === "Daycare") {
				this.billsCategoryTotals[8].subCategory[1].total += this.monthlyBills[i].amount;
			}
			if (this.monthlyBills[i].subCategory === "After School Programs") {
				this.billsCategoryTotals[8].subCategory[2].total += this.monthlyBills[i].amount;
			}
			if (this.monthlyBills[i].subCategory === "Youth Leagues") {
				this.billsCategoryTotals[8].subCategory[3].total += this.monthlyBills[i].amount;
			}
			if (this.monthlyBills[i].subCategory === "Medical") {
				this.billsCategoryTotals[8].subCategory[4].total += this.monthlyBills[i].amount;
			}
			if (this.monthlyBills[i].subCategory === "Nutrition") {
				this.billsCategoryTotals[8].subCategory[5].total += this.monthlyBills[i].amount;
			}
		};
		if (this.monthlyBills[i].category === "Miscellaneous") {
			this.billsCategoryTotals[9].total += this.monthlyBills[i].amount;	
			if (this.monthlyBills[i].subCategory === "Small / Unforeseen Bill") {
				this.billsCategoryTotals[9].subCategory[0].total += this.monthlyBills[i].amount;
			}
		};
	};
	this.save();
};

UserSchema.methods.calcExpCategoryTotals = function(){
	this.expCategoryTotals = [
		{
			category: "Clothing",
			total: 0,
			subCategory: [{
				name: "Children's Clothing",
				total: 0
			},
			{
				name: "Adult's Clothing",
				total: 0	
			}]
		},
		{
			category: "Education",
			total: 0,
			subCategory: [{
				name: "Tuition",
				total: 0
			},
			{
				name: "Books",
				total: 0	
			},
			{
				name: "School Supplies",
				total: 0		
			},
			{
				name: "Field Trips",
				total: 0	
			},
			{
				name: "Student Loan Payment",
				total: 0
			},
			{
				name: "Magazines",
				total: 0
			}]
		},
		{
			category: "Food",
			total: 0,
			subCategory: [{
				name: "Groceries",
				total: 0 
			},
			{
				name: "Restaurant",
				total: 0 
			},
			{
				name: "Pet Food",
				total: 0
			},
			{
				name: "Junk Food",
				total: 0
			},
			{
				name: "Coffee",
				total: 0	
			}]
		},
		{
			category: "Gift",
			total: 0,
			subCategory: [{
				name: "Birthday",
				total: 0 
			},
			{
				name: "Valentine's Day",
				total: 0 
			},
			{
				name: "Anniversary",
				total: 0
			},
			{
				name: "Wedding",
				total: 0
			},
			{
				name: "Christmas",
				total: 0	
			},
			{
				name: "Special Occasion",
				total: 0	
			}]
		},
		{
			category: "Giving",
			total: 0,
			subCategory: [{
				name: "Tithing",
				total: 0 
			},
			{
				name: "Offerings",
				total: 0 
			},
			{
				name: "Charities",
				total: 0
			},
			{
				name: "Family",
				total: 0
			}]
		},
		{ 
			category: "Household",
			total: 0,
			subCategory: [{
				name: "Toiletries",
				total: 0 
			},
			{
				name: "Laundry Detergent",
				total: 0 
			},
			{
				name: "Dishwasher Detergent",
				total: 0
			},
			{
				name: "Cleaning Supplies",
				total: 0
			},
			{
				name: "Tools",
				total: 0	
			},
			{
				name: "Furniture",
				total: 0	
			},
			{
				name: "Decorating",
				total: 0	
			},
			{
				name: "Home Improvement",
				total: 0	
			},
			{
				name: "Home Repair",
				total: 0	
			}]
		},
		{
			category: "Medical",
			total: 0,
			subCategory: [{
				name: "Primary Care",
				total: 0 
			},
			{
				name: "Dental Care",
				total: 0 
			},
			{
				name: "Specialty Care",
				total: 0
			},
			{
				name: "Medications",
				total: 0
			},
			{
				name: "Medical Devices",
				total: 0	
			}]
		},
		{
			category: "Personal",
			total: 0,
			subCategory: [{
				name: "Hair & Hair Cuts",
				total: 0 
			},
			{
				name: "Salon Services",
				total: 0 
			},
			{
				name: "Cosmetics",
				total: 0
			},
			{
				name: "Babysitter",
				total: 0
			},
			{
				name: "Laundry",
				total: 0
			},
			{
				name: "Spa & Massage",
				total: 0
			}]
		},
		{
			category: "Play",
			total: 0,
			subCategory: [{
				name: "Movies",
				total: 0 
			},
			{
				name: "Clubs / Bars",
				total: 0 
			},
			{
				name: "Entertainment",
				total: 0
			},
			{
				name: "Games",
				total: 0
			},
			{
				name: "Vacations",
				total: 0
			},
			{
				name: "Sporting Events",
				total: 0
			},
			{
				name: "Amusement Park",
				total: 0
			}]
		},
		{ 
			category: "Events",
			total: 0,
			subCategory: [{
				name: "Moving",
				total: 0 
			},
			{
				name: "Wedding",
				total: 0 
			},
			{
				name: "Birthday parties",
				total: 0 
			},
			{
				name: "Baby showers",
				total: 0 
			},
			{
				name: "Special events",
				total: 0 
			}]
		},
		{ 
			category: "Transportation",
			total: 0,
			subCategory: [{
				name: "Fuel",
				total: 0 
			},
			{
				name: "Tires",
				total: 0 
			},
			{
				name: "Oil Changes",
				total: 0
			},
			{
				name: "Maintenance",
				total: 0
			},
			{
				name: "Parking Fees",
				total: 0
			},
			{
				name: "Repairs",
				total: 0
			},
			{
				name: "DMV Fees",
				total: 0
			},
			{
				name: "Vehicle Replacement",
				total: 0
			},
			{
				name: "Taxi",
				total: 0
			},
			{
				name: "Public Transportation",
				total: 0
			},
			{
				name: "Tolls",
				total: 0
			},
			{
				name: "Auto Payment",
				total: 0
			},
			{
				name: "Auto Insurance",
				total: 0
			}]
		},
		{ 
			category: "Travel",
			total: 0,
			subCategory: [{
				name: "Air Travel",
				total: 0 
			},
			{
				name: "Hotel",
				total: 0 
			},
			{
				name: "Rental Car & Taxi",
				total: 0
			},
			{
				name: "Vacations",
				total: 0
			}]
		},
		{ 
			category: "Pets",
			total: 0,
			subCategory: [{
				name: "Pet Food & Supplies",
				total: 0 
			},
			{
				name: "Pet Grooming",
				total: 0 
			},
			{
				name: "Veterinary",
				total: 0
			}]
		},
		{ 
			category: "Kids",
			total: 0,
			subCategory: [{
				name: "Allowance",
				total: 0 
			},
			{
				name: "Baby Supplies",
				total: 0 
			},
			{
				name: "Babysitter & Daycare",
				total: 0
			},
			{
				name: "Child Support",
				total: 0
			},
			{
				name: "Kids Activities",
				total: 0
			},
			{
				name: "Toys",
				total: 0
			}]
		},
		{ 
			category: "Miscellaneous",
			total: 0,
			subCategory: [{
				name: "Day-To-Day Expenses",
				total: 0 
			}]
		}
	]
	for (i = 0; i < this.monthlyExpenses.length; i++){			
		if (this.monthlyExpenses[i].category === "Clothing") {
			this.expCategoryTotals[0].total += this.monthlyExpenses[i].amount;	
			if (this.monthlyExpenses[i].subCategory === "Children's Clothing") {
				this.expCategoryTotals[0].subCategory[0].total += this.monthlyExpenses[i].amount;
			}
			if (this.monthlyExpenses[i].subCategory === "Adult's Clothing") {
				this.expCategoryTotals[0].subCategory[1].total += this.monthlyExpenses[i].amount;
			}
		};
		if (this.monthlyExpenses[i].category === "Education") {
			this.expCategoryTotals[1].total += this.monthlyExpenses[i].amount;	
			if (this.monthlyExpenses[i].subCategory === "Tuition") {
				this.expCategoryTotals[1].subCategory[0].total += this.monthlyExpenses[i].amount;
			}
			if (this.monthlyExpenses[i].subCategory === "Books") {
				this.expCategoryTotals[1].subCategory[1].total += this.monthlyExpenses[i].amount;
			}
			if (this.monthlyExpenses[i].subCategory === "School Supplies") {
				this.expCategoryTotals[1].subCategory[2].total += this.monthlyExpenses[i].amount;
			}
			if (this.monthlyExpenses[i].subCategory === "Field Trips") {
				this.expCategoryTotals[1].subCategory[3].total += this.monthlyExpenses[i].amount;
			}
			if (this.monthlyExpenses[i].subCategory === "Student Loan Payment") {
				this.expCategoryTotals[1].subCategory[4].total += this.monthlyExpenses[i].amount;
			}
			if (this.monthlyExpenses[i].subCategory === "Magazines") {
				this.expCategoryTotals[1].subCategory[5].total += this.monthlyExpenses[i].amount;
			}
		};
		if (this.monthlyExpenses[i].category === "Food") {
			this.expCategoryTotals[2].total += this.monthlyExpenses[i].amount;	
			if (this.monthlyExpenses[i].subCategory === "Groceries") {
				this.expCategoryTotals[2].subCategory[0].total += this.monthlyExpenses[i].amount;
			}
			if (this.monthlyExpenses[i].subCategory === "Restaurant") {
				this.expCategoryTotals[2].subCategory[1].total += this.monthlyExpenses[i].amount;
			}
			if (this.monthlyExpenses[i].subCategory === "Pet Food") {
				this.expCategoryTotals[2].subCategory[2].total += this.monthlyExpenses[i].amount;
			}
			if (this.monthlyExpenses[i].subCategory === "Junk Food") {
				this.expCategoryTotals[2].subCategory[3].total += this.monthlyExpenses[i].amount;
			}
			if (this.monthlyExpenses[i].subCategory === "Coffee") {
				this.expCategoryTotals[2].subCategory[4].total += this.monthlyExpenses[i].amount;
			}
		};
		if (this.monthlyExpenses[i].category === "Gift") {
			this.expCategoryTotals[3].total += this.monthlyExpenses[i].amount;	
			if (this.monthlyExpenses[i].subCategory === "Birthday") {
				this.expCategoryTotals[3].subCategory[0].total += this.monthlyExpenses[i].amount;
			}
			if (this.monthlyExpenses[i].subCategory === "Valentine's Day") {
				this.expCategoryTotals[3].subCategory[1].total += this.monthlyExpenses[i].amount;
			}
			if (this.monthlyExpenses[i].subCategory === "Anniversary") {
				this.expCategoryTotals[3].subCategory[2].total += this.monthlyExpenses[i].amount;
			}
			if (this.monthlyExpenses[i].subCategory === "Wedding") {
				this.expCategoryTotals[3].subCategory[3].total += this.monthlyExpenses[i].amount;
			}
			if (this.monthlyExpenses[i].subCategory === "Christmas") {
				this.expCategoryTotals[3].subCategory[4].total += this.monthlyExpenses[i].amount;
			}
			if (this.monthlyExpenses[i].subCategory === "Special Occasion") {
				this.expCategoryTotals[3].subCategory[5].total += this.monthlyExpenses[i].amount;
			}
		};
		if (this.monthlyExpenses[i].category === "Giving") {
			this.expCategoryTotals[4].total += this.monthlyExpenses[i].amount;	
			if (this.monthlyExpenses[i].subCategory === "Tithing") {
				this.expCategoryTotals[4].subCategory[0].total += this.monthlyExpenses[i].amount;
			}
			if (this.monthlyExpenses[i].subCategory === "Offerings") {
				this.expCategoryTotals[4].subCategory[1].total += this.monthlyExpenses[i].amount;
			}
			if (this.monthlyExpenses[i].subCategory === "Charities") {
				this.expCategoryTotals[4].subCategory[2].total += this.monthlyExpenses[i].amount;
			}
			if (this.monthlyExpenses[i].subCategory === "Family") {
				this.expCategoryTotals[4].subCategory[3].total += this.monthlyExpenses[i].amount;
			}
		};
		if (this.monthlyExpenses[i].category === "Household") {
			this.expCategoryTotals[5].total += this.monthlyExpenses[i].amount;	
			if (this.monthlyExpenses[i].subCategory === "Toiletries") {
				this.expCategoryTotals[5].subCategory[0].total += this.monthlyExpenses[i].amount;
			}
			if (this.monthlyExpenses[i].subCategory === "Laundry Detergent") {
				this.expCategoryTotals[5].subCategory[1].total += this.monthlyExpenses[i].amount;
			}
			if (this.monthlyExpenses[i].subCategory === "Dishwasher Detergent") {
				this.expCategoryTotals[5].subCategory[2].total += this.monthlyExpenses[i].amount;
			}
			if (this.monthlyExpenses[i].subCategory === "Cleaning Supplies") {
				this.expCategoryTotals[5].subCategory[3].total += this.monthlyExpenses[i].amount;
			}
			if (this.monthlyExpenses[i].subCategory === "Tools") {
				this.expCategoryTotals[5].subCategory[4].total += this.monthlyExpenses[i].amount;
			}
			if (this.monthlyExpenses[i].subCategory === "Furniture") {
				this.expCategoryTotals[5].subCategory[5].total += this.monthlyExpenses[i].amount;
			}
			if (this.monthlyExpenses[i].subCategory === "Decorating") {
				this.expCategoryTotals[5].subCategory[6].total += this.monthlyExpenses[i].amount;
			}
			if (this.monthlyExpenses[i].subCategory === "Home Improvement") {
				this.expCategoryTotals[5].subCategory[7].total += this.monthlyExpenses[i].amount;
			}
			if (this.monthlyExpenses[i].subCategory === "Home Repair") {
				this.expCategoryTotals[5].subCategory[8].total += this.monthlyExpenses[i].amount;
			}
		};
		if (this.monthlyExpenses[i].category === "Medical") {
			this.expCategoryTotals[6].total += this.monthlyExpenses[i].amount;	
			if (this.monthlyExpenses[i].subCategory === "Primary Care") {
				this.expCategoryTotals[6].subCategory[0].total += this.monthlyExpenses[i].amount;
			}
			if (this.monthlyExpenses[i].subCategory === "Dental Care") {
				this.expCategoryTotals[6].subCategory[1].total += this.monthlyExpenses[i].amount;
			}
			if (this.monthlyExpenses[i].subCategory === "Specialty Care") {
				this.expCategoryTotals[6].subCategory[2].total += this.monthlyExpenses[i].amount;
			}
			if (this.monthlyExpenses[i].subCategory === "Medications") {
				this.expCategoryTotals[6].subCategory[3].total += this.monthlyExpenses[i].amount;
			}
			if (this.monthlyExpenses[i].subCategory === "Medical Devices") {
				this.expCategoryTotals[6].subCategory[4].total += this.monthlyExpenses[i].amount;
			}
		};
		if (this.monthlyExpenses[i].category === "Personal") {
			this.expCategoryTotals[7].total += this.monthlyExpenses[i].amount;	
			if (this.monthlyExpenses[i].subCategory === "Hair & Hair Cuts") {
				this.expCategoryTotals[7].subCategory[0].total += this.monthlyExpenses[i].amount;
			}
			if (this.monthlyExpenses[i].subCategory === "Salon Services") {
				this.expCategoryTotals[7].subCategory[1].total += this.monthlyExpenses[i].amount;
			}
			if (this.monthlyExpenses[i].subCategory === "Cosmetics") {
				this.expCategoryTotals[7].subCategory[2].total += this.monthlyExpenses[i].amount;
			}
			if (this.monthlyExpenses[i].subCategory === "Babysitter") {
				this.expCategoryTotals[7].subCategory[3].total += this.monthlyExpenses[i].amount;
			}
			if (this.monthlyExpenses[i].subCategory === "Laundry") {
				this.expCategoryTotals[7].subCategory[2].total += this.monthlyExpenses[i].amount;
			}
			if (this.monthlyExpenses[i].subCategory === "Spa & Massage") {
				this.expCategoryTotals[7].subCategory[3].total += this.monthlyExpenses[i].amount;
			}
		};
		if (this.monthlyExpenses[i].category === "Play") {
			this.expCategoryTotals[8].total += this.monthlyExpenses[i].amount;	
			if (this.monthlyExpenses[i].subCategory === "Movies") {
				this.expCategoryTotals[8].subCategory[0].total += this.monthlyExpenses[i].amount;
			}
			if (this.monthlyExpenses[i].subCategory === "Clubs / Bars") {
				this.expCategoryTotals[8].subCategory[1].total += this.monthlyExpenses[i].amount;
			}
			if (this.monthlyExpenses[i].subCategory === "Entertainment") {
				this.expCategoryTotals[8].subCategory[2].total += this.monthlyExpenses[i].amount;
			}
			if (this.monthlyExpenses[i].subCategory === "Games") {
				this.expCategoryTotals[8].subCategory[3].total += this.monthlyExpenses[i].amount;
			}
			if (this.monthlyExpenses[i].subCategory === "Vacations") {
				this.expCategoryTotals[8].subCategory[4].total += this.monthlyExpenses[i].amount;
			}
			if (this.monthlyExpenses[i].subCategory === "Sporting Events") {
				this.expCategoryTotals[8].subCategory[5].total += this.monthlyExpenses[i].amount;
			}
			if (this.monthlyExpenses[i].subCategory === "Amusement Park") {
				this.expCategoryTotals[8].subCategory[6].total += this.monthlyExpenses[i].amount;
			}
		};
		if (this.monthlyExpenses[i].category === "Events") {
			this.expCategoryTotals[9].total += this.monthlyExpenses[i].amount;	
			if (this.monthlyExpenses[i].subCategory === "Moving") {
				this.expCategoryTotals[9].subCategory[0].total += this.monthlyExpenses[i].amount;
			}
			if (this.monthlyExpenses[i].subCategory === "Wedding") {
				this.expCategoryTotals[9].subCategory[1].total += this.monthlyExpenses[i].amount;
			}
			if (this.monthlyExpenses[i].subCategory === "Birthday parties") {
				this.expCategoryTotals[9].subCategory[2].total += this.monthlyExpenses[i].amount;
			}
			if (this.monthlyExpenses[i].subCategory === "Baby showers") {
				this.expCategoryTotals[9].subCategory[3].total += this.monthlyExpenses[i].amount;
			}
			if (this.monthlyExpenses[i].subCategory === "Special events") {
				this.expCategoryTotals[9].subCategory[4].total += this.monthlyExpenses[i].amount;
			}
		};
		if (this.monthlyExpenses[i].category === "Transportation") {
			this.expCategoryTotals[10].total += this.monthlyExpenses[i].amount;	
			if (this.monthlyExpenses[i].subCategory === "Fuel") {
				this.expCategoryTotals[10].subCategory[0].total += this.monthlyExpenses[i].amount;
			}
			if (this.monthlyExpenses[i].subCategory === "Tires") {
				this.expCategoryTotals[10].subCategory[1].total += this.monthlyExpenses[i].amount;
			}
			if (this.monthlyExpenses[i].subCategory === "Oil Changes") {
				this.expCategoryTotals[10].subCategory[2].total += this.monthlyExpenses[i].amount;
			}
			if (this.monthlyExpenses[i].subCategory === "Maintenance") {
				this.expCategoryTotals[10].subCategory[3].total += this.monthlyExpenses[i].amount;
			}
			if (this.monthlyExpenses[i].subCategory === "Parking Fees") {
				this.expCategoryTotals[10].subCategory[4].total += this.monthlyExpenses[i].amount;
			}
			if (this.monthlyExpenses[i].subCategory === "Repairs") {
				this.expCategoryTotals[10].subCategory[5].total += this.monthlyExpenses[i].amount;
			}
			if (this.monthlyExpenses[i].subCategory === "DMV Fees") {
				this.expCategoryTotals[10].subCategory[6].total += this.monthlyExpenses[i].amount;
			}
			if (this.monthlyExpenses[i].subCategory === "Vehicle Replacement") {
				this.expCategoryTotals[10].subCategory[7].total += this.monthlyExpenses[i].amount;
			}
			if (this.monthlyExpenses[i].subCategory === "Taxi") {
				this.expCategoryTotals[10].subCategory[8].total += this.monthlyExpenses[i].amount;
			}
			if (this.monthlyExpenses[i].subCategory === "Public Transportation") {
				this.expCategoryTotals[10].subCategory[9].total += this.monthlyExpenses[i].amount;
			}
			if (this.monthlyExpenses[i].subCategory === "Tolls") {
				this.expCategoryTotals[10].subCategory[10].total += this.monthlyExpenses[i].amount;
			}
			if (this.monthlyExpenses[i].subCategory === "Auto Payment") {
				this.expCategoryTotals[10].subCategory[11].total += this.monthlyExpenses[i].amount;
			}
			if (this.monthlyExpenses[i].subCategory === "Auto Insurance") {
				this.expCategoryTotals[10].subCategory[12].total += this.monthlyExpenses[i].amount;
			}
		};
		if (this.monthlyExpenses[i].category === "Travel") {
			this.expCategoryTotals[11].total += this.monthlyExpenses[i].amount;	
			if (this.monthlyExpenses[i].subCategory === "Air Travel") {
				this.expCategoryTotals[11].subCategory[0].total += this.monthlyExpenses[i].amount;
			}
			if (this.monthlyExpenses[i].subCategory === "Hotel") {
				this.expCategoryTotals[11].subCategory[1].total += this.monthlyExpenses[i].amount;
			}
			if (this.monthlyExpenses[i].subCategory === "Rental Car & Taxi") {
				this.expCategoryTotals[11].subCategory[2].total += this.monthlyExpenses[i].amount;
			}
			if (this.monthlyExpenses[i].subCategory === "Vacations") {
				this.expCategoryTotals[11].subCategory[3].total += this.monthlyExpenses[i].amount;
			}
		};
		if (this.monthlyExpenses[i].category === "Pets") {
			this.expCategoryTotals[12].total += this.monthlyExpenses[i].amount;	
			if (this.monthlyExpenses[i].subCategory === "Pet Food & Supplies") {
				this.expCategoryTotals[12].subCategory[0].total += this.monthlyExpenses[i].amount;
			}
			if (this.monthlyExpenses[i].subCategory === "Pet Grooming") {
				this.expCategoryTotals[12].subCategory[1].total += this.monthlyExpenses[i].amount;
			}
			if (this.monthlyExpenses[i].subCategory === "Veterinary") {
				this.expCategoryTotals[12].subCategory[2].total += this.monthlyExpenses[i].amount;
			}
		};
		if (this.monthlyExpenses[i].category === "Kids") {
			this.expCategoryTotals[13].total += this.monthlyExpenses[i].amount;	
			if (this.monthlyExpenses[i].subCategory === "Allowance") {
				this.expCategoryTotals[13].subCategory[0].total += this.monthlyExpenses[i].amount;
			}
			if (this.monthlyExpenses[i].subCategory === "Baby Supplies") {
				this.expCategoryTotals[13].subCategory[1].total += this.monthlyExpenses[i].amount;
			}
			if (this.monthlyExpenses[i].subCategory === "Babysitter & Daycare") {
				this.expCategoryTotals[13].subCategory[2].total += this.monthlyExpenses[i].amount;
			}
			if (this.monthlyExpenses[i].subCategory === "Child Support") {
				this.expCategoryTotals[13].subCategory[3].total += this.monthlyExpenses[i].amount;
			}
			if (this.monthlyExpenses[i].subCategory === "Kids Activities") {
				this.expCategoryTotals[13].subCategory[4].total += this.monthlyExpenses[i].amount;
			}
			if (this.monthlyExpenses[i].subCategory === "Toys") {
				this.expCategoryTotals[13].subCategory[5].total += this.monthlyExpenses[i].amount;
			}
		};
		if (this.monthlyExpenses[i].category === "Miscellaneous") {
			this.expCategoryTotals[14].total += this.monthlyExpenses[i].amount;	
			if (this.monthlyExpenses[i].subCategory === "Day-To-Day Expenses") {
				this.expCategoryTotals[14].subCategory[0].total += this.monthlyExpenses[i].amount;
			}
		};
	};

	this.save();
};
mongoose.model('user', UserSchema);