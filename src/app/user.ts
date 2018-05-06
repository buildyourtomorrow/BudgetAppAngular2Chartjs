export interface User {
	nickName: string,
	email: string,
	expCategoryTotals: 
	[
		{
			category: string,
			total: number,
			subCategory : [
				{
					name: string,
					total: number
				}
			]
		}
	],
	billsCategoryTotals:
	[
		{
			category: string,
			total: number,
			subCategory : [
				{
					name: string,
					total: number
				}
			]
		}
	],
	incomeCategoryTotals:
	[
		{
			category: string,
			total: number
		}
	],
	daysLeft: number,
	dailyBudget: number,
	projectedExpenses: number,
	projectedBills: number,
	projectedIncome: number,
	upBy: number,
	leftOver: number,
	totalSpent: number,
	monthlyExpenses: 
	[
		{
			id: number,
			category: string,
			subCategory : string,
			amount: number
		},
		{
			id: number,
			category: string,
			subCategory : string,
			amount: number
		},
		{
			id: number,
			category: string,
			subCategory : string,
			amount: number
		}
	],
	billsTotal: number,
	monthlyBills:
	[
		{
			id: number,
			category: string,
			subCategory : string,
			amount: number,
			date: Date
		}
	],
	totalIncome: number,
	income:
	[
		{
			id: number,
			category: string,
			amount: number, 
			date: Date
		}
	]
} 