import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ResultsServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ResultsServiceProvider Provider');
  }

  answers:any = []

  getMemeAnswers(){
    this.http.get("https://memepoll.herokuapp.com/api/answers").subscribe((response) => {
      this.answers = response
    
      console.log(response)
      });
  }

}
