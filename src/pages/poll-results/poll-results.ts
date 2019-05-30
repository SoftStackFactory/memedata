import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { ResultsServiceProvider } from '../../providers/results-service/results-service';
import { DashboardPage } from '../dashboard/dashboard';

@IonicPage()
@Component({
  selector: 'page-poll-results',
  templateUrl: 'poll-results.html',
})
export class PollResultsPage {

  @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public resultsProvider: ResultsServiceProvider) {
    
  }

  suggestions:any = [1,2,3,4,5,6,7,8,9,10]

  bar1:number = 0
  barPercent1:any = 0
  barPercent2:any = 0
  bar2:number = 0

  meme = [
      {
      "id":"0001",
      "pollID": "string",
      "topText": "string",
      "bottomText": "string",
      "image": "string",
      "description": "Meme1",
      "userId": "string"
    },
    {
      "id":"0002",
      "pollID": "string",
      "topText": "string",
      "bottomText": "string",
      "image": "string",
      "description": "meme2",
      "userId": "string"
    },
    {
      "id":"0003",
      "pollID": "string",
      "topText": "string",
      "bottomText": "string",
      "image": "string",
      "description": "meme3",
      "userId": "string"
    },
    {
      "id":"0004",
      "pollID": "string",
      "topText": "string",
      "bottomText": "string",
      "image": "string",
      "description": "meme4",
      "userId": "string"
    },
    {
      "id":"0005",
      "pollID": "string",
      "topText": "string",
      "bottomText": "string",
      "image": "string",
      "description": "meme5",
      "userId": "string"
    } ,
    {
      "id":"0006",
      "pollID": "string",
      "topText": "string",
      "bottomText": "string",
      "image": "string",
      "description": "meme6",
      "userId": "string"
    }
  ]


  userResponse:any = [
    {
      id: "0001",
      choice: "right"
    },
    {
      id: "0002",
      choice: "left"
    },
    {
      id: "0003",
      choice: "right"
    },
    {
      id: "0004",
      choice: "right"
    },
    {
      id: "0005",
      choice: "right"
    },
    {
      id: "0006",
      choice: "right"
    }
  ]

  ionViewDidLoad() {
    this.resultsProvider.getMemeAnswers()

  }

  calculateMemePercent(memeId) {
    let right = []
    let left = []

    for (let i=0; i < this.resultsProvider.answers.length; i++) {
      if (memeId == this.resultsProvider.answers[i].memeId) {
        if ("right" == this.resultsProvider.answers[i].choice) {
          right.push(this.resultsProvider.answers[i].choice)
        } else if ("left" == this.resultsProvider.answers[i].choice) {
          left.push(this.resultsProvider.answers[i].choice)
        }
      }
    }

    let totalTaken = right.length + left.length
    let yesPercent = (100 * right.length) / totalTaken;
    let noPercent = (100 * left.length) / totalTaken;

    this.bar1 = Math.round(yesPercent)
    this.bar2 = 100 - this.bar1
    this.barPercent1 = {'width': Math.round(yesPercent) + "%"}
    this.barPercent2 = {'width': Math.round(noPercent) + "%"}

    return this.barPercent1
  }

  toDashboard() {
    this.navCtrl.setRoot(DashboardPage)
  }

}

