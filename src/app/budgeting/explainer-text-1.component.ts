import {Component, OnInit} from '@angular/core';

import {GetBYTUser} from '../dashboard/byt-dashboard-overview.service';

@Component({
    templateUrl: './explainer-text-1.component.html',
    styleUrls: ['./explainer-text-1.component.css']
})
export class BYTBudgetExplainerText1 implements OnInit {

constructor (private _getBYTUser: GetBYTUser) {}

    periodStart:any;

    ngOnInit(){
        this._getBYTUser.getUserNoCalc().subscribe( (user:any) => {
            this.periodStart = user.periodStart;       
        })
    }

}