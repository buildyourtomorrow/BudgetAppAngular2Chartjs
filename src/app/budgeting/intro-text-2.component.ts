import {Component, OnInit} from '@angular/core';

import {GetBYTUser} from '../dashboard/byt-dashboard-overview.service';

@Component({
    templateUrl: './intro-text-2.component.html',
    styleUrls: ['./intro-text-2.component.css']
})
export class BYTBudgetIntroText2 implements OnInit {

    constructor (private _getBYTUser: GetBYTUser) {}

    periodStart:any;
    periodEnd:any;

    ngOnInit(){
        this._getBYTUser.getUserNoCalc().subscribe( (user:any) => {
            this.periodStart = user.periodStart;
            this.periodEnd = user.periodEnd;          
        })
    }

	public daterange: any = {};
 
    // see original project for full list of options 
    // can also be setup using the config service to apply to multiple pickers 
    public options: any = {
        locale: { format: 'MM-DD-YYYY' },
        alwaysShowCalendars: false,
    };
 
    public selectedDate(value: any) {
        this.daterange.start = value.start;
        this.daterange.end = value.end;
        this.daterange.label = value.label;
    }

}