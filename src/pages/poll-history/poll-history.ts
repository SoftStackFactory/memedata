import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PollBuilderServiceProvider } from "../../providers/poll-builder-service/poll-builder-service"
import { DashboardPage } from "../dashboard/dashboard"
import { SpinnerServiceProvider } from '../../providers/spinner-service/spinner-service';

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
    public BuilderService: PollBuilderServiceProvider,
    public spinnerService: SpinnerServiceProvider) {
  }

  goBack() {
    this.navCtrl.setRoot(DashboardPage)
  }

  getAllMyMemes(){
    this.spinnerService.spinner = true
    this.BuilderService.getMyPolls()
    .subscribe(
      (response: any) => {
        this.spinnerService.spinner = false
        console.log("all my polls", response)
        this.BuilderService.pollMemes = response
        console.log("memes on builder service", this.BuilderService.pollMemes)
      }
    )
  }

  ionViewDidEnter() {
    this.getAllMyMemes()
    console.log('ionViewDidLoad PollHistoryPage');
  }

}
