import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent{
  links!: any[];

  constructor(public route: ActivatedRoute) {
    // this.links = [
    //   { title: 'דף הבית', fragment: '/' },
    //   { title: 'מודול 1', fragment: '/module/11111' },
    //   { title: 'מודול 2', fragment: '/module/22222' },
    //   { title: 'מודול 3', fragment: '/module/33333' },
    //   { title: 'מודול 4', fragment: '/module/44444' }
    // ];
  }
}
