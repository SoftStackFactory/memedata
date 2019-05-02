import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PollBuilderPage } from '../poll-builder/poll-builder';
import { PollBuilderServiceProvider } from '../../providers/poll-builder-service/poll-builder-service';

/**
 * Generated class for the PollBuilder3Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-poll-builder3',
  templateUrl: 'poll-builder3.html',
})
export class PollBuilder3Page {

  constructor(public navCtrl: NavController, public navParams: NavParams, public BuilderService: PollBuilderServiceProvider) {
  }

  previewMeme(meme){
    console.log("clicked", meme.topText);
    this.BuilderService.displayMeme = meme; 
  }

  addNextMeme() {
    this.navCtrl.push(PollBuilderPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PollBuilder3Page');
  }

}
