import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { PollBuilder2Page } from '../poll-builder2/poll-builder2';
import { PollBuilderServiceProvider } from '../../providers/poll-builder-service/poll-builder-service';
import { DashboardPage } from '../dashboard/dashboard';

/**
 * Generated class for the PollBuilderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-poll-builder',
  templateUrl: 'poll-builder.html',
})
export class PollBuilderPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams, 
    private camera: Camera, 
    public BuilderService: PollBuilderServiceProvider
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PollBuilderPage');
  }

  goBack() {
    this.navCtrl.setRoot(DashboardPage)
  }


}
