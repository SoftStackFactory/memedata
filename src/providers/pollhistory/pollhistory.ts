import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

class Meme {
  topText: any;
  bottomText: any;
  image: any;
  description: any;
}
/*
  Generated class for the PollhistoryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PollhistoryProvider {

  constructor(public http: HttpClient) {
    console.log('Hello PollhistoryProvider Provider');
  }
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

}
