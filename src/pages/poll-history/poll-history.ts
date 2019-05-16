import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PollHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-poll-history',
  templateUrl: 'poll-history.html',
})
export class PollHistoryPage {
  poll: string = "poll-history";
  polls: any[]=[];

  pollCategory: string;
  pollTitle: string;
  memeImage: "../assets/imgs/sample.jpg";
  segments = "featured";


  takenPolls = [
    'Pokemon Poll',
    'Yugioh Poll',
    'Digimon Poll',
    'Are You A Robot Poll?',
    'Futurama Poll',
    'Star Wars Poll'
  ]

  createdPolls = [
    'Bob The Builders Favorite Tools Poll',
    'Doras Bagpack Poll',
    'NBA Champions Poll',
    'Metgala Who Wore It Best Poll?'
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PollHistoryPage');
  }

  itemSelected(item: string) {
    console.log("Selected Item", item)
  }
}
