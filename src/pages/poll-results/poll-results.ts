import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-poll-results',
  templateUrl: 'poll-results.html',
})
export class PollResultsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  array:any = [1,2,3,4,5]

  ionViewDidLoad() {
    console.log('ionViewDidLoad PollResultsPage');
  }

}
