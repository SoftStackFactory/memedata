import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { PollBuilderPage } from '../poll-builder/poll-builder';
import { PollBuilder2Page } from '../poll-builder2/poll-builder2';
import { PollBuilder4Page } from '../poll-builder4/poll-builder4';
import { PollBuilderServiceProvider } from '../../providers/poll-builder-service/poll-builder-service';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the PollBuilder3Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-poll-builder3',
  templateUrl: 'poll-builder3.html',
})
export class PollBuilder3Page {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public BuilderService: PollBuilderServiceProvider, 
    public alertCtrl: AlertController
    ) {
  }

  toggleClass: boolean = true

  previewMeme(meme){
    console.log("clicked", meme.topText);
    this.BuilderService.displayMeme = meme; 
  }

  deleteMeme(meme){
    console.log("deleted", meme.topText);
    let confirm = this.alertCtrl.create({
      title: 'Delete forever?',
      message: 'Are you sure you want to permanently delete this meme?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            let result = this.BuilderService.memes.splice(this.BuilderService.memes.findIndex(find => find.image === meme.image), 1);
            console.log("deleted", result[0].topText);
            this.BuilderService.displayMeme.image = "";
          }
        }
      ]
    });
    confirm.present();
  }
  

  addNextMeme() {
      const confirm = this.alertCtrl.create({
        title: 'Add next Meme',
        message: 'Would you like to use your camera or choose from photo album?',
        buttons: [
          {
            text: 'Cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Camera',
            handler: () => {
              console.log('Camera clicked');
              this.BuilderService.takePicture()
              this.navCtrl.setRoot(PollBuilder2Page)
            }
          },
          {
            text: 'Album',
            handler: () => {
              console.log('Album clicked');
              this.BuilderService.getImage()
              this.navCtrl.setRoot(PollBuilder2Page)
            }
          }
        ]
      });
      confirm.present();
    //this.navCtrl.push(PollBuilderPage);
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

  lastStage() {
    this.navCtrl.push(PollBuilder4Page);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PollBuilder3Page');
  }

}
