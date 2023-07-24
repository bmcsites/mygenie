import {Component, OnInit} from '@angular/core';
import {AppProperties} from "@shared/intrefaces/app-properties";
import {AppService} from "@appRoot/app.service";
import {SupabaseService} from "@shared/services/supabase.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  appProperties!: AppProperties;
  session = this.supabase.session;

  constructor(private  appService: AppService, private readonly supabase: SupabaseService, private router: Router) {}

  ngOnInit(): void {
    this.appProperties = this.appService.getAppProperties();

    this.supabase.authChanges((_, session) => {
      this.session = session;
      if (this.session) {
        this.router.navigate(['/', 'topics']);
      } else {
        console.log('no session');
      }
    })
  }
}
