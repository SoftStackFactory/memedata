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
      pollId: "none",
      topText: this.BuilderService.meme.topText,
      bottomText: this.BuilderService.meme.bottomText,
      image: "myimage", //this.BuilderService.meme.image,
      description: this.BuilderService.meme.description,
      userId: this.BuilderService.userId,
    });
    console.log("meme array", this.BuilderService.memes)
    this.BuilderService.meme.image = "myimage"
    console.log(this.BuilderService.meme.image)
    this.BuilderService.pollSet.coverImage = "myimage"//this.BuilderService.memes[0].image
    this.navCtrl.push(PollBuilder3Page);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PollBuilder2Page');
  }

}
