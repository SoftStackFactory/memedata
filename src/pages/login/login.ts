import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { RegisterPage } from '../../pages/register/register';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';
import { PollBuilderServiceProvider } from '../../providers/poll-builder-service/poll-builder-service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {
  data;
  user = {
    email:'',
    password:''
  }

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public userService:UserProvider, 
    public storage: Storage, 
    public BuilderService: PollBuilderServiceProvider,
    public platform: Platform
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  forgot() {
    this.navCtrl.setRoot(RegisterPage)
  }

  onLogin(){
    this.userService.login(this.user)
      .subscribe(
        (response: any) => {
          this.data = response
          console.log("response", this.data)
          if (this.platform.is("iphone" || "android" || "mobile" || "cordova")) { //checking platform, setting storage with ionic
            this.storage.set("token", this.data.token);
            this.storage.set("userId", this.data.userId);
            console.log("your token is", this.data.token)
            console.log("your userId is", this.data.userId)
            this.storage.get('token').then((val) => { //getting from ionic storage for android/iphone/mobile platform
              console.log('got your token', val);
            this.BuilderService.token = val})
            this.storage.get('userId').then((val) => {
              console.log('got your userId', val);
            this.BuilderService.userId = val
            this.BuilderService.pollSet.userId = val
            this.BuilderService.meme.userId = val})
          } else { // setting session storage for all other devices such as desktop, windows, mobileweb, browsers
              window.sessionStorage.setItem('token', this.data.token);
              window.sessionStorage.setItem('userId', this.data.userId);
              let token = this.data.token
              let userId = this.data.userId
              console.log("your token is", token)
              console.log("your userId is", userId)
              this.BuilderService.token = token
              this.BuilderService.userId = userId
              this.BuilderService.pollSet.userId = userId
              this.BuilderService.meme.userId = userId
          }
          this.navCtrl.setRoot(DashboardPage);
        })
  }

  noLogin() {
    this.navCtrl.setRoot(DashboardPage)
  }

}
