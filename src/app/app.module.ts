import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SafePipe} from "@shared/pipes/safe.pipe";
import {AppModalComponent} from "@shared/components/app-modal/app-modal.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {HeaderComponent} from "@appRoot/layout/header/header.component";
import {SmartTableComponent} from "@shared/components/smart-table/smart-table.component";
import {LocalFakeApiService} from "@shared/services/local-fake-api.service";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { HomeComponent } from './home/home.component';
import { InputNotificationComponent } from '@shared/components/input-notification/input-notification.component';
import { InputRadioComponent } from '@shared/components/input-radio/input-radio.component';
import {NgxMaskModule} from "ngx-mask";

@NgModule({
  declarations: [
    AppComponent,
    SafePipe,
    AppModalComponent,
    HeaderComponent,
    SmartTableComponent,
    HomeComponent,
    InputNotificationComponent,
    InputRadioComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgbModule,
    HttpClientModule,
    NgxMaskModule.forRoot()
  ],
  providers: [LocalFakeApiService],
  bootstrap: [AppComponent]
})
export class AppModule {}
