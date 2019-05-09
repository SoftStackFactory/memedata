import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PollBuilderPage } from '../poll-builder/poll-builder';
import { PollBuilderServiceProvider } from '../../providers/poll-builder-service/poll-builder-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public BuilderService: PollBuilderServiceProvider) {

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
