import {Component, Input, OnInit} from '@angular/core';
import {InputObj} from "@shared/intrefaces/profile.interface";

@Component({
  selector: 'app-input-notification',
  templateUrl: './input-notification.component.html',
  styleUrls: ['./input-notification.component.scss']
})
export class InputNotificationComponent implements OnInit {
  @Input() controls!: any;
  @Input() inputObject!: InputObj;
  constructor() { }

  ngOnInit(): void {
  }

}
