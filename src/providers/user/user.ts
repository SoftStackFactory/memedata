import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class UserProvider {


  constructor(public _http: HttpClient) {
    console.log('Hello UserProvider Provider');
  }

  baseUrl: string = 'http://localhost:3000/api/appUsers';

  register(userData) {
    return this._http.post(this.baseUrl, userData );
  }

  login(userData) {
    return this._http.post(this.baseUrl + "/login", userData );
  }


}
