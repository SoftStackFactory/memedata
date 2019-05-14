//import { HttpClient } from '@angular/common/http';
import { HTTP } from '@ionic-native/http';
import { Injectable } from '@angular/core';

class Meme {
  topText: any;
  bottomText: any;
  image: any;
  description: any;
}

/*
  Generated class for the PollBuilderServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PollBuilderServiceProvider {

  constructor(public http: HTTP) {
    console.log('Hello PollBuilderServiceProvider Provider');
  }

  apiBaseUrl: string = "http://localhost:3000/api/"

  token: string = window.sessionStorage.getItem('token');
  userId: string = window.sessionStorage.getItem('userId');

  pollId: string = ""
  pollMemes: any = {}
  pollSets: any = {}
  
  memes: Meme[] = [];

  displayMeme: any = {
    topText: "",
    bottomText: "",
    image: "",
    description: "",
  };

  meme: any = {
    topText: "",
    bottomText: "",
    image: "",
    description: "",
  };

  pollSet: any = {
    title: "",
    description: "",
    category: "",
  }

  createPollSet(){
    return this.http.post(this.apiBaseUrl + "pollSets?access_token=" + this.token, this.userId, {})
  }

  saveMeme(){
    return this.http.post(this.apiBaseUrl + "memes?access_token=" + this.token, this.pollId, {}) 
  }
}
