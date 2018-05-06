import {Component, OnInit} from '@angular/core';

@Component({
	selector: 'byt-edu-credit-card-2',
	templateUrl: './byt-edu-credit-card-2.component.html',
	styleUrls: ['./byt-edu-credit-card-2.component.css']
})
export class BYTEDUCreditCard2 {
	SomeVar1:boolean = false;
	SomeVar2:boolean = false;
	SomeVar3:boolean = false;
	SomeVar4:boolean = false;
	AnswerChoice1: boolean = false;
	AnswerChoice2: boolean = false;
	AnswerChoice3: boolean = false;
	AnswerChoice4: boolean = false;

	SomeFunction1(){
		this.SomeVar1 = true;
		this.SomeVar2 = false;
		this.SomeVar3 = false;
		this.SomeVar4 = false;
	}
	SomeFunction2(){
		this.SomeVar1 = false;
		this.SomeVar2 = true;
		this.SomeVar3 = false;
		this.SomeVar4 = false;
	}
	SomeFunction3(){
		this.SomeVar1 = false;
		this.SomeVar2 = false;
		this.SomeVar3 = true;
		this.SomeVar4 = false;
	}
	SomeFunction4(){
		this.SomeVar1 = false;
		this.SomeVar2 = false;
		this.SomeVar3 = false;
		this.SomeVar4 = true;
	}
	submitAnswerFunc(){
		if(this.SomeVar1){
			this.AnswerChoice1 = true;
			this.AnswerChoice2 = false;
			this.AnswerChoice3 = false;
			this.AnswerChoice4 = false;
		}
		if(this.SomeVar2){
			this.AnswerChoice1 = false;
			this.AnswerChoice2 = true;
			this.AnswerChoice3 = false;
			this.AnswerChoice4 = false;
		}
		if(this.SomeVar3){
			this.AnswerChoice1 = false;
			this.AnswerChoice2 = false;
			this.AnswerChoice3 = true;
			this.AnswerChoice4 = false;
		}
		if(this.SomeVar4){
			this.AnswerChoice1 = false;
			this.AnswerChoice2 = false;
			this.AnswerChoice3 = false;
			this.AnswerChoice4 = true;
		}
	}
}