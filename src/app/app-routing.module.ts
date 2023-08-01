import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "@appRoot/home/home.component";
import {MortgageSumComponent} from "@appRoot/mortgage-sum/mortgage-sum.component";
import {WelcomeComponent} from "@appRoot/welcome/welcome.component";

const routes: Routes = [
  {path: '', component : WelcomeComponent},
  {path: 'mortgage-questions', component : HomeComponent},
  {path: 'mortgage-sam', component : MortgageSumComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
