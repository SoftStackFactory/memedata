import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PollBuilderServiceProvider } from "../../providers/poll-builder-service/poll-builder-service"
import { DashboardPage } from "../dashboard/dashboard"

/**
 * Generated class for the PollHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-poll-history',
  templateUrl: 'poll-history.html',
})
export class PollHistoryPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public BuilderService: PollBuilderServiceProvider) {
  }

  goBack() {
    this.navCtrl.setRoot(DashboardPage)
  }

  getAllMyMemes(){
    this.BuilderService.getMyPolls()
    .subscribe(
      (response: any) => {
        console.log("all my polls", response)
        this.BuilderService.pollMemes = response
        console.log("memes on builder service", this.BuilderService.pollMemes)
      }
    )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PollHistoryPage');
  }

}
