import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';
import { ResultsServiceProvider } from '../../providers/results-service/results-service';
import { DashboardPage } from '../dashboard/dashboard';
import { PollInterfaceProvider } from '../../providers/poll-interface-provider/poll-interface-provider';
import { DashboardServiceProvider } from '../../providers/dashboard-service/dashboard-service';

@Component({
  selector: 'page-poll-results',
  templateUrl: 'poll-results.html',
})
export class PollResultsPage {

  @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public resultsProvider: ResultsServiceProvider,
              public pollInterfaceProvider: PollInterfaceProvider,
              public dash$: DashboardServiceProvider) {
    
  }

  bar1:any = 0
  barPercent1:any = 0
  barPercent2:any = 0
  bar2:any = 0

  meme = this.pollInterfaceProvider.memes
  userResponse:any = this.resultsProvider.userAnswers

  ionViewWillLoad() {
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

  startPoll(id) {
    console.log(id)
    this.resultsProvider.userAnswers = []
    this.pollInterfaceProvider.getMemes(id)
  }

}

