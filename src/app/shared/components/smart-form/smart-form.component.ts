import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {InputObj} from "@shared/intrefaces/profile.interface";
import {environment} from "@env/environment";
import {ApiService} from "@shared/services/api.service";

@Component({
  selector: 'app-smart-form',
  templateUrl: './smart-form.component.html',
  styleUrls: ['./smart-form.component.scss']
})
export class SmartFormComponent implements OnInit {

  @Input() loginForm!: any;
  @Input() inputLists!: InputObj[];
  @Output() action = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    console.info("Form Valid!", this.loginForm)
    this.action.emit(this.loginForm);
  }

  get controls(): { [p: string]: AbstractControl } {
    return this.loginForm.controls;
  }
}
