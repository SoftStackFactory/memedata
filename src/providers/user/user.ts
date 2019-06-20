import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { SearchbarServiceProvider } from '../searchbar-service/searchbar-service'
import { PollBuilderServiceProvider } from '../poll-builder-service/poll-builder-service';
import { FacebookOathProvider } from '../facebook-oath/facebook-oath';
import { DashboardPage } from '../../pages/dashboard/dashboard'

declare var FB: any

@Injectable()
export class UserProvider {


  constructor(
    public http: HttpClient,
    public BuilderService: PollBuilderServiceProvider,
    public search$: SearchbarServiceProvider,
    public storage: Storage,
    public fbOath: FacebookOathProvider,
    public alertCtrl: AlertController) {
    this.fbOath.facebookSDKLoad()
    console.log('Hello UserProvider Provider');
  }

  loggedIn: boolean = false

  baseUrl: string = 'https://ssf-memedata.herokuapp.com/api/appUsers';

  clearUserDetails() {
    this.loggedIn = false
    this.fbOath.fbLoggedIn = false
    this.storage.clear()
    window.sessionStorage.clear();
    this.BuilderService.token = ""
    this.BuilderService.userId = ""
    this.BuilderService.pollSet.userId = ""
    this.BuilderService.meme.userId = ""
  }

  register(userData) {
    return this.http.post(this.baseUrl, userData );
  }

  login(userData) {
    return this.http.post(this.baseUrl + "/login", userData);
  }

  onLogout(){
    const alert = this.alertCtrl.create({
      title: 'Logged Out!',
      subTitle: 'You are now logged out of MemePoll!',
      buttons: ['OK']
    });
    const confirm = this.alertCtrl.create({
      title: 'Logout?',
      message: 'Are you sure you want to Log out of MemePoll?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log("logged into facebook ==", this.fbOath.fbLoggedIn)
            if(this.fbOath.fbLoggedIn == true) {
              FB.api(
                "/me?logout",
                "POST",
                function(response) {
                console.log("user logged out of Facebook ==", response.success)
              });
            }else {
            this.logout(this.BuilderService.token)
            .subscribe(
              (response:any) =>{ 
                console.log("user logged out with token ", this.BuilderService.token)
              });
            }
            this.clearUserDetails()
            alert.present();
          }
        }
      ]
    });
    confirm.present();
    }

  logout(token) {
    return this.http.post(this.baseUrl + "/logout?access_token=" + token, {});
  }

}
