import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { PollBuilder3Page } from '../poll-builder3/poll-builder3';
import { PollBuilderServiceProvider } from '../../providers/poll-builder-service/poll-builder-service';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the PollBuilder2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
    this.BuilderService.meme.image = ""
    this.BuilderService.pollSet.coverImage = this.BuilderService.memes[0].image
    this.navCtrl.setRoot(PollBuilder3Page);
    }
  }

  goBack() {
      const confirm = this.alertCtrl.create({
        title: 'Leave poll service?',
        message: 'If you leave now, your progress will not be saved!',
        buttons: [
          {
            text: 'No',
            handler: () => {
              console.log('No clicked');
            }
          },
          {
            text: 'Yes',
            handler: () => {
              console.log('Yes clicked');
                this.BuilderService.clearUserPolls()
              this.navCtrl.setRoot(DashboardPage)
            }
          }
        ]
      });
      confirm.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PollBuilder2Page');
  }

}
