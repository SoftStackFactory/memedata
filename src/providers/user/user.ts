import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class UserProvider {


  constructor(public http: HttpClient) {
    console.log('Hello UserProvider Provider');
  }

  baseUrl: string = 'https://memepoll.herokuapp.com/api/appUsers';

  register(userData) {
    return this.http.post(this.baseUrl, userData );
  }

  login(userData) {
    return this.http.post(this.baseUrl + "/login", userData);
  }

  logout(token) {
    return this.http.post(this.baseUrl + "/logout?access_token=" + token, {});
  }

}
