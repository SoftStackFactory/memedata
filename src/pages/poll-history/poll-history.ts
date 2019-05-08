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

  items = [
    'Pokemon Poll',
    'Yugioh Poll',
    'Digimon Poll',
    'Are You A Robot Poll?',
    'Futurama Poll',
    'Star Wars Poll'
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
