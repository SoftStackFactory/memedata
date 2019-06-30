import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AlertController } from 'ionic-angular';


class Meme {
  pollId: any;
  topText: any;
  bottomText: any;
  image: any;
  description: any;
  userId: any;
}

/*
  Generated class for the PollBuilderServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PollBuilderServiceProvider {

  constructor(
    public http: HttpClient, 
    public storage: Storage,
    private camera: Camera,
    public alertCtrl: AlertController,
    ) {
    console.log('Hello PollBuilderServiceProvider Provider');
  }

  apiBaseUrlMeme: string = 'https://ssf-memedata.herokuapp.com/api/memes'
  apiBaseUrlPollSet: string = 'https://ssf-memedata.herokuapp.com/api/pollSets'
  apiBaseUrlAppUser: string = 'https://ssf-memedata.herokuapp.com/api/'

  token: any
  userId: any

  pollId: string = ""
  pollMemes: any = []
  pollSets: any = []
  keywords: any = []
  memes: Meme[] = [];
 
  displayMeme: any = {
    topText: "",
    bottomText: "",
    image: "",
    description: "",
  };

  meme: any = {
    pollId: "",
    topText: "",
    bottomText: "",
    image: "",
    description: "",
    userId: "",
  };

  pollSet: any = {
    pollTitle: "",
    pollDescription: "",
    coverImage: "",
    pollCategory: "",
    pollKeywords: ["keyword"],
    userId: "",
    completed: 0,
  }

  newUserCategory: any

  filterWords: any = ["the", "a", "an", "and"]

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
    this.meme.image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
    // Handle error
    console.log("An error occured", err)
    });
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
    this.meme.image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
    // Handle error
    console.log("An error occured", err)
    });
  }

  clearUserPolls() {
    this.meme.topText = ""
    this.meme.bottomText = ""
    this.meme.description = ""
    this.meme.image = ""
    this.displayMeme.topText = ""
    this.displayMeme.bottomText = ""
    this.displayMeme.description = ""
    this.displayMeme.image = ""
    this.memes = []
  }
  

  getMyPolls() {
    return this.http.get(this.apiBaseUrlPollSet + "?filter=%7B%22where%22%3A%7B%22userId%22%3A%22" + this.userId + "%22%7D%7D&access_token=" + this.token)
  }

  stringToArray(str) {
    return str.trim().split(" ")
  }

  filterKeywords(arr){
    let result = arr.filter(word => !this.filterWords.includes(word))
    this.keywords = result
  }

  createPollSet(){
    return this.http.post(this.apiBaseUrlPollSet + "?access_token=" + this.token, this.pollSet)
  }

  saveMeme(meme){
    return this.http.post(this.apiBaseUrlMeme + "?access_token=" + this.token, meme) 
  }

  savePollMeme(meme){
    return this.http.post(this.apiBaseUrlPollSet + "/" + this.pollId + "/meme", meme)
  }
}
