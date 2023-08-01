import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ApiService} from "@shared/services/api.service";
import {environment} from "@env/environment";
import {InputObj} from "@shared/intrefaces/profile.interface";
import {Router} from "@angular/router";
import {MortgageService} from "@shared/services/mortgage.service";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})

export class WelcomeComponent implements OnInit {
  loginForm!: any;
  inputLists!: InputObj[];

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private mortgageService: MortgageService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      phone: ['', [Validators.required]],
      youngAge: ['', [Validators.required]],
      gift: ['', [Validators.required]],
      stop: ['', [Validators.required]],
    });

    this.apiService.Get(environment.url + 'assets/data/welcome.json').subscribe( (q: InputObj[]) => {
      this.inputLists = q;
    })
  }

  formSent(e: any)  {
    this.mortgageService.setUserInfo(e.value);
    console.log(e.value);
    this.mortgageService.changeRoute('mortgage-questions');
  }

}
