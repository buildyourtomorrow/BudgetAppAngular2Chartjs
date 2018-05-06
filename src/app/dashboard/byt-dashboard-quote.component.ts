import {Component, OnInit} from '@angular/core';

import {BYT_QUOTES} from '../byt-quotes.service';

@Component({
	selector: 'byt-dashboard-quote',
	templateUrl: './byt-dashboard-quote.component.html',
	styleUrls: ['./byt-dashboard-quote.component.css'],
	providers: [BYT_QUOTES]
})
export class BYTDashboardQuoteComponent implements OnInit {
	byt_show_section: boolean = false;
	quote: string;

	constructor(private _byt_quotes: BYT_QUOTES){}

	randomQuote(){
		this.byt_show_section = true;
		this.quote = this._byt_quotes.listOfQuotes()[Math.floor(Math.random() * this._byt_quotes.listOfQuotes().length)];
	};
	ngOnInit(){
		let delay = 8000;
		setInterval(() => this.randomQuote(), delay);
    };
}