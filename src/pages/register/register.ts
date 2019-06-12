import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { Storage } from '@ionic/storage';
import { PollBuilderServiceProvider } from '../../providers/poll-builder-service/poll-builder-service';
import { Platform } from 'ionic-angular'


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  data: any;
  user = {
    firstName: '',
    lastName: '',
    username: '',
    email:'',
    password:'',
    dob:'',
    gender:'',
    zip:''
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
  
  onRegister(){
    this.userService.register(this.user)
      .subscribe(
        (response: any) => {
          console.log("response", response)
          this.data = response
          if (this.platform.is("iphone" || "android" || "mobile" || "cordova")) { //checking platform, setting storage with ionic
            this.storage.set("token", this.data.token)
            this.storage.set("userId", this.data.userId)
            console.log("your token is", this.data.token)
            console.log("your userId is", this.data.userId)
            this.storage.get('token').then((val) => { //getting from ionic storage for android/ios/cordova platforms
              console.log('got your token', val);
            this.BuilderService.token = val})
            this.storage.get('userId').then((val) => {
              console.log('got your userId', val);
            this.userService.loggedIn = true
            this.BuilderService.userId = val
            this.BuilderService.pollSet.userId = val
            this.BuilderService.meme.userId = val})
          } else {
            window.sessionStorage.setItem('token', response.token); //setting storage for desktop/windows/browser platform
            window.sessionStorage.setItem('userId', response.userId);
            let token = this.data.token
            let userId = this.data.userId
            console.log("your token is", token)
            console.log("your userId is", userId)
            this.userService.loggedIn = true
            this.BuilderService.token = token
            this.BuilderService.userId = userId
            this.BuilderService.pollSet.userId = userId
            this.BuilderService.meme.userId = userId
            }
            this.navCtrl.setRoot(DashboardPage);
          })
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  toDash() {
    this.navCtrl.setRoot(DashboardPage)
  }


}
