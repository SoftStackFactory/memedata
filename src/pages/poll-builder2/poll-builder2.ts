import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PollBuilder3Page } from '../poll-builder3/poll-builder3';
import { PollBuilderServiceProvider } from '../../providers/poll-builder-service/poll-builder-service';
import { AlertController } from 'ionic-angular';

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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public BuilderService: PollBuilderServiceProvider, 
    public alertCtrl: AlertController) {
  }

  nextStage() {
    if (this.BuilderService.meme.topText == "" || 
      this.BuilderService.meme.bottomText == "" || 
      this.BuilderService.meme.description == "") {
      const alert = this.alertCtrl.create({
        title: 'Required Field(s)',
        subTitle: 'All Fields Must Be Completed!',
        buttons: ['OK']
      });
      alert.present();
    } else{
    this.BuilderService.memes.push({
      pollId: "none",
      topText: this.BuilderService.meme.topText,
      bottomText: this.BuilderService.meme.bottomText,
      image: this.BuilderService.meme.image,
      description: this.BuilderService.meme.description,
      userId: this.BuilderService.userId,
    });
    this.BuilderService.keywords =
      this.BuilderService.meme.topText + " " +
      this.BuilderService.meme.bottomText + " " +
      this.BuilderService.meme.description

    console.log("Meme Array", this.BuilderService.memes)
    //console.log(this.BuilderService.meme.image)
    this.BuilderService.meme.topText = ""
    this.BuilderService.meme.bottomText = ""
    this.BuilderService.meme.description = ""
    this.BuilderService.pollSet.coverImage = this.BuilderService.memes[0].image
    this.navCtrl.push(PollBuilder3Page);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PollBuilder2Page');
  }

}
