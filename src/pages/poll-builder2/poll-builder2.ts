import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PollBuilder3Page } from '../poll-builder3/poll-builder3';
import { PollBuilderServiceProvider } from '../../providers/poll-builder-service/poll-builder-service';

/**
 * Generated class for the PollBuilder2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-poll-builder2',
  templateUrl: 'poll-builder2.html',
})
export class PollBuilder2Page {

  constructor(public navCtrl: NavController, public navParams: NavParams, public BuilderService: PollBuilderServiceProvider) {
  }

  nextStage() {
    this.BuilderService.memes.push({
      topText: this.BuilderService.meme.topText,
      bottomText: this.BuilderService.meme.bottomText,
      image: this.BuilderService.meme.image,
      description: this.BuilderService.meme.description
    });
    console.log("meme array", this.BuilderService.memes)
    this.navCtrl.push(PollBuilder3Page);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PollBuilder2Page');
  }

}
