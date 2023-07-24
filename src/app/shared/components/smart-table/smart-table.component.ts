import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.scss']
})
export class SmartTableComponent implements OnInit {

  @Input() headers!: any[];
  @Input() items!: any[];
  @Output() action = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  emitAction(e: any) {
    this.action.emit(e);
  }

}
