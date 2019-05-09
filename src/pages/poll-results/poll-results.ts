import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-poll-results',
  templateUrl: 'poll-results.html',
})
export class PollResultsPage {

  @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }

  array:any = [1,2,3,4]
  suggestions:any = [1,2,3,4,5,6,7,8,9,10]

  left: any = 0
  right: any = 0

  bar1:number = 22
  barPercent1:any
  barPercent2:any
  bar2:number = 100 - this.bar1

  ionViewDidLoad() {

    this.barPercent1 = {'width': this.bar1 + "%"}
    this.barPercent2 = {'width': this.bar2 + "%"}

  }

}
