import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PollBuilderServiceProvider } from '../../providers/poll-builder-service/poll-builder-service';
import { AlertController } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';

/**
 * Generated class for the PollBuilder4Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
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

  @ViewChild("pollTitle") pollTitle;
  @ViewChild("pollDescription") pollDescription;
  @ViewChild("pollCategory") pollCategory;

  ionViewDidLoad() {
    console.log('ionViewDidLoad PollBuilder4Page');
  }

  publishPoll() {
    if (this.BuilderService.pollSet.pollTitle == "") {
      const alert = this.alertCtrl.create({
        title: 'Required Field',
        subTitle: 'Poll Title is Required',
        buttons: [
          {
            text: 'OK',
            handler: () => {
              console.log('Ok clicked');
              setTimeout(() => {
                this.pollTitle.setFocus();
            },500);
            }
          }
        ]
        });
        alert.present();
    } else if (this.BuilderService.pollSet.pollDescription == "") {
      const alert = this.alertCtrl.create({
        title: 'Required Field',
        subTitle: 'Poll Description is Required',
        buttons: [
          {
            text: 'OK',
            handler: () => {
              console.log('Ok clicked');
              setTimeout(() => {
                this.pollDescription.setFocus();
            },500);
            }
          }
        ]
        });
        alert.present();
    } else if (this.BuilderService.pollSet.pollCategory == "") {
          const alert = this.alertCtrl.create({
            title: 'Required Field',
            subTitle: 'Poll Category is Required',
            buttons: ['OK']
            });
        alert.present();
      } else {
          this.BuilderService.keywords = this.BuilderService.keywords + " " +
          this.BuilderService.pollSet.pollTitle + " " +
          this.BuilderService.pollSet.pollDescription + " " +
          this.BuilderService.pollSet.pollCategory
          this.BuilderService.keywords = this.BuilderService.keywords.toLowerCase()

          console.log("to lower case, pre array", this.BuilderService.keywords)

          this.BuilderService.keywords = this.BuilderService.stringToArray(this.BuilderService.keywords)
          this.BuilderService.filterKeywords(this.BuilderService.keywords)
  
          console.log("filtered keywords", this.BuilderService.keywords)

          this.BuilderService.pollSet.pollKeywords = this.BuilderService.keywords

          console.log(this.BuilderService.memes)
          
          this.BuilderService.createPollSet()
            .subscribe(
              (response: any) => {       
                this.BuilderService.pollSets = response
                this.BuilderService.pollId = response.id
                this.BuilderService.pollSets.userId = this.BuilderService.userId

                console.log("New User PollSet", response, "PolliD =", response.id)

                for (let i = 0; i <= this.BuilderService.memes.length - 1; i ++) {
                  // this.BuilderService.memes[i].pollId = this.BuilderService.pollId //**wont need this with new endpoint post

                    // console.log("New Meme " + i,this.BuilderService.memes[i])

                  // this.BuilderService.saveMeme(this.BuilderService.memes[i]) //**wont need with new endpoint post
                    // .subscribe(
                      // (response: any) => {

                        // console.log("Saved Meme to Meme DB" + i, response)
                      // })

                      this.BuilderService.savePollMeme(this.BuilderService.memes[i])
                        .subscribe(
                          (response: any) => {

                            console.log("Saved Meme to Pollset DB" + i, response)
                          })
                  }
                  this.BuilderService.clearUserPolls()
                  this.navCtrl.setRoot(DashboardPage);         
                })
          };
      }

}
