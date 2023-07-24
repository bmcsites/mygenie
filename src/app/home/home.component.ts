import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {InputObj} from "@shared/intrefaces/profile.interface";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "@env/environment";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  inputLists!: InputObj[]

  loginForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    phone: ['', [Validators.required]],
    who: ['', [Validators.required]],
    salary: ['', [Validators.required]],
    salaryReturn: ['', [Validators.required]],
    expenses: ['', [Validators.required]],
    equity: ['', [Validators.required]],
    youngAge: ['', [Validators.required]],
    existingPropertyValue: ['', [Validators.required]],
    mortgage: ['', [Validators.required]],
    loan: ['', [Validators.required]]
  })

  constructor(private formBuilder: FormBuilder, protected http: HttpClient) {
    this.Get(environment.url + 'assets/data/questions.json').subscribe( (q: InputObj[]) => {
      this.inputLists = q;
    })

  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    console.info("Form Valid!", this.loginForm)
  }

  get controls(): { [p: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  public Get(fullUrl: string): Observable<any> {
    return this.http.get(`${fullUrl}`);
  }


}
