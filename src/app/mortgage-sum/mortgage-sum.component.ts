import { Component, OnInit } from '@angular/core';
import {MortgageService} from "@shared/services/mortgage.service";
import {FullMortgageInfo} from "@shared/intrefaces/profile.interface";

@Component({
  selector: 'app-mortgage-sum',
  templateUrl: './mortgage-sum.component.html',
  styleUrls: ['./mortgage-sum.component.scss']
})
export class MortgageSumComponent implements OnInit {

  mortgage!: FullMortgageInfo;

  constructor(private mortgageService: MortgageService) { }

  ngOnInit(): void {
    this.mortgageService.getMortgageFromLocalHost().subscribe( (value: any) => {
      this.mortgage = value;
      console.log(this.mortgage);
    });

  }

}
