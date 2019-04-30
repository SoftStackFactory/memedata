import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class UserProvider {
  user: any = {
    username: "",
    useremail:"",
    password:"",
    dob:"",
    zipcode:"",
    gender:"",
  }


  constructor(public http: HttpClient) {
    console.log('Hello UserProvider Provider');
  }


}
