import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MortgageService} from "@shared/services/mortgage.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent{
  links!: any[];
  headerText!: string

  constructor(public route: ActivatedRoute, private mortgageService: MortgageService) {
    // this.links = [
    //   { title: 'דף הבית', fragment: '/' },
    //   { title: 'מודול 1', fragment: '/module/11111' },
    //   { title: 'מודול 2', fragment: '/module/22222' },
    //   { title: 'מודול 3', fragment: '/module/33333' },
    //   { title: 'מודול 4', fragment: '/module/44444' }
    // ];
    this.mortgageService.getHeaderText().subscribe( (value: any) => {
      this.headerText = value;
      console.log(this.headerText);
    });

  }
}
