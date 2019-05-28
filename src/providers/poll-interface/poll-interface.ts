import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class PollInterfaceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello PollInterfaceProvider Provider');
  }

  memes:any = []

  getMemes(id){
    this.http.get("https://memepoll.herokuapp.com/api/memes?filter=%7B%22where%22%3A%7B%22pollId%22%3A%22" + id + "%20%22%7D%7D")
    .subscribe((response) => {
      this.memes = response
      console.log(this.memes)
      });
  }


}
