import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';

@Injectable()
export class PollInterfaceProvider {

  constructor(public http: HttpClient,
              public events: Events) {
    console.log('Hello PollInterfaceProvider Provider');
  }

  api:string = "https://memepoll.herokuapp.com/api/memes"
  memes:any = []

  getMemes(id){
    this.http.get(this.api + "?filter=%7B%20%22where%22%20%3A%20%7B%20%22pollId%22%20%3A%20%22Id_" + id + "%22%20%7D%20%7D")
    .subscribe((response) => {
      this.memes = response
      console.log(this.memes)
      this.events.publish('getMemes');
      });
  }


}
