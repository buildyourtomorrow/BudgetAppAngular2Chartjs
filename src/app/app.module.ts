import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Http, RequestOptions } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Daterangepicker } from 'ng2-daterangepicker';

// services
import { GetBYTUser, BYTPostBudgetDateRange, BYTPostProjections, BYTPostIncomeProjections, BYTPostBillProjection, BYTPostExpenseProjection, BYTPostIncome, BYTPostAsset, BYTPostLiability, 
BYTPostBill, BYTPostExpense, BYTRemoveTransaction, BYTStripePayment, BYTPlaid } from "./dashboard/byt-dashboard-overview.service";

import { AppComponent } from './app.component';
import { BYTNavComponent } from "./byt-nav.component";
import { Auth } from "./auth.service";
import { BYTLoginComponent } from "./byt-login.component";
import { BYTMonthlyProjectionsBillsComponent } from "./budgeting/projections/bills.component";
import { BYTMonthlyProjectionsExpensesComponent } from "./budgeting/projections/expenses.component";
import { BYTMonthlyProjectionsIncomeComponent } from "./budgeting/projections/income.component";
import { BYTMonthlyProjectionsNavComponent } from "./budgeting/projections/nav.component";
import { BYTMonthlyProjectionsComponent } from "./budgeting/projections/projections.component";
import { BYTTransactionJournalComponent } from "./budgeting/actual/transaction-journal.component";
import { BYTBudgetActualNavComponent } from "./budgeting/actual/nav.component";
import { BYTDashboardOverviewComponent } from "./dashboard/byt-dashboard-overview.component";
import { BYTIncomeComponent } from "./budgeting/actual/income.component";
import { BYTBillsComponent } from "./budgeting/actual/bills.component";
import { BYTExpensesComponent } from "./budgeting/actual/expenses.component";
import { BYTLastAssetEntryComponent } from "./net-worth/assets/last-asset-entry.component";
import { BYTLastIncomeEntryComponent } from "./budgeting/actual/last-income-entry.component";
import { BYTLastBillEntryComponent } from "./budgeting/actual/last-bill-entry.component";
import { BYTLastExpenseEntryComponent } from "./budgeting/actual/last-expense-entry.component";
import { BYTLastLiabilityEntryComponent } from "./net-worth/liabilities/last-liability-entry.component";
import { BYTDashboardQuoteComponent } from "./dashboard/byt-dashboard-quote.component";
import { BYTDashboardExpenseAnalysisComponent } from "./dashboard/byt-dashboard-expense-analysis.component";
import { BYTDashboardDailyBudgetComponent } from "./dashboard/byt-dashboard-daily-budget.component";
import { BYTOrderByPipe } from './byt-order-by.pipes';
import { BYTOrderByDatePipe } from './byt-order-by.pipes';
import { BYTIncomeFormComponent } from "./budgeting/actual/income-form.component";
import { BYTBillsFormComponent } from "./budgeting/actual/bills-form.component";
import { BYTExpensesFormComponent } from "./budgeting/actual/expenses-form.component";
import { BYTBalanceSheetComponent } from "./net-worth/balance-sheet.component";
import { BYTNetWorthComponent } from "./byt-net-worth.component";
import { BYTNetWorthNavComponent } from "./net-worth/nav.component";
import { BYTAssetFormComponent } from "./net-worth/assets/asset-form.component";
import { BYTAssetComponent } from "./net-worth/assets/asset.component";
import { BYTLiabilityFormComponent } from "./net-worth/liabilities/liability-form.component";
import { BYTLiabilityComponent } from "./net-worth/liabilities/liability.component";
import { AuthGuard } from "./auth.guard";
import { AuthCheck } from "./auth.guard";
import { BYTProGuard } from "./auth.guard";
import { BYTNetWorthDupComponent } from "./net-worth/net-worth-1.component";


import { BYTDashboardExpenseQuestionComponent } from "./dashboard/byt-dashboard-expense-question.component";
import { BYTDashboardDailyBudgetQuestionComponent } from "./dashboard/byt-dashboard-daily-budget-question.component";
import { BYTDashboardOverviewQuestionComponent } from "./dashboard/byt-dashboard-overview-question.component";
import { BYTDashboardOverviewChart } from "./dashboard/byt-dashboard-overview-chart.component";
import { BYTBudget0 } from './not-in-use/byt-budget-0.component';
import { BYTBudget1 } from './not-in-use/byt-budget-1.component';
import { BYTBudget2 } from './not-in-use/byt-budget-2.component';
import { BYTBudget3 } from './not-in-use/byt-budget-3.component';
import { BYTNetWorthIntro0 } from './net-worth/intro-text-0.component';
import { BYTNetWorthIntro1 } from './net-worth/intro-text-1.component';
import { BYTBudget6 } from './not-in-use/byt-budget-6.component';
import { BYTBudgetIntroText0 } from "./budgeting/intro-text-0.component";
import { BYTBudgetIntroText1 } from './budgeting/intro-text-1.component';
import { BYTBudgetIntroText2 } from './budgeting/intro-text-2.component';
import { BYTBudgetIntroText3 } from './budgeting/intro-text-3.component';
import { BYTBudgetExplainerText1 } from './budgeting/explainer-text-1.component';
import { BYTBudget11 } from './budgeting/byt-budget-11.component';
import { BYTDirectLink } from "./byt-direct-link.component";
import { BYT404Component } from './byt-not-found.component';
import { BYTProfile } from "./byt-profile.component";
import { BYTGoProSubscriptionComponent } from "./byt-go-pro-subscription.component";
import { BYTEDUCreditCard1 } from "./education/byt-edu-credit-card-1.component";
import { BYTEDUCreditCard2 } from "./education/byt-edu-credit-card-2.component";
import { BYTEDUCreditCard3 } from "./education/byt-edu-credit-card-3.component";
import { BYTEDUCreditCard4 } from "./education/byt-edu-credit-card-4.component";
import { BYTEDUCreditCard5 } from "./education/byt-edu-credit-card-5.component";
import { BYTEDUCreditCard6 } from "./education/byt-edu-credit-card-6.component";
import { BYTEDUCreditCard7 } from "./education/byt-edu-credit-card-7.component";
import { BYTEDUCreditCard8 } from "./education/byt-edu-credit-card-8.component";
import { BYTEDUCreditCard9 } from "./education/byt-edu-credit-card-9.component";
import { BYTEDUCreditCard10 } from "./education/byt-edu-credit-card-10.component";
import { BYTEDUStocks1 } from "./education/byt-edu-stocks-1.component";
import { BYTEDUStocks2 } from "./education/byt-edu-stocks-2.component";
import { BYTEDUStocks3 } from "./education/byt-edu-stocks-3.component";
import { BYTEDUStocks4 } from "./education/byt-edu-stocks-4.component";
import { BYTEDUStocks5 } from "./education/byt-edu-stocks-5.component";
import { BYTEDUStocks6 } from "./education/byt-edu-stocks-6.component";
import { BYTEDUStocks7 } from "./education/byt-edu-stocks-7.component";
import { BYTEDUStocks8 } from "./education/byt-edu-stocks-8.component";
import { BYTEDUStocks9 } from "./education/byt-edu-stocks-9.component";
import { BYTEDUStocks10 } from "./education/byt-edu-stocks-10.component";
import { BYTAppMenu } from "./byt-app-menu.component";
import { BYTHomePage } from "./byt-home-page.component";
import { BYTEDUCreditCardVideo1 } from "./education/byt-edu-credit-card-video-1.component";
import { BYTPickOne } from "./byt-pick-one.component";
import { BYTEducationList } from "./education/byt-education-list.component";
import { BYTHomePageNav } from "./byt-home-page-nav.component";;

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'id_token',
    tokenGetter: (() => localStorage.getItem('id_token')),
    globalHeaders: [{'Content-Type':'application/json'}],
  }), http, options);
}

const routes: Routes = [
  { path: 'home', component: BYTHomePage, canActivate: [AuthCheck] },
  { path: 'dashboard', component: BYTDashboardOverviewComponent, canActivate: [AuthGuard] },
  { path: 'app-menu', component: BYTAppMenu, canActivate: [AuthGuard] },
  { path: 'byt-budget-0', component: BYTBudget0, canActivate: [AuthGuard] },
  { path: 'byt-budget-1', component: BYTBudget1, canActivate: [AuthGuard] },
  { path: 'byt-budget-2', component: BYTBudget2, canActivate: [AuthGuard] },
  { path: 'byt-budget-3', component: BYTBudget3, canActivate: [AuthGuard] },
  { path: 'net-worth-intro-0', component: BYTNetWorthIntro0, canActivate: [AuthGuard] },
  { path: 'net-worth-intro-1', component: BYTNetWorthIntro1, canActivate: [AuthGuard] },
  { path: 'byt-budget-6', component: BYTBudget6, canActivate: [AuthGuard] },
  { path: 'budget-intro-text-0', component: BYTBudgetIntroText0, canActivate: [AuthGuard] },  
  { path: 'budget-intro-text-1', component: BYTBudgetIntroText1, canActivate: [AuthGuard] },
  { path: 'budget-intro-text-2', component: BYTBudgetIntroText2, canActivate: [AuthGuard] },
  { path: 'budget-intro-text-3', component: BYTBudgetIntroText3, canActivate: [AuthGuard] },
  { path: 'budget-explainer-text-1', component: BYTBudgetExplainerText1, canActivate: [AuthGuard] },
  { path: 'byt-budget-11', component: BYTBudget11, canActivate: [AuthGuard] },
  { path: 'byt-pick-one', component: BYTPickOne, canActivate: [AuthGuard] },
  { path: 'byt-edu-credit-card-video-1', component: BYTEDUCreditCardVideo1, canActivate: [AuthGuard] },
  { path: 'byt-education-list', component: BYTEducationList, canActivate: [AuthGuard] },
  
  { path: 'byt-edu-credit-card-1', component: BYTEDUCreditCard1, canActivate: [AuthGuard] },
  { path: 'byt-edu-credit-card-2', component: BYTEDUCreditCard2, canActivate: [AuthGuard] },
  { path: 'byt-edu-credit-card-3', component: BYTEDUCreditCard3, canActivate: [AuthGuard] },
  { path: 'byt-edu-credit-card-4', component: BYTEDUCreditCard4, canActivate: [AuthGuard] },
  { path: 'byt-edu-credit-card-5', component: BYTEDUCreditCard5, canActivate: [AuthGuard] },
  { path: 'byt-edu-credit-card-6', component: BYTEDUCreditCard6, canActivate: [BYTProGuard] },
  { path: 'byt-edu-credit-card-7', component: BYTEDUCreditCard7, canActivate: [BYTProGuard] },
  { path: 'byt-edu-credit-card-8', component: BYTEDUCreditCard8, canActivate: [BYTProGuard] },
  { path: 'byt-edu-credit-card-9', component: BYTEDUCreditCard9, canActivate: [BYTProGuard] },
  { path: 'byt-edu-credit-card-10', component: BYTEDUCreditCard10, canActivate: [BYTProGuard] },
  { path: 'byt-edu-stocks-1', component: BYTEDUStocks1, canActivate: [AuthGuard] },
  { path: 'byt-edu-stocks-2', component: BYTEDUStocks2, canActivate: [AuthGuard] },
  { path: 'byt-edu-stocks-3', component: BYTEDUStocks3, canActivate: [AuthGuard] },
  { path: 'byt-edu-stocks-4', component: BYTEDUStocks4, canActivate: [AuthGuard] },
  { path: 'byt-edu-stocks-5', component: BYTEDUStocks5, canActivate: [AuthGuard] },
  { path: 'byt-edu-stocks-6', component: BYTEDUStocks6, canActivate: [BYTProGuard] },
  { path: 'byt-edu-stocks-7', component: BYTEDUStocks7, canActivate: [BYTProGuard] },
  { path: 'byt-edu-stocks-8', component: BYTEDUStocks8, canActivate: [BYTProGuard] },
  { path: 'byt-edu-stocks-9', component: BYTEDUStocks9, canActivate: [BYTProGuard] },
  { path: 'byt-edu-stocks-10', component: BYTEDUStocks10, canActivate: [BYTProGuard] },
  { path: 'byt-profile', component: BYTProfile, canActivate: [AuthGuard] },
  { 
    path: 'projections', 
    component: BYTMonthlyProjectionsComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'income',
        component: BYTMonthlyProjectionsIncomeComponent
      },
      {
        path: 'bills',
        component: BYTMonthlyProjectionsBillsComponent
      },
      {
        path: 'expenses',
        component: BYTMonthlyProjectionsExpensesComponent
      }
    ]
  },
  {
    path: 'record',
    component: BYTTransactionJournalComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'income',
        component: BYTIncomeComponent
      },
      {
        path: 'bills',
        component: BYTBillsComponent
      },
      {
        path: 'expenses',
        component: BYTExpensesComponent
      }
    ]
  },
  { path: 'balance-sheet', 
    component: BYTBalanceSheetComponent, 
    canActivate: [AuthGuard],
    children: 
    [
      {
        path: 'assets',
        component: BYTAssetComponent
      },
      {
        path: 'liabilities',
        component: BYTLiabilityComponent
      },
      {
        path: 'net-worth',
        component: BYTNetWorthDupComponent
      }
    ]
  },
  { path: 'logout', component: BYT404Component },
  { path: '**', component: BYT404Component }
];

@NgModule({
  declarations: [
    AppComponent, BYTNavComponent, BYTLoginComponent, BYTMonthlyProjectionsBillsComponent, BYTMonthlyProjectionsExpensesComponent, BYTMonthlyProjectionsIncomeComponent, BYTMonthlyProjectionsNavComponent, 
    BYTMonthlyProjectionsComponent, BYTTransactionJournalComponent, BYTBudgetActualNavComponent, BYTLastLiabilityEntryComponent, BYTLastExpenseEntryComponent, 
    BYTLastBillEntryComponent, BYTLastIncomeEntryComponent, BYTLastAssetEntryComponent, BYTDashboardOverviewComponent, BYTIncomeComponent, BYTBillsComponent, 
    BYTExpensesComponent, BYTDashboardQuoteComponent, BYTDashboardExpenseAnalysisComponent, BYTDashboardDailyBudgetComponent, BYTOrderByPipe,
    BYTOrderByDatePipe, BYTIncomeFormComponent, BYTBillsFormComponent, BYTExpensesFormComponent, BYTBalanceSheetComponent, 
    BYTNetWorthComponent, BYTAssetComponent, BYTLiabilityFormComponent, BYTNetWorthNavComponent, BYTAssetFormComponent, BYTLiabilityComponent,
    BYTDashboardExpenseQuestionComponent, BYTDashboardDailyBudgetQuestionComponent, BYTDashboardOverviewQuestionComponent,
    BYTDashboardOverviewChart, BYTBudget0, BYTBudget1, BYTBudget2, BYTBudget3, BYTNetWorthIntro0, BYTNetWorthIntro1, BYTBudget6, BYTBudgetIntroText0, BYTBudgetIntroText1,
    BYTBudgetIntroText2, BYTBudgetIntroText3, BYTBudgetExplainerText1, BYTBudget11, BYTDirectLink, BYT404Component, BYTProfile, BYTGoProSubscriptionComponent,BYTEDUCreditCard1, BYTEDUCreditCard2,
    BYTEDUCreditCard3, BYTEDUCreditCard4, BYTEDUCreditCard5, BYTEDUCreditCard6, BYTEDUCreditCard7, BYTEDUCreditCard8, BYTEDUCreditCard9, BYTEDUCreditCard10, 
    BYTEDUStocks1, BYTEDUStocks2, BYTEDUStocks3, BYTEDUStocks4, BYTEDUStocks5, BYTEDUStocks6, BYTEDUStocks7, BYTEDUStocks8, BYTEDUStocks9, BYTEDUStocks10, BYTAppMenu, 
    BYTHomePage, BYTEDUCreditCardVideo1, BYTPickOne, BYTEducationList, BYTNetWorthDupComponent, BYTHomePageNav
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ChartsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes /*, { enableTracing: true } */),
    Daterangepicker
  ],
  // services - communication with API.
  providers: [ Auth, GetBYTUser, BYTPostProjections, BYTPostIncomeProjections, BYTPostBillProjection, BYTPostExpenseProjection, BYTPostIncome, 
  BYTPostAsset, BYTPostLiability, BYTPostBill, BYTPostExpense, BYTPostBudgetDateRange, BYTRemoveTransaction, BYTStripePayment, BYTPlaid, AuthGuard, AuthCheck, BYTProGuard,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
