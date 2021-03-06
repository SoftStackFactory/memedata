import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { Storage } from '@ionic/storage';
import { PollBuilderServiceProvider } from '../../providers/poll-builder-service/poll-builder-service';
import { FacebookOathProvider } from '../../providers/facebook-oath/facebook-oath';


@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {
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
    public fbOath: FacebookOathProvider,
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogoutPage');
  }

//  onLogout(){
//   this.userService.logout(this.BuilderService.token)
//    .subscribe(
//      (response:any) =>{ 
//        console.log("logoooooout user token ", this.BuilderService.token)
//      });
//      this.storage.clear()
//      window.sessionStorage.clear();
//      this.BuilderService.token = ""
//     this.BuilderService.userId = ""
//      this.BuilderService.pollSet.userId = ""
//      // this.BuilderService.meme.userId = ""
//      this.navCtrl.setRoot(DashboardPage);
//    }
  }


