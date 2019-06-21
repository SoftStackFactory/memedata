import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ResultsServiceProvider {

  constructor(public http: HttpClient) {
  }

  userAnswers:any = []
  answers:any = []
  api:string = 'https://ssf-memedata.herokuapp.com/api/'

  getMemeAnswers() {
    this.http.get(this.api + "answers")
    .subscribe((response) => {
      this.answers = response
      console.log(response)
      });
  }

}