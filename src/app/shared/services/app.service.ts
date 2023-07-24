import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class AppService {

  private showSideMenu = new BehaviorSubject<boolean>(true);

  getShowSideMenu () {
    return this.showSideMenu;
  }

  setShowSideMenu (e: boolean) {
    this.showSideMenu.next(e);
  }

}
