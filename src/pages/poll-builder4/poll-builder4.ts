import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PollHistoryPage } from '../poll-history/poll-history';
import { PollBuilderServiceProvider } from '../../providers/poll-builder-service/poll-builder-service';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the PollBuilder4Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-poll-builder4',
  templateUrl: 'poll-builder4.html',
})
export class PollBuilder4Page {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public BuilderService: PollBuilderServiceProvider,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PollBuilder4Page');
  }

  publishPoll() {
    if (this.BuilderService.pollSet.pollTitle == "" || this.BuilderService.pollSet.pollDescription == "" || this.BuilderService.pollSet.pollCategory == "") {
      const alert = this.alertCtrl.create({
        title: 'Required Field(s)',
        subTitle: 'All Fields Must Be Completed!',
        buttons: ['OK']
      });
      alert.present();
    } else {
    this.BuilderService.createPollSet()
    .subscribe(
      (response: any) => {

        console.log("New PollSet", response);

        this.BuilderService.pollSets = response
        this.BuilderService.pollId = response.id
        this.BuilderService.pollSets.userId = this.BuilderService.userId

        console.log("pollId", this.BuilderService.pollId)

        for(let i = 0; i <= this.BuilderService.memes.length; i ++) {
          this.BuilderService.memes[i].pollId = this.BuilderService.pollId

          console.log("i", this.BuilderService.memes[i].pollId)

          console.log("new meme",this.BuilderService.memes[i])

          this.BuilderService.saveMeme(this.BuilderService.memes[i])
          .subscribe(
            (response: any) => {

              console.log("Saved Meme", response)

              this.BuilderService.pollMemes.push(response)
            })
        }
      })
    this.navCtrl.push(PollHistoryPage);
    }
  }

}
