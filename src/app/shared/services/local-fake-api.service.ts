import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LocalFakeApiService {
  constructor(protected http: HttpClient) {}

  public Get(fullUrl: string): Observable<any> {
    return this.http.get(`${fullUrl}`);
  }

}
