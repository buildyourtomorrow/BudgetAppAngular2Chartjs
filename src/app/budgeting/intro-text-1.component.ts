import {Component, OnInit } from '@angular/core';

import * as moment from 'moment';

import { BYTPostBudgetDateRange } from "../dashboard/byt-dashboard-overview.service";
import { DaterangepickerConfig } from 'ng2-daterangepicker';

@Component({
    templateUrl: './intro-text-1.component.html',
    styleUrls: ['./intro-text-1.component.css']
})
export class BYTBudgetIntroText1 implements OnInit {

    constructor(public daterangepickerOptions: DaterangepickerConfig, private bytPostBudgetDateRange: BYTPostBudgetDateRange) {
        this.daterangepickerOptions.settings = {
            minDate: new Date(),
            maxDate: moment().add(2, 'months'),
            drops: "up",
            opens: "left",
            locale: { format: 'MM-DD-YYYY' },
            alwaysShowCalendars: true,
            ranges: {
               'Next Week': [ moment(), moment().add(7, 'days').calendar() ],
               'Next 2 Weeks': [ moment(), moment().add(14, 'days').calendar() ],
               'Next 3 Weeks': [ moment(), moment().add(28, 'days').calendar() ],
               'Next Month': [  moment(), moment().add(1, 'months').calendar() ],
            }
        };
    }

    public daterange:any = {
        start: new Date(),
        end: new Date()
    };

    ngOnInit(){
        this.daterange.range = this.daterange.start.toDateString() + "  -  " + this.daterange.end.toDateString();
    }

    public selectedDate(value: any) {        
        this.daterange.start = value.start;
        this.daterange.end = value.end;
        this.daterange.range = value.start.format('MMMM Do YYYY') + "  -  " + value.end.format('MMMM Do YYYY');
    }

    submitDateRange(){
        this.daterange.start.hours(0).minutes(0).seconds(1)
        let bytStart = this.daterange.start.toDate();
        let bytEnd = this.daterange.end.toDate();
        let aDay = 24*60*60*1000;
        let bytDiff = Math.abs( (bytStart.getTime() - bytEnd.getTime()) / aDay );
        this.bytPostBudgetDateRange.bytPostBudgetDateRange(bytStart, bytEnd, Math.ceil(bytDiff)).subscribe(user => {});
    }

}