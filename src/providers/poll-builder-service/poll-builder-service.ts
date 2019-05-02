//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

class Meme {
  image: any;
  topText: any;
  bottomText: any;
  description: any;
}

/*
  Generated class for the PollBuilderServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PollBuilderServiceProvider {

  constructor() {
    console.log('Hello PollBuilderServiceProvider Provider');
  }

  memes: Meme[] = [];

  displayMeme: Meme[] = [];

  meme: any = {
  image: "",
  topText: "",
  bottomText: "",
  description: "",
  };

}
