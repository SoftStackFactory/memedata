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

  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera, public BuilderService: PollBuilderServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PollBuilderPage');
  }

  goBack() {
    this.navCtrl.setRoot(DashboardPage)
  }

  takePicture() {
    let options: CameraOptions = {
      quality: 25,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      //allowEdit: true
    }
    
    this.camera.getPicture(options).then((imageData) => {
    // imageData is either a base64 encoded string or a file URI
    // If it's base64 (DATA_URL):
    this.BuilderService.meme.image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
    // Handle error
    });
    this.navCtrl.push(PollBuilder2Page);
  }

  getImage() {
    let options: CameraOptions = {
      quality: 25,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: false,
      correctOrientation: true//,
      //allowEdit: true
    }
    
    this.camera.getPicture(options).then((imageData) => {
    // imageData is either a base64 encoded string or a file URI
    // If it's base64 (DATA_URL):
    this.BuilderService.meme.image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
    // Handle error
    });
    this.navCtrl.push(PollBuilder2Page);
  }

}
