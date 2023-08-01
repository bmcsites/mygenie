import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(protected http: HttpClient) {}

  public Get(fullUrl: string): Observable<any> {
    return this.http.get(`${fullUrl}`);
  }

}
