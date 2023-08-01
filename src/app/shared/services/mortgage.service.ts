import { Injectable } from '@angular/core';
import {BehaviorSubject, ReplaySubject} from "rxjs";
import {Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MortgageInfo, UserInfo} from "@shared/intrefaces/profile.interface";

@Injectable({
  providedIn: 'root'
})

export class MortgageService {

  private mortgageInfo$: ReplaySubject<MortgageInfo> = new ReplaySubject<MortgageInfo>();
  private userInfo$: ReplaySubject<UserInfo> = new ReplaySubject<UserInfo>();

  constructor(private router: Router) { }

  changeRoute(route: string) {
    console.log(route);
    this.router.navigate([`/${route}`, {}]);
  }

  calcMortgage(info: any) {
    const totalEquity = this.calcEquity(info.existingPropertyValue, info.mortgage, info.loan, info.equity);

    const maxMortgageReturn = this.calcmMaxMortgageReturn(info.netIncome);

    // if maxMortgageHeight = 0 , then age is not available
    const maxMortgageHeight = this.calcMaxMortgageHeight(maxMortgageReturn, info.youngAge);

    // if purchaseAmount = 0 , then totalEquity is too low.
    const purchaseAmount = this.calcPurchaseAmount(totalEquity, maxMortgageHeight);
  }

  getUserInfo() {
    return this.userInfo$;
  }

  getMortgageInfo() {
    return this.mortgageInfo$;
  }

  getMortgageFromLocalHost() {
    const MortgageInfo: any = {};
    if(localStorage.getItem('name')) {
      MortgageInfo['name'] = localStorage.getItem('name');
      MortgageInfo['email'] = localStorage.getItem('email');
      MortgageInfo['phone'] = localStorage.getItem('phone');
      MortgageInfo['youngAge'] = localStorage.getItem('youngAge');
      MortgageInfo['gift'] = localStorage.getItem('gift');
      MortgageInfo['stop'] = localStorage.getItem('stop');
      MortgageInfo['numberOfProperties'] = localStorage.getItem('numberOfProperties');
      MortgageInfo['mortgage'] = localStorage.getItem('mortgage');
      MortgageInfo['loan'] = localStorage.getItem('loan');
      MortgageInfo['loanReturn'] = localStorage.getItem('loanReturn');
      MortgageInfo['netIncome'] = localStorage.getItem('netIncome');
      MortgageInfo['expenses'] = localStorage.getItem('expenses');
      MortgageInfo['equity'] = localStorage.getItem('equity');
      MortgageInfo['existingPropertyValue'] = localStorage.getItem('existingPropertyValue');
      this.mortgageInfo$.next(MortgageInfo);
    }
    return this.mortgageInfo$;
  }

  setUserInfo(info: any) {
    localStorage.setItem('name', info.name);
    localStorage.setItem('email', info.email);
    localStorage.setItem('phone', info.phone);
    localStorage.setItem('youngAge', info.youngAge);
    localStorage.setItem('gift', info.gift);
    localStorage.setItem('stop', info.stop);
    this.userInfo$.next(info);
  }

  setMortgageInfo(info: any) {
    localStorage.setItem('numberOfProperties', info.numberOfProperties);
    localStorage.setItem('mortgage', info.mortgage);
    localStorage.setItem('loan', info.loan);
    localStorage.setItem('loanReturn', info.loanReturn);
    localStorage.setItem('netIncome', info.netIncome);
    localStorage.setItem('expenses', info.expenses);
    localStorage.setItem('equity', info.equity);
    localStorage.setItem('existingPropertyValue', info.existingPropertyValue);
    let myUserInfo: any = {};
    if(localStorage.getItem('name')) {
      this.getUserInfo().subscribe((val: UserInfo) => {
        myUserInfo = val;
      });
    }
    let mortgageInfo = Object.assign(info, myUserInfo)
    console.log('mortgageInfo: ', mortgageInfo);
    this.mortgageInfo$.next(mortgageInfo);
    this.calcMortgage(mortgageInfo);
  }

  // הון עצמי
  calcEquity(existingPropertyValue: string, mortgage: string, loan: string, equity: string) {
    const totalEquity: number = (Number(existingPropertyValue) - Number(mortgage) - Number(loan)) + Number(equity);
    localStorage.setItem('totalEquity', JSON.stringify(totalEquity));
    return totalEquity;
  }

  // הכנסה פנויה
  // calcDisposableIncome(netIncome: string, loanReturn: string) {
  //   const disposableIncome: number = Number(netIncome) - Number(loanReturn);
  //   localStorage.setItem('disposableIncome', JSON.stringify(disposableIncome));
  //   return disposableIncome;
  // }

  // משכנתא המקסימלית
  calcmMaxMortgageReturn(netIncome: number) {
    const maxMortgageReturn =  netIncome * 0.39;
    localStorage.setItem('maxMortgageReturn', JSON.stringify(maxMortgageReturn));
    return maxMortgageReturn;
  }

  // גובה משכנתא
  calcMaxMortgageHeight(maxMortgageReturn: number, youngAge: string) {
    let plugNumber: number;
    const age = Number(youngAge);
    const period = 80 - Number(age);
    let maxMortgageHeight: number;

    if ( age < 18 || age > 60) {
      maxMortgageHeight = 0;
    } else {
      if(period > 29) {
        plugNumber = 525;
      }
      if (period < 29 && period > 25) {
        plugNumber = 590;
      }
      if(period < 25 && period > 20) {
        plugNumber = 650;
      }
      maxMortgageHeight =  (maxMortgageReturn / plugNumber) * 100000;
    }
    localStorage.setItem('maxMortgageHeight', JSON.stringify(maxMortgageHeight));
    return maxMortgageHeight;
  }

  // גובה הרכישה
  calcPurchaseAmount(totalEquity: number, maxMortgageHeight: number, numberOfProperties: string) {

    let purchaseAmount: number;
    let properties = Number(numberOfProperties);
    purchaseAmount = 0;
    if(maxMortgageHeight <= (3 * totalEquity) && properties == 75) {
      purchaseAmount = totalEquity + maxMortgageHeight;
    }
    if(maxMortgageHeight <= (2.334 * totalEquity) && properties == 70) {
      purchaseAmount = totalEquity + maxMortgageHeight;
    }
    if(maxMortgageHeight <= (1.5 * totalEquity) && properties == 60) {
      purchaseAmount = totalEquity + maxMortgageHeight;
    }

    localStorage.setItem('purchaseAmount', JSON.stringify(purchaseAmount));
    return purchaseAmount;
  }
}
// שלב ראשון שליחת מייל פרטים, שלב שלישי שליחת מייל הכל
