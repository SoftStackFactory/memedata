import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

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

  constructor(public http: HttpClient, public storage: Storage) {
    console.log('Hello PollBuilderServiceProvider Provider');
  }

  //apiBaseUrl: string = "http://localhost:3000/api/"
  //apiBaseUrl: string = "http://192.168.1.51:3000/api/"
  apiBaseUrlMeme: string = 'https://memepoll.herokuapp.com/api/memes'
  apiBaseUrlPollSet: string = 'https://memepoll.herokuapp.com/api/pollSets'

  token: any //= this.storage.get('token').then((val) => {
    //this.token = val});
    //window.sessionStorage.getItem('token');
  userId: any //= this.storage.get('userId').then((val) => {
    //this.userId = val
    //this.pollSet.userId = this.userId});
    //window.sessionStorage.getItem('userId');

  pollId: string = ""
  pollMemes: any = []
  pollSets: any = []
  
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

  createPollSet(){
    console.log(this.pollSet)
    return this.http.post(this.apiBaseUrlPollSet + "?access_token=" + this.token, this.pollSet)
  }

  saveMeme(meme){
    //console.log(meme)
    return this.http.post(this.apiBaseUrlMeme + "?access_token=" + this.token, meme) 
  }
}
