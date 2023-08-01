import {parseHtmlGracefully} from "@angular/core/schematics/utils/parse_html";

export interface ProfileInterface {
  id?: string
  username: string
  website: string
  avatar_url: string
}

export interface InputObj {
  name: string;
  label: string;
  moreLabel?: string;
  info?: string;
  inputType: string;
  controlName: string;
  mask?: string;
  maxlength?: number;
  thousandSeparator?: string;
  notificationList: NotificationObj[];
  radioList?: RadioList[];
}

export interface NotificationObj {
  notificationType: string;
  text: string;
}

export interface RadioList {
  value: number;
  text: string;
}

export interface UserInfo {
  name: string;
  email: string;
  phone: string;
  youngAge: string;
  gift: string;
  stop: string;
}


export interface MortgageInfo extends UserInfo{
  numberOfProperties: string;
  mortgage: string;
  loan: string;
  loanReturn: string;
  netIncome: string;
  expenses: string;
  equity: string;
  existingPropertyValue: string;
}

export interface FullMortgageInfo extends MortgageInfo{
  totalEquity: string;
  maxMortgageReturn: string;
  MaxMortgageHeight: string;
  PurchaseAmount: string;
}

