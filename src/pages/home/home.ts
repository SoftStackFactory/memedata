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
    this.navCtrl.push(PollBuilderPage);
}

}
