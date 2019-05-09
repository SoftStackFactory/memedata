import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PollBuilderPage } from '../poll-builder/poll-builder';
import { PollBuilderServiceProvider } from '../../providers/poll-builder-service/poll-builder-service';

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public BuilderService: PollBuilderServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }

  goPollBuilder() {
    this.BuilderService.createPollSet()
    .subscribe(
      (response: any) => {
        console.log("New PollSet", response);
        this.BuilderService.pollSets = response
        this.BuilderService.pollId = response.id
        this.BuilderService.pollSets.userId = this.BuilderService.userId
      }
    )
    this.navCtrl.push(PollBuilderPage);
}

}
