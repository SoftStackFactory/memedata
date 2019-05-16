import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { RegisterPage } from '../../pages/register/register';
import { Storage } from '@ionic/storage';
import { PollBuilderServiceProvider } from '../../providers/poll-builder-service/poll-builder-service';
import { HomePage } from '../home/home';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService:UserProvider, public storage: Storage, public BuilderService: PollBuilderServiceProvider) {
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
          console.log(this.data)
          this.storage.set("token", this.data.token);
          this.storage.set("userId", this.data.userId);
          console.log("your token is", this.data.token)
          console.log("your userId is", this.data.userId)
          this.storage.get('token').then((val) => { //getting from ionic storage for android/ios platform
            console.log('got your token is', val);
          this.BuilderService.token = val})
          this.storage.get('userId').then((val) => {
            console.log('got your userId is', val);
          this.BuilderService.userId = val
          this.BuilderService.pollSet.userId = val
          this.BuilderService.meme.userId = val})
          //window.sessionStorage.setItem('token', response.data.token);
          //window.sessionStorage.setItem('userId', response.data.userId);
          this.navCtrl.setRoot(DashboardPage);
        })
  }

  noLogin() {
    this.navCtrl.setRoot(DashboardPage)
  }

}
