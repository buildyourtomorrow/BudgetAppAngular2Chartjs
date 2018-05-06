export class BYTAllPurposeFormModel {
	id: number;
  	description: string;
    date: Date;
    category: string;
    subCategory: string;
    amount: number;
	constructor(options: {
	  	id?: number;
	  	description?: string;
	    date?: Date;
	    category?: string;
	    subCategory?: string;
	    amount?: number;
	} = {}) {
	  	this.id = options.id || 1;
	  	this.description = options.description;
	  	this.date = options.date || new Date;
	  	this.category = options.category;
	  	this.subCategory = options.subCategory;
	  	this.amount = options.amount;
	}
}