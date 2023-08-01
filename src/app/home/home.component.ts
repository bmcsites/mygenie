import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {InputObj} from "@shared/intrefaces/profile.interface";
import {ApiService} from "@shared/services/api.service";
import {environment} from "@env/environment";
import {MortgageService} from "@shared/services/mortgage.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loginForm!: any;
  inputLists!: InputObj[];

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private mortgageService: MortgageService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      numberOfProperties: ['', [Validators.required]],
      mortgage: ['', [Validators.required]],
      loan: ['', [Validators.required]],
      loanReturn: ['', [Validators.required]],
      netIncome: ['', [Validators.required]],
      expenses: ['', [Validators.required]],
      equity: ['', [Validators.required]],
      existingPropertyValue: ['', [Validators.required]],
    });
    this.apiService.Get(environment.url + 'assets/data/questions.json').subscribe( (q: InputObj[]) => {
      this.inputLists = q;
    })
  }

  formSent(e: any)  {
    this.mortgageService.setMortgageInfo(e.value);
    console.log(e.value);
    this.mortgageService.changeRoute('mortgage-sam');
  }


}
