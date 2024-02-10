import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  protected headersKey: string;
  protected headersValue: string;

  constructor(protected http: HttpClient) {
    this.headersKey = 'apiKey';
    this.headersValue = '89325cc0-b35c-413e-bc57-fef5d700e9c0';
  }

  public get(fullUrl: string): Observable<any> {
    return this.http.get(`${fullUrl}`);
  }

  public post(endPoint: string, params: Object, options?: any): Observable<any> {
    const sendOptions = this.setOptions(options);
    return this.http.post(endPoint, params, sendOptions);
  }

  protected setOptions(options?: any) {
    const retOptions = options || {};
    retOptions.headers = retOptions.headers ? retOptions.headers : new HttpHeaders();
    retOptions.headers = retOptions.headers.set(this.headersKey, this.headersValue);
    return retOptions;
  }

}
