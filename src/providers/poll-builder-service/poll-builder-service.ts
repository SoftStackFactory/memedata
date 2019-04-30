//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PollBuilder2Page } from '../../pages/poll-builder2/poll-builder2';

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

  myPhotoPreview: any;
  topText: any;
  bottomText: any;
  description: any;

}
