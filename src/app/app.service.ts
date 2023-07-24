import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {DeviceDetectorService} from 'ngx-device-detector';
import { BehaviorSubject } from 'rxjs';
import {AppProperties} from "@shared/intrefaces/app-properties";

@Injectable({
  providedIn: 'root'
})

export class AppService {
  private deviceInfo$: BehaviorSubject<any> = new BehaviorSubject(null);

  private isUnder1680$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private isRtl$ = new BehaviorSubject(true);

  private deviceInfo: any = null;

  private isUnder1680 = false;

  private isRtl: boolean = false;

  private isIE!: boolean;

  constructor(@Inject(DOCUMENT) private document: Document, public deviceService: DeviceDetectorService) {
    this.setScreenResize();
    this.setDeviceInfo();
  }

  setScreenResize() {
    this.isUnder1680 = window.innerWidth < 1680;
    this.isUnder1680$.next(window.innerWidth < 1680);
  }

  setDeviceInfo() {
    this.isIE = /msie\s|trident\/|edge\//i.test(window.navigator.userAgent);
    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.deviceInfo$.next(this.deviceService.getDeviceInfo());
  }

  setIsRtl(event: boolean) {
    this.isRtl = event;
    this.isRtl$.next(event);
  }

  getIsRtl() {
    return this.isRtl$;
  }

  getDirectionString() {
    return this.isRtl ?  'rtl' : 'ltr';
  }

  /** get window setting as static properties **/
  getWindowSettings() {
    return {
      isUnder1680: this.isUnder1680,
      deviceInfo: this.deviceInfo,
      isIE: this.isIE,
      isRtl: this.isRtl,
      isDesktop: !(this.deviceService.isMobile() || this.deviceService.isTablet())
    };
  }

  getAppProperties(): AppProperties {
    return {
      isUnder1680$: this.isUnder1680$,
      deviceInfo$: this.deviceInfo$,
      isIE: this.isIE,
      isRtl$: this.isRtl$,
      isDesktop: !(this.deviceService.isMobile() || this.deviceService.isTablet())
    };
  }

  getIsTablet() {
    return this.deviceService.isTablet();
  }

  getBrowserLangIsRtl(){
    const rtlLangs =
      ['ae', 'ar', 'arc', 'bcc',  'bqi', 'ckb', 'dv',  'fa',  'glk', 'he', 'ku',  'mzn', 'nqo', 'pnb', 'ps', 'sd', 'ug', 'ur', 'yi'];
    return !!rtlLangs.find(lang => lang.indexOf(navigator.language) === 0);
  }
}
