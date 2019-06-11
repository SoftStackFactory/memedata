import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { PollBuilderServiceProvider } from '../poll-builder-service/poll-builder-service';



@Injectable()
export class UserProvider {


  constructor(
    public http: HttpClient,
    public BuilderService: PollBuilderServiceProvider,
    public storage: Storage) {
    console.log('Hello UserProvider Provider');
  }

  loggedIn: boolean = false

  baseUrl: string = 'https://memepoll.herokuapp.com/api/appUsers';

  register(userData) {
    return this.http.post(this.baseUrl, userData );
  }

  login(userData) {
    return this.http.post(this.baseUrl + "/login", userData);
  }

  onLogout(){
    this.logout(this.BuilderService.token)
    .subscribe(
      (response:any) =>{ 
      this.storage.clear()
      window.sessionStorage.clear();
      console.log("logoooooout user token ", this.BuilderService.token)
      this.BuilderService.token = ""
      this.BuilderService.userId = ""
      this.BuilderService.pollSet.userId = ""
      this.BuilderService.meme.userId = ""
      });

    }

  logout(token) {
    return this.http.post(this.baseUrl + "/logout?access_token=" + token, {});
  }

}
