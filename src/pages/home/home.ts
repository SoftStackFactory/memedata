import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PollBuilderPage } from '../poll-builder/poll-builder';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  goPollBuilder()
{
  this.navCtrl.push(PollBuilderPage);
}

}
