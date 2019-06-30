import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { SpinnerServiceProvider } from '../spinner-service/spinner-service';
import { ThrowStmt } from '@angular/compiler';
import { ResultsServiceProvider } from '../results-service/results-service';

@Injectable()
export class PollInterfaceProvider {

  constructor(public http: HttpClient,
              public events: Events,
              public spinnerService: SpinnerServiceProvider,
              public resultsProvider: ResultsServiceProvider) {
  }

  api:string = 'https://ssf-memedata.herokuapp.com/api/'
  memes:any = []
  pollInfo: any;

  getMemes(id){
    this.spinnerService.spinner = true
    this.pollInfo = id
    console.log("pollInfo",id)
    this.http.get(this.api + 'pollSets/' + id + "/meme")
    .subscribe((response) => {
      this.memes = response
      console.log(this.memes)
      this.spinnerService.spinner = false
      this.events.publish('getMemes');
      });
  }

  saveMemeAnswers(memeId, answers, index) {
    this.http.post(this.api + 'memes/' + memeId + '/answers', answers)
    .subscribe((response) => {
      console.log(response)
      this.events.publish('answerSaved');
        if(this.resultsProvider.userAnswers.length == index) {
          this.events.publish('answerSaved');
        }
      });
  }
}

